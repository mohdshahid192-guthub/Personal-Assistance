import WhiteBtn from "../Buttons/WhiteBtn";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate =  useNavigate()
  return (

    <div className="w-full h-full flex flex-col items-center justify-center bg-black/10 backdrop-blur-lg gap-6">
      <p className="text-white text-4xl">Welcome to! </p>
      <h1 className="text-5xl sm:text-7xl   font-bold tracking-wider bg-linear-to-r from-pink-800 via-yellow-400 to-blue-600 bg-clip-text text-transparent uppercase text-nowrap">Shareen AI</h1>
      <p className="text-gray-300 max-w-125 text-lg text-center px-2 ">An AI assistant with personalized responses, updated coding experience and track your previous error debugging with your second brain.</p>

      <div className="flex gap-6 ">
        <WhiteBtn variant="onlyBorder"  size="medium"   onClick={() => navigate("/signup")}>Sign Up</WhiteBtn>
        <WhiteBtn variant="withBg" size="medium"
        onClick={() => navigate("/login")}
        >Sign In</WhiteBtn>
      </div>

    </div>
  )
}