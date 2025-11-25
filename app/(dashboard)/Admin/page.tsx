"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mockData';

export default function AdminDashboard() {
  const { leads, addLead, updateLead, assignLead } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleCreateLead = (data: Partial<Lead>) => {
    addLead(data as any);
    setIsCreating(false);
  };

  const handleUpdateLead = (data: Partial<Lead>) => {
    if (selectedLead) {
      updateLead(selectedLead.id, data);
      setSelectedLead(null);
    }
  };

  const handleAssign = (agentId: string) => {
    if (selectedLead) {
      assignLead(selectedLead.id, agentId);
      setIsAssigning(false);
      setSelectedLead(null);
    }
  };

  const agents = MOCK_USERS.filter(u => u.role === 'Agent');

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          + Add New Lead
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lead List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Leads</h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {leads.map(lead => (
              <LeadCard 
                key={lead.id} 
                lead={lead} 
                onClick={() => setSelectedLead(lead)} 
              />
            ))}
          </div>
        </div>

        {/* Action Area (Create/Edit/Assign) */}
        <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200 min-h-[500px]">
          {isCreating ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Lead</h2>
                <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
              <LeadForm onSubmit={handleCreateLead} />
            </div>
          ) : selectedLead ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Lead: {selectedLead.name}</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsAssigning(!isAssigning)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
                  >
                    {isAssigning ? 'Cancel Assign' : 'Assign to Agent'}
                  </button>
                  <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-gray-700">Close</button>
                </div>
              </div>

              {isAssigning && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow border border-indigo-100 animate-fade-in">
                  <h3 className="font-semibold text-lg mb-3">Select Agent</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agents.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => handleAssign(agent.id)}
                        className="text-left p-3 rounded border hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                      >
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-gray-500">ID: {agent.id}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleUpdateLead} 
                title="Edit Lead Details"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-lg">Select a lead to view details or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
