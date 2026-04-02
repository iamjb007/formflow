import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', '')); // Clean up error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center -m-6 w-[calc(100%+3rem)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass-card shadow-2xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to start building beautiful forms.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2 border border-red-100">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                {isLogin && <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')} 
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
