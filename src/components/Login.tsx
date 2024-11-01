import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../services/appwrite/auth";
import { useState } from "react";
import {Input,Logo,Button} from "./index";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = useState("");

  const login: SubmitHandler<LoginFormData> = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto mt-10 w-full max-w-lg bg-none shadow-2xl shadow-blue-600 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center ">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl text-white leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white">
          Don&apos;t have an account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter email address"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address",
                },
              })}
            />
            {errors.email && <p className="text-red-600 mt-1 text-center">{errors.email.message}</p>}

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-600 mt-1 text-center">{errors.password.message}</p>}

            <Button type="submit" classname="w-full">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
