// prisma/seed-customers.js
const { prisma } = require('../src/lib/prisma');

async function seedCustomers() {
  console.log('Seeding customers...');

  const customersData = [
    {
      name: "Ravi Kumar",
      mobile: "9876543210",
      email: "ravi.kumar@example.com",
    },
    {
      name: "Apex Retail",
      mobile: "9123456789",
      email: "apex.retail@gmail.com",
    },
    {
      name: "Metro Traders",
      mobile: "9988776655",
      email: null,
    },
    {
      name: "Urban Store",
      mobile: "9012345678",
      email: "urban.store@shop.com",
    },
    {
      name: "Srinivas Textiles",
      mobile: "9393939393",
      email: "srinivas.textiles@yahoo.com",
    },
    {
      name: "Laxmi Fashions",
      mobile: "9848012345",
      email: "laxmi.fashions@gmail.com",
    },
    {
      name: "Vijay Garments",
      mobile: "9701234567",
      email: null,
    },
    {
      name: "Sri Durga Collections",
      mobile: "9959223344",
      email: "durga.collections@gmail.com",
    },
    {
      name: "Rahul Boutique",
      mobile: "8886665544",
      email: "rahul.boutique@outlook.com",
    },
    {
      name: "Fashion Hub",
      mobile: "7778889990",
      email: "fashion.hub@gmail.com",
    },
  ];

  const createdCustomers = await prisma.customer.createMany({
    data: customersData,
    skipDuplicates: true, // avoid errors if already seeded
  });

  console.log(`Created ${createdCustomers.count} customers`);

  // Optional: Seed some addresses (using existing areas)
  // First, get some area IDs (you can hardcode or query them)
  const areas = await prisma.area.findMany({
    take: 5,
    select: { id: true, name: true },
  });

  if (areas.length === 0) {
    console.log('Warning: No areas found. Skipping addresses.');
    return;
  }

  const customerAddresses = [];

  // Example: Add 1–2 addresses per customer
  const customers = await prisma.customer.findMany({ select: { id: true } });

  for (const customer of customers) {
    // Randomly pick 1 or 2 areas
    const numAddresses = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numAddresses; i++) {
      const randomArea = areas[Math.floor(Math.random() * areas.length)];

      customerAddresses.push({
        customerId: customer.id,
        areaId: randomArea.id,
        addressLine: `House No ${Math.floor(Math.random() * 100) + 1}, ${randomArea.name}`,
        landmark: Math.random() > 0.5 ? "Near Park" : null,
        pincode: "5000" + Math.floor(Math.random() * 100),
        isDefault: i === 0, // first one is default
      });
    }
  }

  if (customerAddresses.length > 0) {
    await prisma.customerAddress.createMany({
      data: customerAddresses,
      skipDuplicates: true,
    });
    console.log(`Created ${customerAddresses.length} addresses`);
  }

  console.log('Customers & addresses seeding completed!');
}

seedCustomers()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });