
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button, Input, Card } from '../components/UI';
import { UserRole } from '../types';
import { Mail, CheckCircle, ExternalLink } from 'lucide-react';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationLink, setVerificationLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const user = await api.auth.login(formData.email, formData.password);
        localStorage.setItem('elite_user', JSON.stringify(user));
        navigate(user.role === UserRole.ADMIN ? '/admin' : '/');
        window.location.reload();
      } else {
        if (formData.password !== formData.confirmPassword) throw new Error("Passwords do not match");
        
        const result = await api.auth.register({
          email: formData.email,
          name: formData.name,
          password: formData.password
        });
        
        setVerificationLink(result.link);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (verificationLink) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="max-w-md w-full p-8 shadow-xl text-center">
          <div className="mx-auto w-16 h-16 bg-elite-100 rounded-full flex items-center justify-center text-elite-600 mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Verify your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to <span className="font-medium text-gray-900">{formData.email}</span>. 
            Please check your inbox to activate your account.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Simulated Email</p>
            <p className="text-xs text-yellow-700 mb-2">Since this is a demo, click the link below to simulate verifying your email:</p>
            <a 
              href={verificationLink} 
              className="flex items-center gap-2 text-sm font-medium text-elite-600 hover:text-elite-800 break-all"
            >
              <ExternalLink size={14} /> Click here to verify
            </a>
          </div>

          <Button variant="outline" onClick={() => { setVerificationLink(null); navigate('/auth?mode=login'); }} className="w-full">
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="max-w-md w-full p-8 space-y-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Join Elite'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' ? 'Sign in to access your account' : 'Create an account to find the best care'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'register' && (
              <Input 
                label="Full Name"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Jane Doe"
              />
            )}
            <Input 
              label="Email address"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="you@example.com"
            />
            <Input 
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
            />
            {mode === 'register' && (
              <Input 
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="••••••••"
              />
            )}
          </div>

          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-100">{error}</div>}

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <span className="font-medium text-elite-600 hover:text-elite-500 cursor-pointer" onClick={() => navigate('/auth?mode=register')}>
                Sign up
              </span>
            </p>
          ) : (
             <p>
              Already have an account?{' '}
              <span className="font-medium text-elite-600 hover:text-elite-500 cursor-pointer" onClick={() => navigate('/auth?mode=login')}>
                Log in
              </span>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Auth;
