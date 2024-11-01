import { useId,forwardRef,  InputHTMLAttributes } from "react"
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label : string;
    type ?: string;
    classname ?: string;
    placeholer ?: string
}

const Input = forwardRef<HTMLInputElement,InputProps>(function Input({
    label,
    type ='text',
    classname= "",
    ...props
},ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1 text-white" htmlFor={id}>{label}</label>}
            <input type={type} 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`} ref={ref} {...props} id={id}/>
        </div>
    )
}) 

export default Input
