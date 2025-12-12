
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card, Button, Spinner } from '../components/UI';
import { CheckCircle, XCircle } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token || !email) {
        setStatus('error');
        setMessage('Invalid verification link. Missing parameters.');
        return;
    }

    const verify = async () => {
        try {
            const user = await api.auth.verify(email, token);
            setStatus('success');
            
            // Automatically log the user in
            localStorage.setItem('elite_user', JSON.stringify(user));
            
            // Redirect after a short delay
            setTimeout(() => {
               navigate('/profile'); 
               window.location.reload(); 
            }, 2000);
        } catch (e: any) {
            setStatus('error');
            setMessage(e.message || 'Verification failed.');
        }
    };
    verify();
  }, [token, email, navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full p-8 text-center shadow-lg">
            {status === 'loading' && (
                <div className="py-8">
                   <Spinner />
                   <p className="mt-6 text-gray-600 font-medium">Verifying your email address...</p>
                </div>
            )}
            {status === 'success' && (
                <div className="py-4">
                   <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce-in">
                       <CheckCircle size={40} />
                   </div>
                   <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Email Verified!</h2>
                   <p className="text-gray-600 mb-8">Your account has been successfully confirmed. You are being redirected to your profile...</p>
                   <Button onClick={() => { navigate('/profile'); window.location.reload(); }} className="w-full">
                     Go to Profile
                   </Button>
                </div>
            )}
            {status === 'error' && (
                <div className="py-4">
                   <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                       <XCircle size={40} />
                   </div>
                   <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Verification Failed</h2>
                   <p className="text-red-600 mb-8 bg-red-50 p-3 rounded border border-red-100">{message}</p>
                   <div className="flex flex-col gap-3">
                       <Link to="/auth?mode=register">
                          <Button className="w-full">Register Again</Button>
                       </Link>
                       <Link to="/auth?mode=login">
                          <Button variant="outline" className="w-full">Back to Login</Button>
                       </Link>
                   </div>
                </div>
            )}
        </Card>
    </div>
  );
};

export default VerifyEmail;
