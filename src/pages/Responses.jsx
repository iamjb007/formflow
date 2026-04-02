import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ChevronLeft, Users, Clock, Filter, Eye } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Responses() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('summary'); // 'summary' or 'individual'

  // Mock Analytics Data
  const stats = {
    totalResponses: 124,
    avgCompletionTime: '2m 45s',
    openStatus: 'Accepting Responses'
  };

  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        data: [65, 35, 15, 9],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)', // Purple
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(148, 163, 184, 0.8)', // Slate
          'rgba(244, 63, 94, 0.8)', // Rose
        ],
        borderColor: [
          'rgb(139, 92, 246)',
          'rgb(59, 130, 246)',
          'rgb(148, 163, 184)',
          'rgb(244, 63, 94)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const featuresData = {
    labels: ['Dashboard', 'Form Builder', 'Analytics', 'Export to CSV'],
    datasets: [
      {
        label: 'Usage Frequency',
        data: [110, 85, 60, 40],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto py-8 px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Satisfaction Survey</h1>
            <p className="text-sm text-slate-500">Form Responses & Analytics</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <Eye size={16} /> View Form
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white font-medium rounded-lg shadow-md hover:bg-slate-800 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Responses</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.totalResponses}</h3>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Avg. Time</p>
            <h3 className="text-2xl font-bold text-slate-900">{stats.avgCompletionTime}</h3>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Status</p>
            <h3 className="text-lg font-bold text-slate-900">{stats.openStatus}</h3>
          </div>
          <button className="w-12 h-6 bg-green-500 rounded-full relative transition-colors shadow-inner">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        <button 
          onClick={() => setTab('summary')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${tab === 'summary' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Summary
        </button>
        <button 
          onClick={() => setTab('individual')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${tab === 'individual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Individual
        </button>
      </div>

      {/* Body */}
      {tab === 'summary' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pb-20"
        >
          {/* Chart 1 */}
          <div className="glass-card bg-white p-6 rounded-xl">
            <h3 className="text-lg font-medium text-slate-800 mb-6">How satisfied were you with our service?</h3>
            <div className="md:h-64 h-48 w-full flex items-center justify-center">
              <Pie 
                data={satisfactionData} 
                options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} 
              />
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">124 responses</p>
          </div>

          {/* Chart 2 */}
          <div className="glass-card bg-white p-6 rounded-xl">
            <h3 className="text-lg font-medium text-slate-800 mb-6">Which features did you use?</h3>
            <div className="md:h-72 h-56 w-full">
              <Bar 
                data={featuresData} 
                options={{ 
                  maintainAspectRatio: false, 
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } }
                }} 
              />
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">124 responses</p>
          </div>

          {/* Text Responses */}
          <div className="glass-card bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-slate-800">Any additional comments or suggestions?</h3>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors tooltip-trigger" title="Filter text">
                <Filter size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm">
                The UI is absolutely beautiful. I love the drag-and-drop feature, it feels so smooth!
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm">
                Can you add an option to duplicate entire sections of a form?
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm">
                Great experience, no complaints.
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent">
              View all 45 responses
            </button>
          </div>

        </motion.div>
      )}

      {tab === 'individual' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 flex flex-col items-center justify-center text-center pb-20"
        >
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">Individual viewing not mocked yet</h3>
          <p className="text-slate-500">In a full application, this tab would paginate through individual user submissions.</p>
        </motion.div>
      )}

    </div>
  );
}
