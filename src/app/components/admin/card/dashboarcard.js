'use client';

export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col justify-center items-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
