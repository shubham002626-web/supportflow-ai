import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { Activity, Inbox, MessageSquare, Clock, Zap, TrendingUp, Sparkles, Bot } from 'lucide-react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';

const ACTIVITY_FEED = [
  { icon: Bot, color: 'text-black dark:text-white', bg: 'bg-zinc-100 dark:bg-zinc-900', text: 'AI Assistant resolved ticket', highlight: 'SUP-4211', time: '2 mins ago' },
  { icon: MessageSquare, color: 'text-zinc-650 dark:text-zinc-350', bg: 'bg-zinc-100 dark:bg-zinc-900', text: 'New conversation started by', highlight: 'TechFlow Inc', time: '14 mins ago' },
  { icon: Inbox, color: 'text-zinc-650 dark:text-zinc-350', bg: 'bg-zinc-100 dark:bg-zinc-900', text: 'Escalated ticket', highlight: 'SUP-4209', time: '1 hour ago' },
  { icon: Sparkles, color: 'text-black dark:text-white', bg: 'bg-zinc-100 dark:bg-zinc-900', text: 'AI auto-tagged 12 tickets as', highlight: 'Billing', time: '2 hours ago' },
];

export default function Dashboard() {
  const { data, stats, isLoading, error } = useAnalyticsData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4 text-zinc-550 dark:text-zinc-400">
          <Activity className="w-6 h-6 animate-pulse" />
          <p className="text-sm font-semibold">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white rounded-md max-w-lg">
        <p className="font-bold text-sm">Failed to load overview</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket': return <Inbox className="w-5 h-5 text-black dark:text-white" />;
      case 'Sparkles': return <Zap className="w-5 h-5 text-black dark:text-white" />;
      case 'Clock': return <Clock className="w-5 h-5 text-black dark:text-white" />;
      case 'AlertCircle': return <Activity className="w-5 h-5 text-black dark:text-white" />;
      default: return <Activity className="w-5 h-5 text-black dark:text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-black dark:text-white mb-1">Dashboard Overview</h1>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Monitor your team's performance and AI automation metrics.</p>
        </div>
        <div className="flex items-center gap-2">
           <select className="text-sm border border-zinc-350 dark:border-zinc-750 rounded-md bg-white dark:bg-zinc-900 px-3 py-1.5 shadow-sm focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white font-bold">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
             <option>This Quarter</option>
           </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="pro-card p-5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-zinc-550 dark:text-zinc-450">{stat.title}</span>
              <div className="text-black dark:text-white">
                {getIcon(stat.iconName)}
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-black text-black dark:text-white">{stat.value}</span>
              <span className="text-xs font-bold px-2 py-1 rounded border border-black dark:border-white text-black dark:text-white bg-zinc-50 dark:bg-zinc-900 flex items-center gap-1">
                {stat.trend.startsWith('+') && <TrendingUp className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ticket Volume Chart */}
        <div className="lg:col-span-2 pro-card p-6 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-black dark:text-white">Ticket Volume</h3>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Incoming vs Resolved</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-black dark:text-white">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-black dark:bg-white" /> Incoming</span>
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded border border-black dark:border-white bg-transparent" /> Resolved</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTicketsDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ color: '#000000', fontSize: '14px', fontWeight: 700 }}
                  labelStyle={{ color: '#71717a', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="tickets" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorTickets)" />
                <Area type="monotone" dataKey="resolved" stroke="#71717a" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Efficiency Card */}
        <div className="lg:col-span-1 pro-card p-6 flex flex-col bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850">
          <div className="mb-6">
            <h3 className="text-base font-bold text-black dark:text-white">Automation Rate</h3>
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">AI vs Human Resolution</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="#000000"
                  className="dark:stroke-white"
                  strokeWidth="12"
                  strokeDasharray="264"
                  strokeDashoffset="39.6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-black dark:text-white">85%</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-zinc-650 dark:text-zinc-350 mb-8 leading-relaxed px-4">
              Requests resolved by AI without human intervention today.
            </p>

            <button className="w-full py-2.5 px-4 rounded-md bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-zinc-850 dark:hover:bg-zinc-150 transition-colors shadow-sm">
              View Analytics Report
            </button>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="pro-card overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
          <h2 className="text-sm font-bold text-black dark:text-white">Recent Activity</h2>
          <button className="text-sm text-black dark:text-white hover:underline font-bold">
            View all
          </button>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
          {ACTIVITY_FEED.map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded ${item.bg} flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-850`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-zinc-850 dark:text-zinc-200 font-medium">
                  {item.text} <span className="font-bold text-black dark:text-white">{item.highlight}</span>
                </span>
              </div>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs shrink-0 ml-4 font-semibold">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
