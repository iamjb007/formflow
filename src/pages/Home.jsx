import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layout, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200">
          <Sparkles size={16} /> Welcome to the future of forms
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
          Create forms that <br />
          <span className="primary-gradient-text">people love to answer.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The stunning, animated, and professional way to collect data. 
          Build powerful surveys in minutes with our glass-morphism builder.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Create Your First Form <ArrowRight size={20} />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-white text-slate-700 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all">
            View Templates
          </button>
        </div>
      </motion.div>

      {/* Feature grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl"
      >
        <div className="glass-card p-8 text-left group hover:-translate-y-2 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <Layout size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Drag & Drop Builder</h3>
          <p className="text-slate-600">Create complex forms effortlessly with our intuitive drag-and-drop interface.</p>
        </div>
        
        <div className="glass-card p-8 text-left group hover:-translate-y-2 transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Real-time Analytics</h3>
          <p className="text-slate-600">Watch responses roll in with beautiful, automatically generated charts and graphs.</p>
        </div>

        <div className="glass-card p-8 text-left group hover:-translate-y-2 transition-all duration-300">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Secure by Design</h3>
          <p className="text-slate-600">Powered by Firebase, your data is securely stored, encrypted, and easily exportable.</p>
        </div>
      </motion.div>
    </div>
  );
}
