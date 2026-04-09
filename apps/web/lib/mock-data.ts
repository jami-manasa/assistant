export const metrics = [
  { label: "Daily Revenue", value: "Rs 1,48,500", hint: "Up 12% from yesterday" },
  { label: "Pending Collections", value: "Rs 4,72,000", hint: "18 invoices outstanding" },
  { label: "Active Trips", value: "42", hint: "11 vehicles on road" },
  { label: "Expiring Documents", value: "7", hint: "Insurance and permit alerts" },
];

export const bookings = [
  { id: "BK-1042", customer: "Sai Logistics", route: "Hyderabad -> Pune", amount: "Rs 38,000", status: "Completed" },
  { id: "BK-1043", customer: "Navya Traders", route: "Vijayawada -> Chennai", amount: "Rs 24,500", status: "In Transit" },
  { id: "BK-1044", customer: "Sri Cargo", route: "Warangal -> Bangalore", amount: "Rs 41,200", status: "Pending Payment" },
];

export const customers = [
  { name: "Sai Logistics", phone: "+91 98480 11223", balance: "Rs 1,10,000", trips: 18 },
  { name: "Navya Traders", phone: "+91 98480 22446", balance: "Rs 82,500", trips: 9 },
  { name: "Sri Cargo", phone: "+91 98480 33991", balance: "Rs 46,000", trips: 6 },
];

export const suppliers = [
  { name: "KVR Fleet Provider", type: "Truck Provider", due: "Rs 76,000" },
  { name: "Highway Fuel Point", type: "Fuel Station", due: "Rs 28,300" },
  { name: "Metro Diesel Works", type: "Mechanic", due: "Rs 12,900" },
];

export const drivers = [
  { name: "Raju", vehicle: "TS09AB2211", status: "On Trip", payout: "Rs 18,000" },
  { name: "Mahesh", vehicle: "TS10CD4421", status: "Available", payout: "Rs 16,500" },
  { name: "Salim", vehicle: "AP31AF9002", status: "Leave", payout: "Rs 15,800" },
];

export const vehicles = [
  { number: "TS09AB2211", type: "Trailer", revenue: "Rs 3,85,000", maintenance: "Due in 4 days" },
  { number: "TS10CD4421", type: "Container", revenue: "Rs 2,94,000", maintenance: "Good" },
  { number: "AP31AF9002", type: "Open Truck", revenue: "Rs 2,08,000", maintenance: "Insurance due" },
];

export const invoices = [
  { id: "INV-2026-011", party: "Sai Logistics", kind: "Customer", amount: "Rs 38,000", status: "Paid" },
  { id: "INV-2026-012", party: "KVR Fleet Provider", kind: "Supplier", amount: "Rs 22,000", status: "Due" },
  { id: "INV-2026-013", party: "Navya Traders", kind: "Customer", amount: "Rs 24,500", status: "Pending" },
];

export const reports = [
  { title: "Profit and Loss", summary: "Track revenue, trip costs, and gross margin by period." },
  { title: "Vehicle Performance", summary: "Compare trips, maintenance cost, and utilization by vehicle." },
  { title: "Outstanding Payments", summary: "See customer dues and supplier payments in one report." },
];

export const alerts = [
  "3 vehicles need insurance renewal this week.",
  "2 drivers have pending payout approvals.",
  "Fuel spend crossed threshold for Vehicle AP09TX2211.",
  "Customer Sai Logistics has outstanding dues older than 15 days.",
];
