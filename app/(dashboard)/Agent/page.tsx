"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import LeadCard from '@/components/LeadCard';
import SplitView from '@/components/SplitView';
import { Lead } from '@/lib/types';

export default function AgentDashboard() {
  const { leads, currentUser, updateLead } = useApp();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filter leads assigned to current agent
  const myLeads = leads.filter(l => l.assignedTo === currentUser?.id);
  const pendingLeads = myLeads.filter(l => l.status === 'Assigned');
  const processedLeads = myLeads.filter(l => l.status !== 'Assigned');

  const handleLeadSubmit = (data: Partial<Lead>) => {
    if (selectedLead) {
      updateLead(selectedLead.id, {
        ...data,
        status: 'Pending', // Move to Pending after submission
      });
      setSelectedLead(null);
    }
  };

  if (!currentUser || currentUser.role !== 'Agent') {
    return <div className="p-6 text-red-500">Access Denied. Please switch to Agent role.</div>;
  }

  if (selectedLead) {
    return (
      <div className="container mx-auto p-6 h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Processing Lead: {selectedLead.name}</h1>
          <button 
            onClick={() => setSelectedLead(null)}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Back to Dashboard
          </button>
        </div>
        <SplitView 
          originalLead={selectedLead} 
          onSubmit={handleLeadSubmit} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Agent Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assigned Leads (To Do) */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 p-1 rounded">📋</span> New Assignments
          </h2>
          <div className="space-y-3">
            {pendingLeads.length === 0 ? (
              <p className="text-gray-500 italic">No new leads assigned.</p>
            ) : (
              pendingLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={() => setSelectedLead(lead)} 
                />
              ))
            )}
          </div>
        </div>

        {/* Processed Leads (History) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-gray-100 p-1 rounded">chk</span> Processed History
          </h2>
          <div className="space-y-3 opacity-75">
            {processedLeads.length === 0 ? (
              <p className="text-gray-500 italic">No processed leads yet.</p>
            ) : (
              processedLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  // No onClick for processed leads as per requirement (summary view only)
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
