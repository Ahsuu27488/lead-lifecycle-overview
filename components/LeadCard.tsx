import { Lead } from '@/lib/types';
import StatusBadge from './StatusBadge';

interface LeadCardProps {
  lead: Lead;
  onClick?: () => void;
}

export default function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{lead.name}</h3>
        <StatusBadge status={lead.status} />
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>{lead.email}</p>
        <p>{lead.phone}</p>
        {lead.assignedTo && <p className="text-xs text-gray-400 mt-2">Assigned to: {lead.assignedTo}</p>}
      </div>
    </div>
  );
}
