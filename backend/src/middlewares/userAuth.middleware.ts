import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Request, Response, NextFunction } from 'express'
import { IUser, User } from '../model/user.model.js'
import { Types } from 'mongoose'
import { ApiError } from '../utils/errorHandler.js'
declare global{
  namespace Express{
   interface Request{
    user?: IUser & {_id: Types.ObjectId}
   }
  }
}

export const verifyJWT = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token  = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
  if(!token) {
    throw new ApiError("User is not logged in", 401)
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload
   const user = await User.findById(decodedToken._id).select("-refreshToken -password")
   if (!user) {
    throw new ApiError("Invalid access Token", 401)
   }

   req.user = user
   next()

  } catch (error) {
    throw new ApiError("Invalid or Expired Access token", 401)
  }
})