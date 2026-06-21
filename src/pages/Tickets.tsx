import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, AlertCircle, Sparkles } from 'lucide-react';
import { useAITicketInsights } from '../hooks/useAI';
import { toast } from 'sonner';

const MOCK_TICKETS = [
  { id: 'SUP-4211', title: 'Cannot access billing dashboard', status: 'Open', priority: 'High', customer: 'Acme Corp', time: '2m ago' },
  { id: 'SUP-4210', title: 'API returning 500 error on POST /users', status: 'In Progress', priority: 'Critical', customer: 'TechFlow', time: '14m ago' },
  { id: 'SUP-4209', title: 'Need help exporting reports', status: 'Closed', priority: 'Low', customer: 'DesignCo', time: '1h ago' },
  { id: 'SUP-4208', title: 'Integration with Slack failing', status: 'Closed', priority: 'Medium', customer: 'Global Inc', time: '2h ago' },
];

export default function Tickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSaveTicket = (newTicket: any) => {
    setTickets([{
      id: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicket.summary || newTicket.rawTitle,
      status: 'Open',
      priority: newTicket.priority || 'Medium',
      customer: 'New User',
      time: 'Just now'
    }, ...tickets]);
    setIsModalOpen(false);
    toast.success('Ticket created successfully');
  };

  const toggleFilter = (priority: string) => {
    setActiveFilters(prev => 
      prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
    );
  };
  
  const filteredTickets = useMemo(() => tickets.filter(ticket => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = ticket.title.toLowerCase().includes(searchLower) || 
                          ticket.id.toLowerCase().includes(searchLower) ||
                          ticket.customer.toLowerCase().includes(searchLower);
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(ticket.priority);
    return matchesSearch && matchesFilter;
  }), [tickets, searchQuery, activeFilters]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Support Tickets</h1>
          <p className="text-sm text-slate-500">Manage and resolve customer inquiries.</p>
        </div>
        <button 
          className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md font-medium text-sm px-4 py-2 transition-colors shadow-sm flex items-center gap-2" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-3 rounded-lg border-standard shadow-sm">
        <div className="relative w-full sm:max-w-md group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            placeholder="Search tickets by ID, title, or customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 w-full bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-500" 
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto hide-scrollbar sm:border-l border-slate-200 sm:pl-4">
          <span className="text-sm text-slate-500 flex items-center gap-2 mr-2">
             <Filter className="w-4 h-4" />
          </span>
          {['Low', 'Medium', 'High', 'Critical'].map((priority) => {
            const isActive = activeFilters.includes(priority);
            return (
              <button
                key={priority}
                onClick={() => toggleFilter(priority)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {priority}
              </button>
            )
          })}
        </div>
      </div>

      {/* Ticket List */}
      <div className="pro-card overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[100px_minmax(0,1fr)_140px_120px_100px_100px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div>Ticket ID</div>
          <div>Issue Summary</div>
          <div>Customer</div>
          <div>Status</div>
          <div>Priority</div>
          <div className="text-right">Created</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
            {filteredTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="flex flex-col md:grid md:grid-cols-[100px_minmax(0,1fr)_140px_120px_100px_100px] gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-sm cursor-pointer"
              >
                 <div className="flex items-center gap-2 md:block">
                   <div className="md:hidden text-xs text-slate-500 uppercase tracking-wider">ID</div>
                   <span className="text-slate-500 font-mono text-sm">{ticket.id}</span>
                 </div>
                 
                 <div className="font-medium text-slate-900 truncate" title={ticket.title}>
                   {ticket.title}
                 </div>
                 
                 <div className="flex items-center gap-2 md:block text-slate-600">
                   <div className="md:hidden text-xs text-slate-500 uppercase tracking-wider">Customer</div>
                   {ticket.customer}
                 </div>

                 <div className="flex items-center gap-2">
                   {ticket.status === 'Open' && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                   {ticket.status === 'In Progress' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                   {ticket.status === 'Closed' && <span className="w-2 h-2 rounded-full bg-slate-400" />}
                   <span className="text-slate-700">{ticket.status}</span>
                 </div>

                 <div className="flex items-center gap-2 md:block">
                   <div className="md:hidden text-xs text-slate-500 uppercase tracking-wider">Priority</div>
                   <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.priority === 'Critical' ? 'text-red-700 bg-red-100' :
                      ticket.priority === 'High' ? 'text-orange-700 bg-orange-100' :
                      ticket.priority === 'Medium' ? 'text-indigo-700 bg-indigo-100' : 
                      'text-slate-700 bg-slate-100'
                   }`}>{ticket.priority}</span>
                 </div>

                 <div className="text-right text-slate-500 pt-2 border-t border-slate-100 md:border-0 md:pt-0 md:flex md:items-center md:justify-end">
                    {ticket.time}
                 </div>
              </div>
            ))}
          
          {filteredTickets.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                 <Search className="w-5 h-5 text-slate-400" />
               </div>
               <p className="font-medium text-slate-900 mb-1">No tickets found</p>
               <p className="text-sm text-slate-500 max-w-sm">We couldn't find any tickets matching your current search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
         <CreateTicketModal onClose={() => setIsModalOpen(false)} onSave={handleSaveTicket} />
      )}
    </div>
  );
}

function CreateTicketModal({ onClose, onSave }: { onClose: () => void, onSave: (ticket: any) => void }) {
  const [message, setMessage] = useState('');
  const [insights, setInsights] = useState<any>(null);
  const { analyzeTicket, isLoading } = useAITicketInsights();

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    const result = await analyzeTicket(message);
    setInsights(result);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col relative z-10 overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <h3 className="font-semibold text-lg text-slate-900">New Support Ticket</h3>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <AlertCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-5 bg-slate-50/50">
          <div className="space-y-1.5">
             <label className="text-sm font-medium text-slate-700">Customer Issue Description</label>
             <textarea 
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               className="w-full h-32 rounded-md border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none text-slate-900 placeholder:text-slate-400 transition-shadow"
               placeholder="Describe the issue in detail. Our AI will automatically categorize and prioritize it..."
             />
          </div>
          
          <button 
            className="w-full rounded-md h-10 text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
            onClick={handleAnalyze} 
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner /> Processing with AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analyze with Gemini AI
              </span>
            )}
          </button>

          {insights && (
            <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">AI Analysis Complete</span>
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">{insights.summary}</p>
              
              <div className="flex gap-6 text-sm pt-2 border-t border-emerald-200/60 mt-3">
                 <div>
                   <span className="text-slate-500 text-xs block mb-1">Category</span>
                   <span className="font-semibold text-slate-900">{insights.category}</span>
                 </div>
                 <div>
                   <span className="text-slate-500 text-xs block mb-1">Suggested Priority</span>
                   <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      insights.priority === 'Critical' ? 'text-red-700 bg-red-100' :
                      insights.priority === 'High' ? 'text-orange-700 bg-orange-100' :
                      insights.priority === 'Medium' ? 'text-indigo-700 bg-indigo-100' : 
                      'text-slate-700 bg-slate-200'
                   }`}>{insights.priority}</span>
                 </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent">Cancel</button>
          <button onClick={() => onSave(insights || { rawTitle: message })} className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors">Create Ticket</button>
        </div>
      </div>
    </div>
  );
}

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)
