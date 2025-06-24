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
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}


