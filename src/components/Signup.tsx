import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import authService from "../services/appwrite/auth";
import { login } from "../store/authSlice";
import {Input,Logo,Button} from "./index";

interface SignupFormData{
    name: string;
    email: string;
    password: string
}

function Signup() {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const {register,handleSubmit,formState: {errors}} = useForm<SignupFormData>()

    const create:SubmitHandler<SignupFormData> = async (data) =>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unknown error occured")
            }
        }
    }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%"/>
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link to={"/login"} 
        className="font-medium text-primary transition-all duration-200 hover:underline">Sign In</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
                <Input 
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name",{
                        required: true
                })}
                />
                {errors && <p className="text-red-600 mt-8 text-center">{errors.name?.message}</p>}
                <Input 
                label="Email"
                placeholder="Enter your email address"
                {
                    ...register("email", {
                        required:true,
                        validate: {
                            matchPattern : (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address",
                        }
                    })
                }
                />
                {errors && <p className="text-red-600 mt-8 text-center">{errors.email?.message}</p>}
                <Input 
                label="Password"
                placeholder="enter your password"
                {
                    ...register("password",{
                        required: true,
                    })
                }
                />
                {/* <Button type="submit" classname="w-full">Create Account</Button> */}
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
