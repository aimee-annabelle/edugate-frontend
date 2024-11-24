import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/login";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    try {
      const data = await login(formData);
      if (data) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        toast.success("Successfully logged in");
      } else {
        toast.error("Failed to login");
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred while logging in");
      }
    }
  };
  return (
    <div className="mt-24 px-36 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome back!</h1>
      <p className="text-md mt-2">Login to your account to continue</p>
      <hr />
      <form
        className="mt-10 flex flex-col gap-4 w-full lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@doe.com"
            className="border border-gray-300 bg-transparent rounded-md py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              className="border border-gray-300 bg-transparent rounded-md py-2 px-4 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white text-lg px-16 py-3 rounded-md mt-10"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
