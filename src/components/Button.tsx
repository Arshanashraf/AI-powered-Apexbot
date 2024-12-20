import {  ReactNode } from "react"


interface ButtonProps{
    children: ReactNode;
    type ?: 'button' | 'submit' | 'reset';
    bgColor ?: string;
    textColor ?: string;
    classname ?: string;
    [key:string] : any
}

export default function Button({
    children,
    type= 'button',
    bgColor = 'bg-purple-700',
    textColor = 'text-white',
    classname = '',
    ...props
}:ButtonProps) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg font-bold hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-400 ${bgColor} ${textColor} ${classname}`} {...props}>{children}</button>
  )
}


