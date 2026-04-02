import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function PublicForm() {
  const { formId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState({});

  // Mock Form Data (In reality, fetch this from Firestore using formId)
  const formData = {
    title: 'Customer Satisfaction Survey',
    description: 'We value your feedback! Please take a moment to tell us about your experience.',
    themeColor: 'purple',
    questions: [
      { id: 'q1', type: 'short_answer', text: 'What is your Full Name?', required: true },
      { id: 'q2', type: 'multiple_choice', text: 'How satisfied were you with our service?', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
      { id: 'q3', type: 'checkboxes', text: 'Which features did you use?', required: false, options: ['Dashboard', 'Form Builder', 'Analytics', 'Export to CSV'] },
      { id: 'q4', type: 'paragraph', text: 'Any additional comments or suggestions?', required: false }
    ]
  };

  const handleResponseChange = (questionId, value, isCheckbox = false) => {
    if (isCheckbox) {
      setResponses(prev => {
        const current = prev[questionId] || [];
        if (current.includes(value)) {
          return { ...prev, [questionId]: current.filter(item => item !== value) };
        } else {
          return { ...prev, [questionId]: [...current, value] };
        }
      });
    } else {
      setResponses({ ...responses, [questionId]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    console.log('Submitting responses:', responses);
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-md p-10 flex flex-col items-center border-t-8 border-t-green-500"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Response Recorded</h2>
          <p className="text-slate-600 mb-8">Thank you for submitting your response. Your answers have been saved.</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 font-medium hover:underline"
          >
            Submit another response
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 w-full pb-20">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Form Header */}
        <div className="glass-card bg-white p-8 border-t-8 border-t-purple-500 rounded-xl shadow-sm">
          <h1 className="text-3xl font-regular mb-3 text-slate-900">{formData.title}</h1>
          <p className="text-slate-600">{formData.description}</p>
          <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-red-500">
            * Indicates required question
          </div>
        </div>

        {/* Questions */}
        {formData.questions.map((q, idx) => (
          <div key={q.id} className={`glass-card bg-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md border border-slate-200 ${responses[q.id] ? 'border-l-4 border-l-blue-500' : ''}`}>
            <h3 className="text-base font-medium text-slate-800 mb-4 flex">
              {q.text} {q.required && <span className="text-red-500 ml-1">*</span>}
            </h3>

            {q.type === 'short_answer' && (
              <input 
                type="text" 
                required={q.required}
                onChange={(e) => handleResponseChange(q.id, e.target.value)}
                placeholder="Your answer"
                className="w-full md:w-1/2 border-b border-slate-300 focus:border-blue-500 py-2 focus:outline-none bg-transparent transition-colors text-slate-800"
              />
            )}

            {q.type === 'paragraph' && (
              <textarea 
                required={q.required}
                onChange={(e) => handleResponseChange(q.id, e.target.value)}
                placeholder="Your answer"
                rows={3}
                className="w-full border-b border-slate-300 focus:border-blue-500 py-2 focus:outline-none bg-transparent transition-colors text-slate-800 resize-y"
              />
            )}

            {q.type === 'multiple_choice' && (
              <div className="space-y-3">
                {q.options.map((opt, oIdx) => (
                  <label key={oIdx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name={q.id} 
                        value={opt}
                        required={q.required}
                        onChange={() => handleResponseChange(q.id, opt)}
                        className="peer opacity-0 absolute"
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-slate-400 peer-checked:border-blue-500 group-hover:border-blue-400 transition-colors flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                      </div>
                    </div>
                    <span className="text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'checkboxes' && (
              <div className="space-y-3">
                {q.options.map((opt, oIdx) => {
                  const isChecked = (responses[q.id] || []).includes(opt);
                  return (
                    <label key={oIdx} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleResponseChange(q.id, opt, true)}
                          className="peer opacity-0 absolute"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-colors flex items-center justify-center ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-slate-400 group-hover:border-blue-400'}`}>
                          <CheckCircle2 size={16} className={`text-white scale-0 transition-transform ${isChecked ? 'scale-100' : ''}`} />
                        </div>
                      </div>
                      <span className="text-slate-700">{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4">
          <button 
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
          >
            Submit <Send size={18} />
          </button>
          <span className="text-sm text-slate-400">Never submit passwords through forms.</span>
        </div>
      </motion.form>
    </div>
  );
}
