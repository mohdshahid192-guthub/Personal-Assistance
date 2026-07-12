import { useState } from "react"
import { Link } from "react-router-dom"




export default function LoginForm() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (

    <div className="w-[90%] max-w-125  h-max rounded-lg bg-white/10 backdrop-blur-3xl  flex flex-col items-center justify-start gap-6 px-4 p-6 sm:py-12">
      <h3 className="text-4xl font-bold text-white tracking-wider font-serif">Login</h3>

      <form action="" className="w-[90%] flex flex-col gap-4 items-center">



        <div className="w-full flex flex-col gap-2 px-2">
          <label htmlFor="email" className="font-semibold text-gray-300 pl-4">Email</label>

          <div className="w-full h-10 relative">
            <input type="text" value={email} placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required className="w-full bg-white  rounded-sm h-10 text-black px-4 outline-0 invalid:border-red-500 " />

            <i className={`fa-solid fa-envelope absolute text-lg right-5 top-1/2 -translate-y-1/2 cursor-pointer ${email ? "text-sky-600" : "text-gray-700"}`}
             
            ></i>

          </div>
        </div>


        <div className="w-full flex flex-col gap-2 px-2">
          <label htmlFor="password" className="font-semibold text-gray-300 pl-4">Password</label>
          <div className="w-full h-10 relative">
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              required className="w-full bg-white  rounded-sm  text-black h-full px-4 outline-0 invalid:border-red-500 " />
            <i className={`fa-solid fa-eye absolute text-lg right-5 top-1/2 -translate-y-1/2 cursor-pointer ${showPassword ? "text-sky-600" : "text-gray-700"}`}
              onClick={() => setShowPassword((prev) => !prev)}
            ></i>
          </div>


        </div>

        <button className="w-1/2 py-2 text-white bg-linear-to-b from-blue-500 via-blue-600 to-blue-400 hover:from-blue-400 hover:via-blue-600 hover:to-blue-500 focus:from-blue-400 focus:via-blue-600 focus:to-blue-500 cursor-pointer rounded-sm mt-4 font-semibold">Log In</button>
      </form>
      <p className="w-1/2 h-max grid grid-cols-[1fr_40px_1fr] place-items-center text-gray-400 tracking-widest text-nowrap"><span className="w-full h-0.5 bg-gray-400"></span>or<span className="w-full h-0.5 bg-gray-400"></span></p>

      <div className="w-max flex items-center gap-2 cursor-pointer">
        <i className="fa-brands fa-google text-4xl bg-conic bg-clip-text text-transparent  [--tw-gradient-stops:#FF311F,#4F1FFF,#4F1FFF,#20FE54,#F9F624,#FF311F]"></i>

        <p className="text-white">Sign in with Google</p>
      </div>

      <div>
        <p className="text-white"> Are you new? <Link to="/sign-up" className="hover:underline text-blue-400">Create a new account</Link></p>
      </div>
    </div>

  )
}