export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  type: string;
  units: number;
  value: number;
  image: string;
  description?: string;
  addedDate?: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  propertyId: string;
  unit: string;
  status: 'active' | 'late' | 'pending';
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  propertyId: string;
  tenantId?: string;
}

// Sample Properties
export const properties: Property[] = [
  {
    id: "p1",
    name: "Marina Towers",
    address: "123 Marina Blvd",
    city: "San Francisco",
    type: "Apartment Complex",
    units: 24,
    value: 5200000,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p2",
    name: "Highland Residences",
    address: "456 Highland Ave",
    city: "Los Angeles",
    type: "Apartment Complex",
    units: 16,
    value: 3850000,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    name: "Lakeside Villa",
    address: "789 Lake Dr",
    city: "Chicago",
    type: "Single Family",
    units: 1,
    value: 950000,
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p4",
    name: "Downtown Lofts",
    address: "321 Main St",
    city: "Austin",
    type: "Commercial",
    units: 8,
    value: 2100000,
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  }
];

// Sample Tenants
export const tenants: Tenant[] = [
  {
    id: "t1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
    rent: 2500,
    propertyId: "p1",
    unit: "101",
    status: "active",
  },
  {
    id: "t2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-987-6543",
    leaseStart: "2023-02-15",
    leaseEnd: "2024-02-15",
    rent: 2200,
    propertyId: "p1",
    unit: "102",
    status: "late",
  },
  {
    id: "t3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-456-7890",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-03-01",
    rent: 1950,
    propertyId: "p2",
    unit: "201",
    status: "active",
  },
  {
    id: "t4",
    name: "Jessica Lee",
    email: "jessica@example.com",
    phone: "555-789-0123",
    leaseStart: "2023-04-15",
    leaseEnd: "2024-04-15",
    rent: 3500,
    propertyId: "p3",
    unit: "301",
    status: "active",
  },
  {
    id: "t5",
    name: "David Wilson",
    email: "david@example.com",
    phone: "555-321-6540",
    leaseStart: "2023-05-01",
    leaseEnd: "2024-05-01",
    rent: 1800,
    propertyId: "p2",
    unit: "202",
    status: "pending",
  }
];

// Sample Transactions
export const transactions: Transaction[] = [
  {
    id: "tr1",
    date: "2023-06-01",
    amount: 2500,
    type: "income",
    category: "Rent",
    description: "Monthly rent payment",
    propertyId: "p1",
    tenantId: "t1",
  },
  {
    id: "tr2",
    date: "2023-06-02",
    amount: 2200,
    type: "income",
    category: "Rent",
    description: "Monthly rent payment",
    propertyId: "p1",
    tenantId: "t2",
  },
  {
    id: "tr3",
    date: "2023-06-05",
    amount: 550,
    type: "expense",
    category: "Maintenance",
    description: "Plumbing repair",
    propertyId: "p1",
  },
  {
    id: "tr4",
    date: "2023-06-10",
    amount: 1950,
    type: "income",
    category: "Rent",
    description: "Monthly rent payment",
    propertyId: "p2",
    tenantId: "t3",
  },
  {
    id: "tr5",
    date: "2023-06-15",
    amount: 3500,
    type: "income",
    category: "Rent",
    description: "Monthly rent payment",
    propertyId: "p3",
    tenantId: "t4",
  },
  {
    id: "tr6",
    date: "2023-06-20",
    amount: 1800,
    type: "income",
    category: "Rent",
    description: "Monthly rent payment",
    propertyId: "p2",
    tenantId: "t5",
  },
  {
    id: "tr7",
    date: "2023-06-25",
    amount: 1200,
    type: "expense",
    category: "Utilities",
    description: "Electricity and water",
    propertyId: "p1",
  },
  {
    id: "tr8",
    date: "2023-06-28",
    amount: 300,
    type: "expense",
    category: "Insurance",
    description: "Property insurance",
    propertyId: "p3",
  }
];

// Dashboard Stats
export const getIncomeStats = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map(month => ({
    name: month,
    income: Math.floor(Math.random() * 20000) + 10000,
    expenses: Math.floor(Math.random() * 8000) + 2000,
  }));
};

export const getOccupancyRate = () => {
  return [
    { name: "Occupied", value: 85 },
    { name: "Vacant", value: 15 }
  ];
};

export const getPropertyTypeDistribution = () => {
  return [
    { name: "Apartments", value: 65 },
    { name: "Houses", value: 20 },
    { name: "Commercial", value: 15 }
  ];
};

export const getRentCollectionStatus = () => {
  return [
    { name: "Paid", value: 75 },
    { name: "Pending", value: 15 },
    { name: "Late", value: 10 }
  ];
};

export const getRecentActivities = () => {
  return [
    { id: 1, description: "New lease signed", property: "Marina Towers", date: "2023-06-28" },
    { id: 2, description: "Maintenance request", property: "Highland Residences", date: "2023-06-27" },
    { id: 3, description: "Rent payment received", property: "Lakeside Villa", date: "2023-06-25" },
    { id: 4, description: "Lease renewal notice", property: "Downtown Lofts", date: "2023-06-23" }
  ];
};

// Calculate dashboard summary metrics
export const getDashboardSummary = () => {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
  const totalTenants = tenants.length;
  
  const rentIncome = transactions
    .filter(t => t.type === "income" && t.category === "Rent")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netIncome = rentIncome - expenses;
  
  const occupancyRate = (totalTenants / totalUnits) * 100;
  
  return {
    totalProperties,
    totalUnits,
    totalTenants,
    rentIncome,
    expenses,
    netIncome,
    occupancyRate: occupancyRate.toFixed(1)
  };
};
