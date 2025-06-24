export interface Group {
  id: string;
  name: string;
  createdAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
   members: { user: User }[];
  expenses: Expense[];
  categories?: { id: string; name: string }[];

}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export type ExpenseMember = {
  user: User;
  amount: number;
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
  createdBy?: User;
  members: ExpenseMember[];

};
