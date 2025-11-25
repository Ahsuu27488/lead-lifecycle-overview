"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, User, Role } from './types';
import { MOCK_LEADS, MOCK_USERS } from './mockData';

interface AppState {
  currentUser: User | null;
  leads: Lead[];
  login: (role: Role) => void;
  logout: () => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  assignLead: (leadId: string, agentId: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  const login = (role: Role) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) setCurrentUser(user);
  };

  const logout = () => setCurrentUser(null);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'New',
    };
    setLeads([...leads, newLead]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(leads.map(l => l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l));
  };

  const assignLead = (leadId: string, agentId: string) => {
    updateLead(leadId, { assignedTo: agentId, status: 'Assigned' });
  };

  return (
    <AppContext.Provider value={{ currentUser, leads, login, logout, addLead, updateLead, assignLead }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
