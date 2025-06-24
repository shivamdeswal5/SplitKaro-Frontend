export interface Expense {
  id: string;
  name: string;
  description?: string;
  amount: number;
  reciptUrl?: string;
  category?: { id: string; name: string };
  members: { user: { id: string } }[];
  createdBy?: { id: string; firstName: string; lastName: string };
  groupId: string;
}

export interface CreateExpensePayload {
  name: string;
  description?: string;
  amount: number;
  reciptUrl?: string;
  groupId: string;
  createdById: string;
  categoryId: string;
  participantIds: string[];
}