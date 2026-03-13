import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword)
      next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      signup(email, password, name);
      toast.success('Account created!');
      navigate('/');
    } catch {
      toast.error('Signup failed. Try again.');
    }
  };

  return (
    <div className="container" style={{padding: '2rem 1rem', maxWidth: '500px'}}>
      <div className="card">
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
          <UserPlus size={48} />
          <div>
            <h1 style={{fontSize: '1.8rem', fontWeight: 'bold', margin: 0}}>Create Account</h1>
            <p style={{color: '#666', margin: 0}}>Join us today</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div style={{position: 'relative'}}>
              <User size={20} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                style={{paddingLeft: '3rem'}}
              />
            </div>
            {errors.name && <p style={{color: 'red', fontSize: '0.9rem', marginTop: '0.25rem'}}>{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div style={{position: 'relative'}}>
              <Mail size={20} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                style={{paddingLeft: '3rem'}}
              />
            </div>
            {errors.email && <p style={{color: 'red', fontSize: '0.9rem', marginTop: '0.25rem'}}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{position: 'relative'}}>
              <Lock size={20} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                style={{paddingLeft: '3rem', paddingRight: '3rem'}}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666'}}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p style={{color: 'red', fontSize: '0.9rem', marginTop: '0.25rem'}}>{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div style={{position: 'relative'}}>
              <Lock size={20} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                style={{paddingLeft: '3rem', paddingRight: '3rem'}}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666'}}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p style={{color: 'red', fontSize: '0.9rem', marginTop: '0.25rem'}}>{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn" disabled={!name || !email || !password || !confirmPassword}>
            Create Account
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '1.5rem', color: '#666'}}>
          Already have an account? <Link to="/login" style={{color: '#007bff', fontWeight: '500'}}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
