import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/errorHandler.js";
import { Request, Response } from "express";
import { CookieOptions } from "express";

const userRegistration = asyncHandler(async (req: Request, res: Response) => {
  const {fullName, email, password} = req.body;

  if ([fullName, email, password].some((field) => !field || field.trim() === "") ) {
    throw new ApiError("Please provide all the required fields", 401)
  }

 const profile = await User.create({
  fullName,
  email,
  password
 })

 if (!profile) {
  throw new ApiError("Can not register the user in database", 501)
 }

 return res.status(200).json(new ApiResponse(
  200, 
  {
  _id: profile._id, 
  fullName: profile.fullName, 
  email: profile.email
},
"Registration successfull"
))

})

const userLogin = asyncHandler(async(req: Request, res: Response) => {
    const {email, password} = req.body

    if ([email, password].some(field => !field || field.trim() === "")) {
      throw new ApiError(" Please provide the required fields", 400)
    }
   
    const user = await User.findOne({email})

    if (!user) {
      throw new ApiError("User does not exist", 404)
    }

    const isUserValid = await user.comparePassword(password)

    if (!isUserValid) {
      throw new ApiError("Invalid email or password", 401)
    }

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken
  await user.save({validateBeforeSave: false})
   

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  }

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
  .cookie("refreshToken", refreshToken, cookieOptions)
  .json(new ApiResponse(200, {_id: user._id,fullName: user.fullName,  email: user.email}, "Login successfully"))
})

const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  if(!user) {
    throw new ApiError("Invalid or Unauthorized User", 401)
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, {$unset: {
   refreshToken: 1
  }})

  if (!updatedUser) {
    throw new ApiError("User does not exist (Invalid User)", 404)
  }
const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
   
  }

  return res.status(200)
  .clearCookie("accessToken", cookieOptions)
  .clearCookie("refreshToken", cookieOptions)
  .json(new ApiResponse(200, {}, "User logged Out Successfully"))
})

export {
  userRegistration,
  userLogin,
  userLogout
}