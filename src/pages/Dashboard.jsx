import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();
  
  // Mock data for forms
  const mockForms = [
    { id: '1', title: 'Customer Feedback Survey', responses: 124, status: 'Open', lastEdited: '2 hours ago' },
    { id: '2', title: 'Event Registration 2026', responses: 45, status: 'Open', lastEdited: '1 day ago' },
    { id: '3', title: 'Employee Satisfaction', responses: 0, status: 'Draft', lastEdited: '3 days ago' },
  ];

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
            onClick={() => navigate('/editor/new')}
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
        {mockForms.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass-card p-0 overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-4' : 'flex-col'}`}
          >
            {/* Form Thumbnail / Header */}
            <div className={`${viewMode === 'list' ? 'w-16 h-16 rounded-lg shrink-0' : 'h-32 w-full'} bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-b border-white/40`}>
              <FileText className="text-blue-400 opacity-60" size={viewMode === 'list' ? 24 : 48} />
            </div>
            
            {/* Form Details */}
            <div className={`flex-1 ${viewMode === 'list' ? 'pl-4 pr-2' : 'p-5'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800 line-clamp-1">{form.title}</h3>
                {viewMode === 'grid' && (
                  <button className="text-slate-400 hover:text-slate-700 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className={`px-2 py-0.5 rounded-full ${form.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {form.status}
                </span>
                <span>{form.responses} responses</span>
              </div>
              
              {viewMode === 'grid' && (
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
                  <span>Edited {form.lastEdited}</span>
                </div>
              )}
            </div>

            {viewMode === 'list' && (
              <div className="flex items-center gap-4 text-sm text-slate-500 shrink-0 ml-auto mr-4">
                <span className="w-32 hidden md:inline-block">Edited {form.lastEdited}</span>
                <button className="text-slate-400 hover:text-slate-700 transition-colors p-2">
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
           transition={{ duration: 0.3, delay: mockForms.length * 0.1 }}
           onClick={() => navigate('/editor/new')}
           className={`border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer ${viewMode === 'list' ? 'h-24' : 'h-[250px]'}`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-1">
              <Plus size={20} />
            </div>
            <span className="font-medium">Blank Form</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
