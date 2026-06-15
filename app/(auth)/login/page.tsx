"use client";

import { FormValues } from "@/libs/types/login-type";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useLogin } from "@/libs/hooks/useLogin";
import { loginSchema } from "@/libs/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch (error) {
      // toast توی useLogin نشون داده میشه
    }
  };

  return (
    <form
      noValidate
      aria-label="فرم ورود"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[22rem] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-gray-900/70 sm:bg-gray-900/80 backdrop-blur-md sm:backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-700/40 sm:border-gray-700/50 transition-all duration-300"
    >
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Header */}
        <div className="text-center mb-1 sm:mb-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white transition-all duration-300">
            خوش آمدید
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 transition-all duration-300">
            برای ادامه وارد شوید
          </p>
        </div>

        {/* فیلد نام کاربری */}
        <div className="space-y-1 sm:space-y-1.5">
          <label
            htmlFor="username"
            className="block text-xs sm:text-sm font-medium text-gray-300 mr-1 transition-all duration-300"
          >
            نام کاربری
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none z-10">
              <User
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${
                  errors.username
                    ? "text-red-400"
                    : "text-gray-500 group-focus-within:text-indigo-400"
                }`}
                aria-hidden="true"
              />
            </div>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="نام کاربری خود را وارد کنید"
              {...register("username")}
              aria-required="true"
              aria-invalid={errors.username ? "true" : "false"}
              className={`w-full pr-10 sm:pr-12 pl-4 sm:pl-5 py-2.5 sm:py-3 md:py-3.5 bg-gray-800/50 border rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-xs sm:text-sm md:text-base hover:border-gray-600 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500/50"
                  : "border-gray-700 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              }`}
            />
          </div>
          {errors.username && (
            <p className="text-red-400 text-[10px] sm:text-xs mt-1 mr-1 transition-all duration-300">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* فیلد رمز عبور */}
        <div className="space-y-1 sm:space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-medium text-gray-300 mr-1 transition-all duration-300"
          >
            رمز عبور
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none z-10">
              <Lock
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${
                  errors.password
                    ? "text-red-400"
                    : "text-gray-500 group-focus-within:text-indigo-400"
                }`}
                aria-hidden="true"
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="رمز عبور خود را وارد کنید"
              {...register("password")}
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full pr-10 sm:pr-12 pl-10 sm:pl-12 py-2.5 sm:py-3 md:py-3.5 bg-gray-800/50 border rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-xs sm:text-sm md:text-base hover:border-gray-600 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-500/50"
                  : "border-gray-700 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
              }
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none rounded-lg p-1 sm:p-1.5 transition-colors duration-200 z-10"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-[10px] sm:text-xs mt-1 mr-1 transition-all duration-300">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* دکمه ورود */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:transform-none text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs sm:text-sm md:text-base tracking-wide shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>در حال ورود...</span>
            </span>
          ) : (
            "ورود به حساب"
          )}
        </button>
      </div>
    </form>
  );
}
