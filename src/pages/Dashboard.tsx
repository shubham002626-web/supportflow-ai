import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { Activity, Inbox, MessageSquare, Clock, Zap, TrendingUp, Sparkles, Bot } from 'lucide-react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';

const ACTIVITY_FEED = [
  { icon: Bot, color: 'text-indigo-600', bg: 'bg-indigo-50', text: 'AI Assistant resolved ticket', highlight: 'SUP-4211', time: '2 mins ago' },
  { icon: MessageSquare, color: 'text-slate-600', bg: 'bg-slate-100', text: 'New conversation started by', highlight: 'TechFlow Inc', time: '14 mins ago' },
  { icon: Inbox, color: 'text-amber-600', bg: 'bg-amber-50', text: 'Escalated ticket', highlight: 'SUP-4209', time: '1 hour ago' },
  { icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50', text: 'AI auto-tagged 12 tickets as', highlight: 'Billing', time: '2 hours ago' },
];

export default function Dashboard() {
  const { data, stats, isLoading, error } = useAnalyticsData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Activity className="w-6 h-6 animate-pulse" />
          <p className="text-sm font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md max-w-lg">
        <p className="font-semibold text-sm">Failed to load overview</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket': return <Inbox className="w-5 h-5" />;
      case 'Sparkles': return <Zap className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'AlertCircle': return <Activity className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">Monitor your team's performance and AI automation metrics.</p>
        </div>
        <div className="flex items-center gap-2">
           <select className="text-sm border-standard rounded-md bg-white px-3 py-1.5 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
             <option>This Quarter</option>
           </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="pro-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <div className="text-slate-400">
                {getIcon(stat.iconName)}
              </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.trend.startsWith('+')
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-red-700 bg-red-50'
              }`}>
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
        <div className="lg:col-span-2 pro-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Ticket Volume</h3>
              <p className="text-sm text-slate-500">Incoming vs Resolved</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-indigo-600" /> Incoming</span>
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Resolved</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ color: '#0f172a', fontSize: '14px', fontWeight: 500 }}
                  labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="tickets" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorTickets)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Efficiency Card */}
        <div className="lg:col-span-1 pro-card p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-900">Automation Rate</h3>
            <p className="text-sm text-slate-500">AI vs Human Resolution</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeDasharray="264"
                  strokeDashoffset="39.6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">85%</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-8 leading-relaxed px-4">
              Requests resolved by AI without human intervention today.
            </p>

            <button className="w-full py-2 px-4 rounded-md bg-white border-standard text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm">
              View Analytics Report
            </button>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="pro-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {ACTIVITY_FEED.map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between text-sm hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-slate-700">
                  {item.text} <span className="font-medium text-slate-900">{item.highlight}</span>
                </span>
              </div>
              <span className="text-slate-500 text-xs shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
