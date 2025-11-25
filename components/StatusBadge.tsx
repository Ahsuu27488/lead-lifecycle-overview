import { LeadStatus } from '@/lib/types';

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-800',
  Assigned: 'bg-indigo-100 text-indigo-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Review: 'bg-purple-100 text-purple-800',
  CreditReport: 'bg-orange-100 text-orange-800',
  FinalReview: 'bg-teal-100 text-teal-800',
  Accepted: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}>
      {status}
    </span>
  );
}
