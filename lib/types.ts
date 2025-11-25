export type Role = 'Admin' | 'Agent' | 'SuperAgent' | 'Closer' | 'FA';

export type LeadStatus = 'New' | 'Assigned' | 'Pending' | 'Review' | 'CreditReport' | 'FinalReview' | 'Accepted' | 'Rejected';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: LeadStatus;
    assignedTo?: string; // Agent ID
    programType?: string;
    fees?: number;
    notes?: string;
    // Agent specific fields (copied from old lead)
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    // Super Agent specific
    creditReportRequested?: boolean;
    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    role: Role;
}
