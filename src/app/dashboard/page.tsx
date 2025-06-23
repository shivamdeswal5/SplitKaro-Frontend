import GroupTable from "@/components/groups/group-table"

export default async function DashboardPage() {
  return (
    <div>
      <h2>Your Groups</h2>
      <GroupTable />
    </div>
  );
}
