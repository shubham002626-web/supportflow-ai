import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Shield, BarChart2, CheckCircle2, Layers, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI-Powered Resolution',
    description: 'Resolve up to 85% of incoming tickets automatically using your knowledge base and past resolutions.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Triage',
    description: 'Instant priority classification and smart routing ensures critical issues reach the right agent in seconds.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption, RBAC, SSO, and full audit trails out of the box.',
  },
  {
    icon: BarChart2,
    title: 'Real-Time Analytics',
    description: 'Comprehensive dashboards tracking CSAT, resolution time, and team performance — updated in real-time.',
  },
];

const STATS = [
  { value: '85%', label: 'Auto-Resolution Rate' },
  { value: '< 2s', label: 'Average Response Time' },
  { value: '10x', label: 'Agent Productivity Increase' },
  { value: '99.99%', label: 'Platform Uptime SLA' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 opacity-0 animate-fade-in-up">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white tracking-tight">SupportFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400 opacity-0 animate-fade-in-up delay-100">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#stats" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Performance</a>
            <a href="#enterprise" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Enterprise</a>
          </nav>

          <div className="flex items-center gap-4 opacity-0 animate-fade-in-up delay-200">
            <button 
               onClick={toggleTheme} 
               className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="pt-32 pb-24 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight transition-colors opacity-0 animate-fade-in-up">
            Customer support, <br/>
            <span className="text-indigo-600 dark:text-indigo-500">automated with AI.</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors opacity-0 animate-fade-in-up delay-100">
            SupportFlow combines a blazing-fast ticketing engine with Gemini AI to resolve support tickets instantly. Empower your team to focus on high-value interactions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in-up delay-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium text-base hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-md font-medium text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Contact Sales
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 opacity-0 animate-fade-in-up delay-300">
            {['No credit card required', '14-day free trial', 'Cancel anytime'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-6 transition-colors">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-0 animate-fade-in-up">
            {STATS.map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 transition-colors">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 opacity-0 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Enterprise-grade capabilities</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Built for modern support teams that demand speed, intelligence, and reliability at scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((f, i) => (
                <div key={i} className={`p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-start text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 opacity-0 animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center mb-6">
                    <f.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-indigo-600 dark:bg-indigo-700 text-white text-center transition-colors">
          <div className="max-w-3xl mx-auto opacity-0 animate-scale-in">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your support?</h2>
            <p className="text-indigo-100 dark:text-indigo-200 mb-10 text-lg">Join forward-thinking companies automating their customer experience.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 bg-white text-indigo-600 rounded-md font-semibold text-base hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started for Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-300">
              <Layers className="w-3 h-3" />
            </div>
            <span className="text-sm">© 2026 SupportFlow Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
