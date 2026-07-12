import LoginForm from "./LoginForm";





export default function LoginPage() {
  return (

    <div className="w-full h-dvh flex flex-col items-center justify-center bg-black/10 backdrop-blur-lg py-4 gap-6">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center">

        <div className=" w-3/4  md:flex hidden flex-col items-start gap-4">
          <p className="text-2xl font-semibold  tracking-wide text-gray-300">Welcome Back !</p>
          <h1 className="text-5xl   font-bold tracking-wider bg-linear-to-r from-pink-800 via-yellow-400 to-blue-600 bg-clip-text text-transparent uppercase text-nowrap">Shareen AI</h1>
        <p className="text-gray-300 text-lg text-start">An AI assistant with personalized responses, updated coding responses and track your previous error debugging with your second brain.</p>
        </div>


        <div className="w-full h-full flex flex-col items-center justify-center gap-6">

          <div className=" text-white flex md:hidden flex-col items-center gap-2">
            <p className="text-xl font-semibold  tracking-wide">Welcome Back !</p>
            <h1 className="text-4xl  font-bold tracking-wider bg-linear-to-r from-pink-800 via-yellow-400 to-blue-600 bg-clip-text text-transparent uppercase ">Shareen AI</h1>
          </div>


          <LoginForm />
        </div>
      </div>
    </div>
  )
}