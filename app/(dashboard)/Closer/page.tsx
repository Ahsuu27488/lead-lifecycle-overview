"use client";
import { useState } from 'react';
import { useApp } from '@/lib/store';
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/lib/types';

export default function CloserDashboard() {
  const { leads, updateLead } = useApp();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Closer sees leads that are in 'CreditReport' status (passed from Super Agent)
  const availableLeads = leads.filter(l => l.status === 'CreditReport');

  const handleUpdate = (data: Partial<Lead>) => {
    if (selectedLead) {
      // Just save changes without transferring yet
      updateLead(selectedLead.id, data);
    }
  };

  const handleTransferToFA = (data: Partial<Lead>) => {
    if (selectedLead) {
      updateLead(selectedLead.id, {
        ...data,
        status: 'FinalReview', // Transfer to FA
      });
      setSelectedLead(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Closer Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Leads for Finalization</h2>
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {availableLeads.length === 0 ? (
              <p className="text-gray-500 italic">No leads waiting for closure.</p>
            ) : (
              availableLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={() => setSelectedLead(lead)} 
                />
              ))
            )}
          </div>
        </div>

        {/* Deal Finalization Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm min-h-[500px]">
          {selectedLead ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Finalize Deal: {selectedLead.name}</h2>
                <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-gray-700">Close</button>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="text-sm text-green-700">
                  Please add <strong>Program Type</strong> and <strong>Charges/Fees</strong> before transferring to FA.
                </p>
              </div>

              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleTransferToFA}
                title="Deal Details"
              />
              
              {/* Custom action button usually inside form, but here we can just use the form submit as the 'Transfer' action */}
              <div className="mt-4 text-right text-sm text-gray-500">
                Clicking "Submit" will transfer this lead to Final Approval.
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-lg">Select a lead to finalize the deal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
