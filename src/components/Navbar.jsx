import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, LogOut, User, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin, isInstructor } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass sticky top-0 z-50 shadow-lg backdrop-blur-xl border-b border-white/30">
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-xl lg:text-2xl font-bold text-gradient-primary group">
          <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 group-hover:rotate-6 transition-transform duration-300" />
          <span>LMS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link to="/" className="nav-link">
            <GraduationCap size={20} />
            Courses
          </Link>
          
          {isAdmin && (
            <Link to="/admin" className="nav-link">
              <span className="hidden lg:inline">Admin</span>
              <GraduationCap size={18} className="lg:hidden" />
            </Link>
          )}
          
          {isInstructor && (
            <Link to="/instructor" className="nav-link">
              <span className="hidden lg:inline">Dashboard</span>
              <GraduationCap size={18} className="lg:hidden" />
            </Link>
          )}
          
          {isAuthenticated && (
            <Link to="/my-courses" className="nav-link">
              <BookOpen size={20} />
              <span className="hidden lg:inline">My Courses</span>
            </Link>
          )}
        </div>

        {/* Right side - Auth & Mobile */}
        <div className="flex items-center gap-2 lg:gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/40">
                <User size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-800 max-w-24 truncate">
                  {user?.name || user?.email}
                </span>
              </div>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary md:px-4 md:py-2 hidden lg:inline-flex"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary hidden sm:inline-flex px-4 py-2">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary px-6 py-2">
                Get Started <ChevronRight size={18} />
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-xl hover:bg-white/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-x border-b border-white/40 shadow-2xl py-4">
            <div className="flex flex-col gap-2 px-4">
              <Link to="/" className="nav-link py-3" onClick={() => setMobileOpen(false)}>
                <GraduationCap size={20} />
                Courses
              </Link>
              
              {isAdmin && (
                <Link to="/admin" className="nav-link py-3" onClick={() => setMobileOpen(false)}>
                  Admin Panel
                </Link>
              )}
              
              {isInstructor && (
                <Link to="/instructor" className="nav-link py-3" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
              )}
              
              {isAuthenticated && (
                <Link to="/my-courses" className="nav-link py-3" onClick={() => setMobileOpen(false)}>
                  My Courses
                </Link>
              )}
              
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary w-full py-3 mt-2"
                >
                  <LogOut size={20} className="mr-2 inline" />
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary w-full py-3" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/signup" className="btn btn-primary w-full py-3" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

