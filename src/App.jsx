import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Login from './pages/Login';
import PublicForm from './pages/PublicForm';
import Responses from './pages/Responses';

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen w-full font-sans bg-slate-50 relative overflow-hidden flex flex-col">
        {/* Background Animated Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '2s' }} />

        {/* Top Navbar */}
        <nav className="relative z-10 w-full h-16 glass-card rounded-none border-t-0 border-l-0 border-r-0 border-b-white/20 flex items-center justify-between px-8 shrink-0">
          <Link to="/" className="font-bold text-xl primary-gradient-text tracking-tight cursor-pointer">FormFlow</Link>
          <div className="flex gap-4 items-center">
            {currentUser ? (
              <>
                <span className="text-sm font-medium text-slate-500 mr-2">{currentUser.email}</span>
                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
                <Link to="/login" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95">Get Started</Link>
              </>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 p-6 w-full max-w-7xl mx-auto flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:formId" element={<Editor />} />
            <Route path="/responses/:formId" element={<Responses />} />
            <Route path="/f/:formId" element={<PublicForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
