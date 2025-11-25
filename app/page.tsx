"use client";
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/types';

export default function Home() {
  const { currentUser, login } = useApp();
  const router = useRouter();

  const handleRoleSelect = (role: Role) => {
    login(role);
    router.push(`/${role}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Lead Lifecycle Overview
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select a role to begin managing leads through the complete lifecycle
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRoleSelect('Admin')}
            className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="text-2xl mb-2">👨‍💼</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600">Admin</h3>
            <p className="text-sm text-gray-600">Create, edit, and assign leads to agents</p>
          </button>

          <button
            onClick={() => handleRoleSelect('Agent')}
            className="p-6 border-2 border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="text-2xl mb-2">👤</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-green-600">Agent</h3>
            <p className="text-sm text-gray-600">Process assigned leads with split view</p>
          </button>

          <button
            onClick={() => handleRoleSelect('SuperAgent')}
            className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600">Super Agent</h3>
            <p className="text-sm text-gray-600">Review and request credit reports</p>
          </button>

          <button
            onClick={() => handleRoleSelect('Closer')}
            className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="text-2xl mb-2">💼</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-orange-600">Closer</h3>
            <p className="text-sm text-gray-600">Finalize deals with program and fees</p>
          </button>

          <button
            onClick={() => handleRoleSelect('FA')}
            className="p-6 border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group col-span-1 md:col-span-2"
          >
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-red-600">Final Approver (FA)</h3>
            <p className="text-sm text-gray-600">Make final approval or rejection decisions</p>
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> You can also switch roles using the dropdown in the navigation bar at any time.
          </p>
        </div>
      </div>
    </main>
  );
}
