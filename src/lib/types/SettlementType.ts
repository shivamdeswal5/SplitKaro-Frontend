export interface Settlement {
  id: string;
  amount: number;
  note?: string;
  createdAt: string;

  paidBy: {
    id: string;
    firstName: string;
    lastName: string;
  };

  paidTo: {
    id: string;
    firstName: string;
    lastName: string;
  };

  group: {
    id: string;
    name: string;
  };
}