import React, { useState } from 'react';
import { ShieldAlert, Users, Search, UserMinus, Shield, Activity, Fingerprint } from 'lucide-react';

const MOCK_USERS = [
  { id: 'usr_1', email: 'alice@company.com', role: 'admin', lastActive: '2 mins ago' },
  { id: 'usr_2', email: 'bob@company.com', role: 'editor', lastActive: '1 hr ago' },
  { id: 'usr_3', email: 'charlie@company.com', role: 'viewer', lastActive: '2 days ago' },
];

const MOCK_LOGS = [
  { action: 'Deleted Ticket #1290', by: 'alice@company.com', time: '1 hr ago' },
  { action: 'Updated Knowledge Base', by: 'bob@company.com', time: '3 hrs ago' },
  { action: 'Changed permissions for charlie', by: 'alice@company.com', time: '1 day ago' },
];

export default function Admin() {
  return (
    <div className="space-y-6 text-[#EDEDED]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Administration</h1>
        <p className="text-sm text-[#888]">Manage users, roles, and view system logs.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-[#222] bg-[#0A0A0A] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#888]" /> Users
                </h2>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                <input placeholder="Search users..." className="pl-9 h-9 w-full bg-[#111] border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#555] transition-colors" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#888] bg-[#111] border-b border-[#222]">
                  <tr>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Last Active</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222] bg-[#0A0A0A]">
                  {MOCK_USERS.map((u) => (
                      <tr key={u.id} className="hover:bg-[#111] transition-colors group">
                        <td className="px-6 py-4 text-[#EDEDED]">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            u.role === 'admin' ? 'bg-[#222] text-white border border-[#444]' :
                            'bg-[#111] text-[#888] border border-[#222]'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#666] text-xs">{u.lastActive}</td>
                        <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-[#888] hover:text-white hover:bg-[#222] rounded transition-colors" title="Manage Role"><Shield className="h-4 w-4" /></button>
                          <button className="p-1.5 text-[#888] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Remove User"><UserMinus className="h-4 w-4" /></button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-[#222] bg-[#0A0A0A] rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#222]">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#888]" /> Audit Logs
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_LOGS.map((log, i) => (
                  <div key={i} className="flex flex-col space-y-1 border-b border-[#222] pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-[#EDEDED]">{log.action}</span>
                    <div className="flex justify-between items-center text-xs text-[#666]">
                      <span className="truncate pr-4">{log.by}</span>
                      <span className="flex-shrink-0">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 bg-[#111] border border-[#333] rounded-lg text-sm font-medium text-white hover:bg-[#222] transition-colors">
                Export Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
