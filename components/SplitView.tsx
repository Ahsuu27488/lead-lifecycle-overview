"use client";
import { Lead } from '@/lib/types';
import LeadForm from './LeadForm';

interface SplitViewProps {
  originalLead: Lead;
  onSubmit: (data: Partial<Lead>) => void;
}

export default function SplitView({ originalLead, onSubmit }: SplitViewProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      <div className="flex-1">
        <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-700">Original Lead (Read Only)</h2>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <LeadForm 
            initialData={originalLead} 
            readOnly={true} 
            title=""
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="bg-blue-50 p-4 rounded-t-lg border-b border-blue-200">
          <h2 className="text-lg font-bold text-blue-800">New Lead Entry</h2>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <LeadForm 
            initialData={{}} 
            onSubmit={onSubmit}
            title=""
          />
        </div>
      </div>
    </div>
  );
}
