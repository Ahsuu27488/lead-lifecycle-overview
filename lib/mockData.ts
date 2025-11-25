import { Lead, User } from './types';

export const MOCK_USERS: User[] = [
    { id: 'admin1', name: 'Admin User', role: 'Admin' },
    { id: 'agent1', name: 'Agent Smith', role: 'Agent' },
    { id: 'super1', name: 'Super Agent One', role: 'SuperAgent' },
    { id: 'closer1', name: 'Closer Kelly', role: 'Closer' },
    { id: 'fa1', name: 'Final Approver', role: 'FA' },
];

export const MOCK_LEADS: Lead[] = [
    {
        id: 'lead1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
    },
    {
        id: 'lead2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
    },
];
