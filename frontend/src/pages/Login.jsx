import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch {
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50/40 flex items-center justify-center">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="hidden lg:flex flex-col justify-between rounded-3xl p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm opacity-80">LMS Portal</div>
                <div className="font-semibold">Sign in to continue</div>
              </div>
            </div>

            <h1 className="mt-10 text-4xl font-bold leading-tight">
              Learn faster with
              <span className="block">structured courses</span>
            </h1>
            <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-md">
              Track progress, save your learning, and jump right back into the next lesson.
            </p>
          </div>

          <div className="text-white/70 text-sm">
            Tip: use `student@lms.com` / `student123` (from `db.json`) to test quickly.
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input pl-12 ${errors.email ? 'border-red-300 focus:border-red-300 focus:ring-red-200/50' : ''}`}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input pl-12 pr-12 ${errors.password ? 'border-red-300 focus:border-red-300 focus:ring-red-200/50' : ''}`}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>
              <button type="button" className="text-sm font-medium text-blue-700 hover:text-blue-800">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full text-base py-4" disabled={!email || !password}>
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-700 font-semibold hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
