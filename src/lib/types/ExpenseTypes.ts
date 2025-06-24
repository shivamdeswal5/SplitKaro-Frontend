
export interface ExpenseMember {
  id: string;
  amount: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Expense {
  id: string;
  name: string;
  description?: string;
  amount: number;
  reciptUrl?: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  group: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  members: ExpenseMember[];
  createdAt: string;
  updatedAt: string;
}
