"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/lib/types';

export default function FADashboard() {
  const { leads, updateLead } = useApp();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // FA sees leads in 'FinalReview' status
  const pendingApprovals = leads.filter(l => l.status === 'FinalReview');

  const handleDecision = (decision: 'Accepted' | 'Rejected') => {
    if (selectedLead) {
      updateLead(selectedLead.id, {
        status: decision,
      });
      setSelectedLead(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Final Approval Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Approvals</h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {pendingApprovals.length === 0 ? (
              <p className="text-gray-500 italic">No leads pending approval.</p>
            ) : (
              pendingApprovals.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={() => setSelectedLead(lead)} 
                />
              ))
            )}
          </div>
        </div>

        {/* Decision Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm min-h-[500px]">
          {selectedLead ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Review for Approval: {selectedLead.name}</h2>
                <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-gray-700">Close</button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h3 className="font-semibold mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Program Type:</span> {selectedLead.programType || 'N/A'}</div>
                  <div><span className="text-gray-500">Fees:</span> {selectedLead.fees ? `$${selectedLead.fees}` : 'N/A'}</div>
                  <div><span className="text-gray-500">Agent:</span> {selectedLead.assignedTo || 'N/A'}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedLead.email}</div>
                </div>
              </div>

              {/* Read-only form for full details */}
              <div className="mb-8 opacity-75 pointer-events-none">
                <LeadForm 
                  initialData={selectedLead} 
                  readOnly={true}
                  title="Full Lead Details"
                />
              </div>

              <div className="flex gap-4 justify-end border-t pt-6">
                <button
                  onClick={() => handleDecision('Rejected')}
                  className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold transition-colors"
                >
                  Reject Lead
                </button>
                <button
                  onClick={() => handleDecision('Accepted')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-md transition-colors"
                >
                  Approve & Accept
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-lg">Select a lead to make a final decision.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
