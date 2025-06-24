export interface SplitAmount {
  userId: string;
  amount: number;
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
  splitAmounts?: SplitAmount[];
}