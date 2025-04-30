import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const BASE_URL = "http://localhost:4000";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "email" && serverError) setServerError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSuccess(false);

    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                serverError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200`}
              placeholder="Enter your email"
            />
            {serverError && (
              <p className="text-red-500 text-sm mt-1">{serverError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              isSuccess ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSuccess ? "Registration Successful" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
