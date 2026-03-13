'use client';

export default function AdminDashboard() {

  const metrics = {
    customers: 482,
    ordersToday: 36,
    activeProduction: 14,
    revenueToday: 28450
  };

  const recentOrders = [
    { id: "ORD-1021", customer: "Ravi Textiles", amount: 4200, status: "Processing" },
    { id: "ORD-1020", customer: "Metro Traders", amount: 1800, status: "Shipped" },
    { id: "ORD-1019", customer: "Apex Retail", amount: 950, status: "Pending" },
    { id: "ORD-1018", customer: "Urban Store", amount: 2100, status: "Processing" }
  ];

  const productionQueue = [
    { job: "Batch-4401", product: "Cotton Shirts", qty: 120, status: "Running" },
    { job: "Batch-4400", product: "Denim Jackets", qty: 60, status: "Queued" },
    { job: "Batch-4398", product: "Hoodies", qty: 90, status: "Quality Check" }
  ];

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Operational overview of orders, customers, and production
        </p>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white border rounded-lg p-5">
          <p className="text-gray-500 text-sm">Total Customers</p>
          <p className="text-2xl font-semibold mt-1">{metrics.customers}</p>
        </div>

        <div className="bg-white border rounded-lg p-5">
          <p className="text-gray-500 text-sm">Orders Today</p>
          <p className="text-2xl font-semibold mt-1">{metrics.ordersToday}</p>
        </div>

        <div className="bg-white border rounded-lg p-5">
          <p className="text-gray-500 text-sm">Active Production</p>
          <p className="text-2xl font-semibold mt-1">{metrics.activeProduction}</p>
        </div>

        <div className="bg-white border rounded-lg p-5">
          <p className="text-gray-500 text-sm">Revenue Today</p>
          <p className="text-2xl font-semibold mt-1">
            ₹{metrics.revenueToday.toLocaleString()}
          </p>
        </div>

      </section>

      {/* Main Grid */}
      <section className="grid lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b font-semibold">
            Recent Orders
          </div>

          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">₹{order.amount}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Production Queue */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b font-semibold">
            Production Queue
          </div>

          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="p-3">Job</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {productionQueue.map((job) => (
                <tr key={job.job} className="border-t">
                  <td className="p-3 font-medium">{job.job}</td>
                  <td className="p-3">{job.product}</td>
                  <td className="p-3">{job.qty}</td>
                  <td className="p-3">{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* Activity / Alerts */}
      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">System Notes</h2>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>• 12 orders awaiting approval</li>
          <li>• Production line 2 nearing capacity</li>
          <li>• Inventory sync completed successfully</li>
        </ul>
      </section>

    </div>
  );
}