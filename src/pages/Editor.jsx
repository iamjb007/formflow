import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Trash2, Copy, Image as ImageIcon, Settings, Eye, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editor() {
  const { formId } = useParams();
  const navigate = useNavigate();
  
  const [formDetails, setFormDetails] = useState({
    title: 'Untitled Form',
    description: ''
  });

  const [questions, setQuestions] = useState([
    { 
      id: `q-${Date.now()}`, 
      type: 'multiple_choice', 
      text: 'Untitled Question', 
      required: false, 
      options: ['Option 1'] 
    }
  ]);

  const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id);

  // Handlers for Questions
  const addQuestion = () => {
    const newQuestion = {
      id: `q-${Date.now()}`,
      type: 'multiple_choice',
      text: '',
      required: false,
      options: ['Option 1']
    };
    setQuestions([...questions, newQuestion]);
    setActiveQuestionId(newQuestion.id);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const cloneQuestion = (q) => {
    const cloned = { ...q, id: `q-${Date.now()}` };
    const index = questions.findIndex(quest => quest.id === q.id);
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, cloned);
    setQuestions(newQuestions);
    setActiveQuestionId(cloned.id);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId, optIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const addOption = (qId) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] };
      }
      return q;
    }));
  };

  const removeOption = (qId, optIndex) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions.splice(optIndex, 1);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-6 w-[calc(100%+3rem)]">
      {/* Editor Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <input 
            type="text" 
            value={formDetails.title}
            onChange={(e) => setFormDetails({...formDetails, title: e.target.value})}
            className="text-lg font-semibold text-slate-800 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-colors px-1 py-0.5"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors tooltip-trigger" title="Preview">
            <Eye size={20} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" title="Settings">
            <Settings size={20} />
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            Save & Publish
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 bg-slate-50 overflow-y-auto w-full relative pt-8 pb-32">
        <div className="max-w-3xl mx-auto w-full px-4 relative">
          
          {/* Header Card */}
          <div className="glass-card bg-white border-t-8 border-t-purple-500 p-6 mb-4">
            <input
              type="text"
              value={formDetails.title}
              onChange={(e) => setFormDetails({...formDetails, title: e.target.value})}
              className="w-full text-3xl font-normal text-slate-900 border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors pb-2 mb-2 bg-transparent"
              placeholder="Form Title"
            />
            <textarea
              value={formDetails.description}
              onChange={(e) => setFormDetails({...formDetails, description: e.target.value})}
              className="w-full text-sm text-slate-600 border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors pb-1 bg-transparent resize-none"
              placeholder="Form description"
              rows={1}
            />
          </div>

          {/* Questions Drag and Drop List */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {questions.map((q, index) => {
                    const isActive = activeQuestionId === q.id;
                    return (
                      <Draggable key={q.id} draggableId={q.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`relative bg-white rounded-xl shadow-sm border transition-all duration-200 ${isActive ? 'border-l-4 border-l-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                            onClick={() => setActiveQuestionId(q.id)}
                            style={provided.draggableProps.style}
                          >
                            {/* Drag Handle */}
                            <div 
                              {...provided.dragHandleProps} 
                              className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-6 flex items-center justify-center cursor-grab text-slate-300 hover:text-slate-500 opacity-0 transition-opacity"
                              style={{ opacity: isActive || snapshot.isDragging ? 1 : '' }}
                            >
                              <GripVertical size={16} className="rotate-90" />
                            </div>

                            <div className="p-6 pt-8">
                              <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <input
                                  type="text"
                                  value={q.text}
                                  onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                  placeholder="Question"
                                  className="flex-1 bg-slate-50 text-slate-900 px-4 py-3 rounded-md border-b-2 border-slate-200 focus:border-blue-500 focus:bg-slate-100 focus:outline-none transition-colors font-medium text-base h-12"
                                />
                                {isActive && (
                                  <select
                                    value={q.type}
                                    onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                                    className="w-full md:w-48 bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-12"
                                  >
                                    <option value="short_answer">Short answer</option>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="multiple_choice">Multiple choice</option>
                                    <option value="checkboxes">Checkboxes</option>
                                  </select>
                                )}
                              </div>

                              {/* Question Type Visuals */}
                              <div className="pl-4">
                                {(q.type === 'short_answer' || q.type === 'paragraph') && (
                                  <div className="w-1/2 border-b border-dotted border-slate-400 pb-2 text-slate-400 text-sm">
                                    {q.type === 'short_answer' ? 'Short answer text' : 'Long answer text'}
                                  </div>
                                )}

                                {(q.type === 'multiple_choice' || q.type === 'checkboxes') && (
                                  <div className="space-y-3 mt-2">
                                    {q.options.map((opt, oIndex) => (
                                      <div key={oIndex} className="flex items-center gap-3 group">
                                        <div className={`w-4 h-4 shrink-0 border-2 border-slate-300 ${q.type === 'multiple_choice' ? 'rounded-full' : 'rounded-sm'}`} />
                                        <input
                                          type="text"
                                          value={opt}
                                          onChange={(e) => updateOption(q.id, oIndex, e.target.value)}
                                          className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none py-1 text-sm text-slate-800"
                                        />
                                        {isActive && q.options.length > 1 && (
                                          <button onClick={() => removeOption(q.id, oIndex)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                            <Trash2 size={16} />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                    {isActive && (
                                      <div className="flex items-center gap-3 pt-2">
                                        <div className={`w-4 h-4 shrink-0 border-2 border-slate-200 ${q.type === 'multiple_choice' ? 'rounded-full' : 'rounded-sm'}`} />
                                        <button onClick={() => addOption(q.id)} className="text-sm border-b border-transparent hover:border-slate-300 text-blue-600 transition-colors">
                                          Add option
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Question Footer Toolbar */}
                              {isActive && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }} 
                                  animate={{ opacity: 1, height: 'auto' }} 
                                  className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-4"
                                >
                                  <button onClick={() => cloneQuestion(q)} className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors tooltip-trigger" title="Duplicate">
                                    <Copy size={20} />
                                  </button>
                                  <button onClick={() => deleteQuestion(q.id)} className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors tooltip-trigger" title="Delete">
                                    <Trash2 size={20} />
                                  </button>
                                  <div className="w-px h-6 bg-slate-200 mx-2" />
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-600">Required</span>
                                    <button 
                                      onClick={() => updateQuestion(q.id, 'required', !q.required)}
                                      className={`w-10 h-5 rounded-full relative transition-colors ${q.required ? 'bg-blue-600' : 'bg-slate-300'}`}
                                    >
                                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${q.required ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Floating Action Menu (Side if wide enough, otherwise bottom) */}
          <div className="fixed md:absolute right-6 bottom-6 md:right-[-60px] md:top-0 md:bottom-auto bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex flex-row md:flex-col gap-2 z-30">
            <button onClick={addQuestion} className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger" title="Add question">
              <Plus size={20} />
            </button>
            <button className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger" title="Add Image">
              <ImageIcon size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
