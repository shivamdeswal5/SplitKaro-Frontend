import ExpenseDetails from '@/components/expenses/expense-details'

interface Props {
  params: { expenseId: string };
}

export default function ExpenseDetailPage({ params }: Props) {
  return <ExpenseDetails expenseId={params.expenseId} />;
}
