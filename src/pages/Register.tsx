import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/register";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    try {
      const data = await register(formData);
      if (data) {
        navigate("/login");
        toast.success("Successfully created account");
      } else {
        toast.error("Failed to create account");
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data &&
          typeof err.response.data.message === 'string') {
        toast.error(err.response.data.message);
      } else {
        toast.error('An error occurred while creating your account');
      }
    }
  };

  return (
    <div className="mt-24 px-36 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome! Create an account</h1>
      <p className="text-md mt-2">
        Create an account to get started with Edugate
      </p>
      <hr />
      <form
        className="mt-10 flex flex-col gap-4 w-full lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Full Names</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="border border-gray-300 bg-transparent rounded-md py-2 px-4"
          />
        </div>
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
        <button className="bg-primary text-white text-lg px-16 py-3 rounded-md mt-10">
          Create Account
        </button>
      </form>
      <p className="mt-10">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
