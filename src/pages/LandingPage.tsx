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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-200 overflow-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 opacity-0 animate-fade-in-up">
            <div className="w-8 h-8 rounded bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-black dark:text-white tracking-tight">SupportFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-700 dark:text-zinc-300 opacity-0 animate-fade-in-up delay-100">
            <a href="#features" className="hover:text-black dark:hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-black dark:hover:text-white transition-colors">Performance</a>
            <a href="#enterprise" className="hover:text-black dark:hover:text-white transition-colors">Enterprise</a>
          </nav>

          <div className="flex items-center gap-4 opacity-0 animate-fade-in-up delay-200">
            <button 
               onClick={toggleTheme} 
               className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-bold text-sm hover:bg-zinc-850 dark:hover:bg-zinc-150 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="pt-32 pb-24 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white mb-6 leading-tight transition-colors opacity-0 animate-fade-in-up">
            Customer support, <br/>
            <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 inline-block mt-2 rounded-md">automated with AI.</span>
          </h1>

          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-350 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors opacity-0 animate-fade-in-up delay-100">
            SupportFlow combines a blazing-fast ticketing engine with Gemini AI to resolve support tickets instantly. Empower your team to focus on high-value interactions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in-up delay-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-bold text-base hover:bg-zinc-850 dark:hover:bg-zinc-150 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-black dark:text-white rounded-md font-bold text-base hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Contact Sales
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 opacity-0 animate-fade-in-up delay-300">
            {['No credit card required', '14-day free trial', 'Cancel anytime'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-black dark:text-white" />
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-850 py-16 px-6 transition-colors">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-0 animate-fade-in-up">
            {STATS.map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-black text-black dark:text-white">{s.value}</div>
                <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-white dark:bg-black transition-colors">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 opacity-0 animate-fade-in-up">
              <h2 className="text-3xl font-black text-black dark:text-white mb-4">Enterprise-grade capabilities</h2>
              <p className="text-zinc-600 dark:text-zinc-350 max-w-2xl mx-auto font-medium">Built for modern support teams that demand speed, intelligence, and reliability at scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="p-8 rounded-xl bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-850 shadow-sm flex flex-col items-start text-left transition-all duration-300 hover:border-black dark:hover:border-white hover:-translate-y-1 opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-6">
                    <f.icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">{f.title}</h3>
                  <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-black dark:bg-white text-white dark:text-black text-center transition-colors">
          <div className="max-w-3xl mx-auto opacity-0 animate-scale-in">
            <h2 className="text-4xl font-black mb-6">Ready to transform your support?</h2>
            <p className="text-zinc-300 dark:text-zinc-750 mb-10 text-lg font-medium">Join forward-thinking companies automating their customer experience.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 bg-white dark:bg-black text-black dark:text-white rounded-md font-bold text-base hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-md hover:-translate-y-0.5"
            >
              Get Started for Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 px-6 border-t border-zinc-850">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center text-zinc-300">
              <Layers className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">© 2026 SupportFlow Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
