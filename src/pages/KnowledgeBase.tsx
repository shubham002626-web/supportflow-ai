import React, { useState } from 'react';
import { Search, Plus, FileText, ChevronRight, UploadCloud, File, Trash, RefreshCw, Loader2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const ARTICLES = [
  { id: 1, category: 'Getting Started', title: 'Initialization Sequence & Platform Boot', views: '1.2k', updated: '2 days ago' },
  { id: 2, category: 'Billing', title: 'Invoice Ledger & Access Protocols', views: '840', updated: '1 week ago' },
  { id: 3, category: 'Troubleshooting', title: 'Resolving Connection Sync Issues', views: '320', updated: '3 weeks ago' },
  { id: 4, category: 'API Security', title: 'Authenticating with Vault JWTs', views: '2.1k', updated: '1 month ago' },
];

const INITIAL_DOCS = ['API_Documentation_v2.pdf', 'Refund_Policy_2026.docx', 'Product_Specs_April.txt'];

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<'articles' | 'uploads'>('articles');
  const [isUploading, setIsUploading] = useState(false);
  const [docs, setDocs] = useState(INITIAL_DOCS);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const fileNames = Array.from(e.target.files).map((f: File) => f.name);
      
      setTimeout(() => {
        setDocs(prev => [...fileNames, ...prev]);
        setIsUploading(false);
        toast.success(`Successfully uploaded and indexed ${fileNames.length} document(s)`);
      }, 2000);
    }
  };

  const handleReindex = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        loading: 'Syncing Knowledge Base...',
        success: 'Knowledge Base fully synced.',
        error: 'Failed to sync.',
      }
    );
  };

  return (
    <div className="space-y-6 text-[#EDEDED]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Knowledge Base</h1>
          <p className="text-sm text-[#888]">Manage articles and upload documents for AI training.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-[#111] border border-[#333] text-white hover:bg-[#222] rounded-md font-medium text-sm px-4 py-2 transition-colors flex items-center gap-2" onClick={handleReindex}>
             <RefreshCw className="w-4 h-4 text-[#888]" /> Sync
           </button>
           <button className="bg-white text-black hover:bg-[#EAEAEA] rounded-md font-medium text-sm px-4 py-2 transition-colors flex items-center gap-2">
             <Plus className="w-4 h-4" /> New Article
           </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center group font-medium ${
              activeTab === 'articles' 
                ? 'bg-white text-black' 
                : 'bg-transparent text-[#888] hover:bg-[#111] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 mr-3" /> Articles
          </button>
          <button 
            onClick={() => setActiveTab('uploads')}
            className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center group font-medium ${
              activeTab === 'uploads' 
                ? 'bg-white text-black' 
                : 'bg-transparent text-[#888] hover:bg-[#111] hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4 mr-3" /> Training Data
          </button>
        </div>

        <div className="flex-1">
            {activeTab === 'articles' && (
              <div 
                key="articles"
                className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="relative w-full max-w-sm mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                  <input placeholder="Search articles..." className="pl-9 h-10 w-full bg-[#111] border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#555] transition-colors placeholder:text-[#666]" />
                </div>

                <div className="grid gap-3">
                  {ARTICLES.map((article, i) => (
                      <div className="p-4 rounded-xl border border-[#222] bg-[#0A0A0A] hover:bg-[#111] transition-colors cursor-pointer group flex items-center justify-between animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }} key={article.id}>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center">
                            <FileText className="h-4 w-4 text-[#888] group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-sm mb-1">{article.title}</h3>
                            <div className="text-xs text-[#666] flex items-center gap-2">
                              <span className="text-[#888]">{article.category}</span>
                              <span>•</span>
                              <span>{article.views} views</span>
                              <span>•</span>
                              <span>Updated {article.updated}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[#444] group-hover:text-[#888] transition-colors" />
                      </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'uploads' && (
               <div 
                 key="uploads"
                 className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300"
               >
                 <div className="border border-dashed border-[#333] bg-[#0A0A0A] hover:bg-[#111] transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center relative group">
                   <div className="w-12 h-12 rounded-full bg-[#222] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                     <UploadCloud className="h-5 w-5 text-[#888] group-hover:text-white" />
                   </div>
                   <h3 className="text-base font-medium text-white mb-2">Upload Training Data</h3>
                   <p className="text-[#888] text-sm max-w-md mb-6">
                     Drag and drop PDF, DOCX, or TXT files here to train the AI.
                   </p>
                   <button className="bg-white text-black hover:bg-[#EAEAEA] rounded-md font-medium text-sm px-4 py-2 transition-colors relative overflow-hidden" disabled={isUploading}>
                     <span className="pointer-events-none relative z-10 flex items-center">
                       {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Select Files"}
                     </span>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed" multiple accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} disabled={isUploading} />
                   </button>
                 </div>

                 <div>
                   <h3 className="text-sm font-medium text-white mb-3">Active Documents</h3>
                   <div className="grid gap-2">
                     {docs.map((doc, idx) => (
                         <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-[#222] bg-[#0A0A0A] hover:bg-[#111] group animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
                         <div className="flex items-center gap-3">
                           <File className="h-4 w-4 text-[#666] group-hover:text-[#888] transition-colors" />
                           <span className="text-sm font-medium text-[#EDEDED]">{doc}</span>
                         </div>
                         <div className="flex items-center gap-4">
                           <span className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Synced
                           </span>
                           <button className="text-[#666] hover:text-red-500 transition-colors">
                             <Trash className="h-4 w-4" />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            )}
        </div>
      </div>
    </div>
  );
}
