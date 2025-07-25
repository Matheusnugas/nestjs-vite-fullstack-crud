import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from '../components/PageTransition';
import { useLogin } from '../hooks/useAuth';
import { useAuth } from '../context/useAuth';
import type { AxiosError } from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const loginMutation = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setToken(data.data.accessToken);
          navigate('/dashboard');
        },
      }
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 px-2">
        <div className="w-full max-w-md flex flex-col items-center p-6 sm:p-8 bg-transparent sm:rounded-xl">
          <h2 className="text-3xl font-bold mb-8 mt-2 text-white">Taskify</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-200 font-bold text-sm mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-200 py-2 text-white font-bold bg-transparent placeholder-gray-300"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <label
                className="block text-gray-200 font-bold text-sm mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-200 py-2 text-white font-bold bg-transparent placeholder-gray-300"
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer mt-4 py-2 rounded bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold text-lg shadow transition hover:from-blue-500 hover:to-purple-600 outline-2 outline-white "
              disabled={loginMutation.status === 'pending'}
            >
              {loginMutation.status === 'pending' ? 'Logging in...' : 'Login'}
            </button>
            {loginMutation.isError && (
              <div className="text-red-400 text-sm mt-2 text-center">
                {(() => {
                  const err = loginMutation.error as AxiosError<{ message?: string }>;
                  return err?.response?.data?.message || err?.message || 'Registration failed. Check your data.';
                })()}
              </div>
            )}
          </form>
          <div className="mt-6 w-full flex flex-col items-center gap-2">
            <a
              href="#"
              className="text-sm text-gray-200 font-bold hover:underline"
            >
              Forgot <span className="text-white font-bold">Password?</span>
            </a>
            <p className="text-sm text-gray-200 font-bold">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-white sm:text-blue-600 hover:underline"
              >
                Sign Up!
              </button>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 