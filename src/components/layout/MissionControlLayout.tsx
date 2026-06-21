import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Settings, BarChart2, Inbox, MessageSquare, Workflow, Shield, LogOut, ChevronLeft, Book, Menu, Bell, Search, Layers, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const NAV_ITEMS = [
  { path: '/dashboard', icon: BarChart2, label: 'Overview', exact: true },
  { path: '/dashboard/tickets', icon: Inbox, label: 'Tickets' },
  { path: '/dashboard/chat', icon: MessageSquare, label: 'AI Assistant' },
  { path: '/dashboard/knowledge-base', icon: Book, label: 'Knowledge Base' },
  { path: '/dashboard/automations', icon: Workflow, label: 'Automations' },
  { path: '/dashboard/admin', icon: Shield, label: 'Admin' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function MissionControlLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [location.pathname, isMobile]);

  const currentItem = NAV_ITEMS.find(item => 
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans flex transition-colors duration-200">
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/80 z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar - Pure Black in Light, Pure Black/Zinc in Dark */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-zinc-950 text-zinc-300 border-r border-zinc-900 transition-all duration-200 ease-in-out ${
          collapsed ? (isMobile ? '-translate-x-full' : 'w-[4.5rem]') : 'w-64 translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-4 border-b border-zinc-900">
          <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-xs mx-auto sm:mx-0 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          {!collapsed && <span className="ml-3 font-bold text-white tracking-wide">SupportFlow</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {!collapsed && (
            <div className="px-3 mb-2 mt-2">
               <span className="text-xs font-bold text-zinc-650 uppercase tracking-wider">Menu</span>
            </div>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md transition-colors group
                  ${isActive ? 'bg-white text-black font-bold' : 'hover:bg-zinc-900 hover:text-white'}
                `}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-semibold">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-900">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center w-full p-2 text-zinc-450 hover:text-white hover:bg-zinc-900 rounded-md transition-colors mb-1"
            title={collapsed ? "Expand" : undefined}
          >
            <ChevronLeft className={`w-5 h-5 shrink-0 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && <span className="ml-3 text-sm font-semibold">Collapse</span>}
          </button>
          <button 
            onClick={() => { signOut(); navigate('/'); }}
            className="flex items-center w-full p-2 text-zinc-450 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="ml-3 text-sm font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-h-screen transition-all duration-200 ease-in-out flex flex-col bg-zinc-50 dark:bg-black ${
          collapsed ? (isMobile ? 'ml-0' : 'ml-[4.5rem]') : (isMobile ? 'ml-0' : 'ml-64')
        }`}
      >
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 sticky top-0 z-30 transition-colors duration-200">
           <div className="flex items-center gap-4">
             {isMobile && (
               <button 
                 onClick={() => setCollapsed(!collapsed)} 
                 className="p-1 -ml-1 rounded text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
               >
                 <Menu className="w-6 h-6" />
               </button>
             )}
             
             {!isMobile && (
                <div className="flex items-center text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className="font-bold">SupportFlow</span>
                  <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
                  <span className="text-black dark:text-white font-bold">{currentItem?.label || 'Dashboard'}</span>
                </div>
             )}
           </div>

           <div className="flex items-center gap-2 sm:gap-4">
             {/* Global Search Mock */}
             <div className="hidden sm:flex items-center relative group mr-2">
               <Search className="w-4 h-4 text-zinc-400 absolute left-3" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="w-64 h-9 pl-9 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-md focus:bg-white dark:focus:bg-zinc-950 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all placeholder:text-zinc-500 text-black dark:text-white font-semibold"
               />
             </div>

             <button 
               onClick={toggleTheme} 
               className="relative p-2 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
               title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             <button className="relative p-2 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black" />
             </button>
             
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">JS</span>
             </div>
           </div>
        </header>

        {/* Page Container */}
        <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
