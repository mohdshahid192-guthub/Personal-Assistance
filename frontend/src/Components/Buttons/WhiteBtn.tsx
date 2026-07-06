import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'withBg' | 'withoutBg' | 'onlyBorder'
}

export default function WhiteBtn({children, size = "medium", className = '', variant = "withBg", ...props}: ButtonProp) {

  const baseStyle = " font-semibold  cursor-pointer  transition-colors duration-300"
const sizeStyles = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
}

const variants = {
  withBg: "border-2 bg-black text-white rounded-xl hover:bg-white hover:text-black",
  withoutBg: "border-none rounded-xl hover:bg-gray-300 hover:text-black",
  onlyBorder: "border-2 rounded-xl hover:bg-black hover:text-white"

}
  const combinedClassName = `${baseStyle} ${sizeStyles[size]} ${variants[variant]}`
  return(
    <button className={combinedClassName}
   {...props}
    >
      {children}
    </button>
  )
}