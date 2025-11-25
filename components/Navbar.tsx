"use client";
import { useApp } from '@/lib/store';
import { Role } from '@/lib/types';

export default function Navbar() {
  const { currentUser, login, logout } = useApp();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Lead Lifecycle</div>
      <div className="flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-4 animate-fade-in">
            <span className="text-sm text-gray-300">Logged in as: <span className="font-semibold text-white">{currentUser.name} ({currentUser.role})</span></span>
            <button onClick={logout} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors shadow-md">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Simulate Role:</span>
            <select
              onChange={(e) => login(e.target.value as Role)}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>
              <option value="SuperAgent">Super Agent</option>
              <option value="Closer">Closer</option>
              <option value="FA">FA</option>
            </select>
          </div>
        )}
      </div>
    </nav>
  );
}
