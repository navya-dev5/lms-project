import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LMSLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">Welcome Back</h1>
          <p className="text-xl text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-16 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500"
                  placeholder="Enter your email"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 11-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-16 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-400 focus:outline-none transition-all duration-300 text-lg placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg focus:ring-4 focus:ring-blue-200 focus:outline-none"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Don't have an account?</p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 hover:border-blue-600 hover:shadow-lg transition-all duration-300 text-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSLogin;
