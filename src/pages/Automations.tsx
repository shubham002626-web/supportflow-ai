import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, Play, X, Workflow, GitBranch } from 'lucide-react';

const MOCK_AUTOMATIONS = [
  { id: '1', title: 'High Priority Escalation', trigger: 'Sentiment < 0.2', action: 'Route to Human Agent', active: true },
  { id: '2', title: 'Billing Query Auto-Reply', trigger: 'Intent = "Billing"', action: 'Provide Invoice Link', active: true },
  { id: '3', title: 'Spam Filtering', trigger: 'Confidence < 0.3', action: 'Archive Ticket', active: false },
];

export default function Automations() {
  const [automations, setAutomations] = useState(MOCK_AUTOMATIONS);
  const [isCreating, setIsCreating] = useState(false);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="space-y-6 text-[#EDEDED]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Automations</h1>
          <p className="text-sm text-[#888]">Define intelligent workflows and routing rules.</p>
        </div>
        <button 
          className="bg-white text-black hover:bg-[#EAEAEA] rounded-md font-medium text-sm px-4 py-2 transition-colors flex items-center gap-2" 
          onClick={() => setIsCreating(true)}
        >
          <Workflow className="w-4 h-4" /> New Rule
        </button>
      </div>

      {!isCreating ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {automations.map((automation, i) => (
                <div
                  key={automation.id}
                  className={`p-6 rounded-xl border transition-colors flex flex-col animate-in fade-in slide-in-from-bottom-2 ${automation.active ? 'bg-[#0A0A0A] border-[#333] hover:border-[#444]' : 'bg-[#111] border-[#222] opacity-70'}`}
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2 rounded-lg ${automation.active ? 'bg-[#222] text-[#EDEDED]' : 'bg-[#1A1A1A] text-[#666]'}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <button 
                      onClick={() => toggleAutomation(automation.id)}
                      className={`w-10 h-5 rounded-full transition-colors relative flex items-center ${automation.active ? 'bg-white' : 'bg-[#333]'}`}
                    >
                      <div className={`w-3 h-3 rounded-full absolute top-1 transition-transform duration-300 ${automation.active ? 'bg-black left-6' : 'bg-[#888] left-1'}`} />
                    </button>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-6">{automation.title}</h3>
                  
                  <div className="space-y-3 mt-auto">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-[#666] uppercase tracking-wider">When</span>
                        <span className="text-sm px-3 py-1.5 bg-[#111] border border-[#222] rounded-md truncate w-full">{automation.trigger}</span>
                      </div>
                      <div className="flex justify-center my-1">
                        <ArrowRight className="w-4 h-4 text-[#444] rotate-90" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-[#666] uppercase tracking-wider">Then</span>
                        <span className="text-sm px-3 py-1.5 bg-[#111] border border-[#222] rounded-md truncate w-full">{automation.action}</span>
                      </div>
                  </div>
                </div>
             ))}
        </div>
      ) : (
        <div
           className="max-w-3xl border border-[#222] bg-[#0A0A0A] rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#888]" /> Create Automation Rule
            </h3>
            <button onClick={() => setIsCreating(false)} className="p-2 rounded-md hover:bg-[#222] text-[#888] hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
             <div>
               <label className="block text-sm font-medium text-[#EDEDED] mb-2">Rule Name</label>
               <input type="text" placeholder="e.g. VIP Customer Escalation" className="w-full bg-[#111] border border-[#333] rounded-lg h-10 px-4 text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-[#666]" />
             </div>

             <div className="grid md:grid-cols-2 gap-6 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#333] bg-[#0A0A0A] flex items-center justify-center z-10 hidden md:flex">
                   <ArrowRight className="w-4 h-4 text-[#888]" />
                </div>

                <div className="p-5 rounded-xl border border-[#222] bg-[#111]">
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-sm font-medium text-white">Trigger (IF)</h4>
                  </div>
                  <select className="w-full bg-black border border-[#333] rounded-lg h-10 px-3 text-sm text-white outline-none mb-3">
                    <option>Sentiment Score Drops Below</option>
                    <option>Intent Matches Topic</option>
                    <option>Customer Tier Is</option>
                  </select>
                  <input type="text" placeholder="Value (e.g. 0.3)" className="w-full bg-black border border-[#333] rounded-lg h-10 px-3 text-sm text-white outline-none" />
                </div>

                <div className="p-5 rounded-xl border border-[#222] bg-[#111]">
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-sm font-medium text-white">Action (THEN)</h4>
                  </div>
                  <select className="w-full bg-black border border-[#333] rounded-lg h-10 px-3 text-sm text-white outline-none mb-3">
                    <option>Route to Human Agent</option>
                    <option>Auto-Reply with Knowledge</option>
                    <option>Add Tag</option>
                  </select>
                  <input type="text" placeholder="Parameters (e.g. 'Billing Team')" className="w-full bg-black border border-[#333] rounded-lg h-10 px-3 text-sm text-white outline-none" />
                </div>
             </div>

             <div className="flex justify-end pt-4 border-t border-[#222]">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="rounded-lg px-6 py-2 text-sm font-medium bg-white text-black hover:bg-[#EAEAEA] transition-colors"
                >
                   Save Rule
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
