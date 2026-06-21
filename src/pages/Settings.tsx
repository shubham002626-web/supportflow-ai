import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Settings as SettingsIcon, User, Monitor, Sun, Moon, ShieldAlert } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-3xl space-y-6 text-[#EDEDED]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-sm text-[#888]">Manage your account preferences and application settings.</p>
      </div>

      <div className="border border-[#222] bg-[#0A0A0A] rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#222]">
          <h2 className="text-base font-medium text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#888]" /> Profile
          </h2>
        </div>
        <div className="p-6 space-y-6 bg-[#111]">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#888] uppercase tracking-wider">Email Address</label>
            <input value={user?.email || 'admin@supportflow.ai'} readOnly className="w-full bg-[#0A0A0A] border border-[#222] h-10 px-3 rounded-lg text-sm text-[#666] cursor-not-allowed focus:outline-none" />
            <p className="text-xs text-[#666]">Your email address is managed by your SSO provider.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#888] uppercase tracking-wider">Display Name</label>
            <input placeholder="Admin User" className="w-full bg-[#0A0A0A] border border-[#333] h-10 px-3 rounded-lg text-sm text-white focus:outline-none focus:border-[#555] transition-colors" />
          </div>
          <div className="flex justify-end pt-2">
            <button className="bg-white text-black hover:bg-[#EAEAEA] rounded-md font-medium text-sm px-4 py-2 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="border border-[#222] bg-[#0A0A0A] rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#222]">
          <h2 className="text-base font-medium text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#888]" /> Appearance
          </h2>
        </div>
        <div className="p-6 bg-[#111]">
          <div className="space-y-4">
            <label className="text-xs font-medium text-[#888] uppercase tracking-wider">Theme Preference</label>
            <div className="flex gap-4">
              <button 
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex-1 h-14 rounded-lg border flex items-center px-4 transition-colors ${theme === 'dark' ? 'bg-[#222] border-[#444] text-white' : 'bg-[#0A0A0A] border-[#222] text-[#888] hover:border-[#333]'}`}
              >
                <Moon className="w-4 h-4 mr-3" />
                <span className="font-medium text-sm">Dark Theme</span>
              </button>
              <button 
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex-1 h-14 rounded-lg border flex items-center px-4 transition-colors ${theme === 'light' ? 'bg-[#222] border-[#444] text-white' : 'bg-[#0A0A0A] border-[#222] text-[#888] hover:border-[#333]'}`}
              >
                <Sun className="w-4 h-4 mr-3" />
                <span className="font-medium text-sm">Light Theme</span>
              </button>
            </div>
            <p className="text-xs text-[#666]">This setting is saved locally to your browser.</p>
          </div>
        </div>
      </div>

      <div className="border border-red-900/30 bg-[#1A0505] rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-red-900/30">
          <h2 className="text-base font-medium text-red-500 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" /> Danger Zone
          </h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-[#888] mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="bg-transparent border border-red-900/50 text-red-500 hover:bg-red-500/10 rounded-md font-medium text-sm px-4 py-2 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
