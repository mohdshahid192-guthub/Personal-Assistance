import mongoose, {Model, Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


export interface IUser {
  fullName: string
  email: string
  password: string
  refreshToken: string
}

export interface IUserMethods {
  comparePassword(userPassword: string): Promise<boolean>
  generateAccessToken(): string
  generateRefreshToken(): string
}

type userModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, userModel, IUserMethods>({
  fullName: {
    type : String,
    required: true
  },
  email: {
    type : String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  }

})



userSchema.pre("save", async function(){
  if(!this.isModified("password")){
    return 
  }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
   return await bcrypt.compare(userPassword, this.password)
}

userSchema.methods.generateAccessToken = function(): string {
 
  return jwt.sign(
    {
      _id: this._id.toString(),
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET!, 
    {expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1d") as jwt.SignOptions["expiresIn"]}
  )
}

userSchema.methods.generateRefreshToken = function(): string {
 
  return jwt.sign(
    {
      _id: this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET!, 
    {expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as jwt.SignOptions["expiresIn"]}
  )
}

export const User =  mongoose.model<IUser, userModel>("User", userSchema)