"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/lib/types';

export default function SuperAgentDashboard() {
  const { leads, updateLead } = useApp();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Super Agent sees all leads in 'Pending' status
  const pendingLeads = leads.filter(l => l.status === 'Pending');

  const handleUpdate = (data: Partial<Lead>) => {
    if (selectedLead) {
      updateLead(selectedLead.id, data);
      setSelectedLead(null);
    }
  };

  const handleRequestCreditReport = () => {
    if (selectedLead) {
      updateLead(selectedLead.id, {
        status: 'CreditReport', // This locks it for Super Agent and notifies Admin (simulated by status change)
        creditReportRequested: true,
        // In real app, this would trigger notification
      });
      setSelectedLead(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Super Agent Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Submissions List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Submissions</h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {pendingLeads.length === 0 ? (
              <p className="text-gray-500 italic">No pending submissions.</p>
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

        {/* Review Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm min-h-[500px]">
          {selectedLead ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Review Lead: {selectedLead.name}</h2>
                <div className="flex gap-3">
                   <button 
                    onClick={handleRequestCreditReport}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors shadow"
                  >
                    Request Credit Report
                  </button>
                  <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-gray-700">Close</button>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-700">
                  Review the lead details below. You can edit any missing information or add comments.
                  Clicking "Request Credit Report" will lock this lead and transfer it to the Closer.
                </p>
              </div>

              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleUpdate}
                title="Lead Details"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-lg">Select a pending submission to review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
