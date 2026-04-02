import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('grid');
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Basic protection: if not logged in, boot to login page
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchForms = async () => {
      try {
        const q = query(collection(db, 'forms'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const formsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort by creation date roughly
        formsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        setForms(formsData);
      } catch (err) {
        console.error("Error fetching forms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [currentUser, navigate]);

  const handleCreateNewForm = async () => {
    if (!currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'forms'), {
        userId: currentUser.uid,
        title: 'Untitled Form',
        description: '',
        status: 'Draft',
        responses: 0,
        questions: [
          { 
            id: `q-${Date.now()}`, 
            type: 'multiple_choice', 
            text: 'Untitled Question', 
            required: false, 
            options: ['Option 1'] 
          }
        ],
        createdAt: serverTimestamp(),
        lastEdited: serverTimestamp()
      });
      // Navigate to the editor for this new form document
      navigate(`/editor/${docRef.id}`);
    } catch (err) {
      console.error("Error creating new form:", err);
    }
  };

  if (loading) {
    return <div className="flex h-full w-full justify-center mt-20 text-slate-400">Loading your forms...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">My Forms</h1>
          <p className="text-slate-500 text-sm">Manage and create your forms.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search forms..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={handleCreateNewForm}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={18} /> New Form
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-800 rounded-md">All Forms</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-md transition-colors">Shared with me</button>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {forms.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass-card p-0 overflow-hidden flex cursor-pointer hover:shadow-lg hover:border-blue-400/50 transition-all group ${viewMode === 'list' ? 'flex-row items-center p-4' : 'flex-col'}`}
            onClick={() => navigate(`/editor/${form.id}`)}
          >
            {/* Form Thumbnail / Header */}
            <div className={`${viewMode === 'list' ? 'w-16 h-16 rounded-lg shrink-0' : 'h-32 w-full'} bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-b border-white/40 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors`}>
              <FileText className="text-blue-500 opacity-60" size={viewMode === 'list' ? 24 : 48} />
            </div>
            
            {/* Form Details */}
            <div className={`flex-1 ${viewMode === 'list' ? 'pl-4 pr-2' : 'p-5'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800 line-clamp-1">{form.title}</h3>
                {viewMode === 'grid' && (
                  <button className="text-slate-400 hover:text-slate-700 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={18} />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className={`px-2 py-0.5 rounded-full ${form.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {form.status || 'Draft'}
                </span>
                <span>{form.responses || 0} responses</span>
              </div>
            </div>

            {viewMode === 'list' && (
              <div className="flex items-center gap-4 text-sm text-slate-500 shrink-0 ml-auto mr-4">
                <button className="text-slate-400 hover:text-slate-700 transition-colors p-2" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical size={20} />
                </button>
              </div>
            )}
          </motion.div>
        ))}

        {/* Empty State / Create New Card */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3, delay: forms.length * 0.1 }}
           onClick={handleCreateNewForm}
           className={`border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer ${viewMode === 'list' ? 'h-24' : 'h-[250px]'}`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-1 group-hover:bg-blue-100 transition-colors">
              <Plus size={20} />
            </div>
            <span className="font-medium">Blank Form</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
