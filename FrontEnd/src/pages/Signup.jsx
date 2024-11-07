import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/redux/AsyncThunk';

export default function SignupPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();

        if (password !== confirmPassword) {
            toast({ title: 'Error', description: 'Passwords do not match', status: 'error' });
            return;
        }
        if (password.length < 6 || password.length > 12) {
            toast({ title: 'Error', description: 'Password must be between 6 and 12 characters', status: 'error' });
            return;
          }


      dispatch(signup({  email, password }))
        .unwrap()
        .then(() => {
          toast({ title: 'Signup successful', type: 'success' });
          navigate('/login');

        })
        .catch((err) => {
          toast({ title: 'Error', description: err, status: 'error' });
        });
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <ImageIcon className="h-16 w-16 text-gray-900" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Image SAAS</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account and start editing images
          </p>
        </div>
        <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password<span className="text-xs text-gray-500"> (6-12 characters)</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-gray-600 hover:text-gray-500 transition duration-150 ease-in-out">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}