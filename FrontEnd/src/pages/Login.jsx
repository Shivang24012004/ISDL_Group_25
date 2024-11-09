import React, { useEffect, useState } from 'react';
import { ImageIcon, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/AsyncThunk';
import { useToast } from '@/hooks/use-toast';
import { getId, setUserInfo } from '@/redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const navigate = useNavigate();

  const userId = useSelector(getId);

  useEffect(() => {
    if (userId) {
      navigate("/filter");
    }
  }, [userId]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email , password)
    dispatch(login({ email, password }))
      .unwrap().then((data) => {
        console.log(data);
        dispatch(setUserInfo(data.user));
        navigate("/filter");
        toast({ title : 'Login successful' , type : 'success'})
      })
      .catch((err) => {
        console.log(err);
        toast({ title : err , type : 'error'})
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <ImageIcon className="h-12 w-12 text-gray-900" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Image SAAS</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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

                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mt-4 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}

                className="mt-1 ppearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
            {loading ? <Loader className='animate-spin' h="" /> : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-gray-600 hover:text-gray-500">
            
              Sign up
            </a>
          </p>
          {/* <div className="text-sm text-right flex justify-center">
             <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
               Forgot your password?
             </a>
           </div> */}
        </div>
        
        
      </div>
    </div>
  );
}