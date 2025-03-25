
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Building2, Users, DollarSign } from "lucide-react";
import { 
  AppLayout, 
  PageHeader, 
  CardContainer, 
  Grid, 
  SectionHeader 
} from "@/components/layout/AppLayout";
import {
  getIncomeStats, 
  getOccupancyRate, 
  getPropertyTypeDistribution,
  getRentCollectionStatus,
  getRecentActivities,
  getDashboardSummary
} from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Stat card for summary metrics
function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}) {
  return (
    <CardContainer className="transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" ? (
                <div className="text-emerald-500 flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>{trendValue}</span>
                </div>
              ) : trend === "down" ? (
                <div className="text-rose-500 flex items-center text-sm">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>{trendValue}</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContainer>
  );
}

// Chart components
function IncomeChart() {
  const data = getIncomeStats();
  
  return (
    <CardContainer className="h-[400px]">
      <SectionHeader title="Income & Expenses" />
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

function OccupancyChart() {
  const data = getOccupancyRate();
  const COLORS = ["#3b82f6", "#94a3b8"];
  
  return (
    <CardContainer className="h-[280px]">
      <SectionHeader title="Occupancy Rate" />
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

function PropertyTypeChart() {
  const data = getPropertyTypeDistribution();
  const COLORS = ["#3b82f6", "#10b981", "#f97316"];
  
  return (
    <CardContainer className="h-[280px]">
      <SectionHeader title="Property Types" />
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

function RentCollectionChart() {
  const data = getRentCollectionStatus();
  const COLORS = ["#10b981", "#f97316", "#ef4444"];
  
  return (
    <CardContainer className="h-[350px]">
      <SectionHeader title="Rent Collection Status" />
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="value" barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

function RecentActivities() {
  const activities = getRecentActivities();
  
  return (
    <CardContainer>
      <SectionHeader title="Recent Activities" />
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
          >
            <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
            <div>
              <p className="font-medium">{activity.description}</p>
              <div className="flex text-sm text-muted-foreground gap-2 mt-1">
                <span>{activity.property}</span>
                <span>•</span>
                <span>{new Date(activity.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContainer>
  );
}

export default function DashboardPage() {
  const summary = getDashboardSummary();
  
  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of your rental properties performance"
      />
      
      <Grid cols={4}>
        <StatCard
          title="Properties"
          value={summary.totalProperties}
          icon={Building2}
          trend="up"
          trendValue="2 new this month"
        />
        <StatCard
          title="Tenants"
          value={summary.totalTenants}
          icon={Users}
          trend="up"
          trendValue="3 new this month"
        />
        <StatCard
          title="Monthly Income"
          value={`$${summary.rentIncome.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="12% increase"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${summary.occupancyRate}%`}
          icon={Users}
          trend="up"
          trendValue="5% increase"
        />
      </Grid>
      
      <div className="mt-8">
        <IncomeChart />
      </div>
      
      <Grid cols={3} className="mt-8">
        <OccupancyChart />
        <PropertyTypeChart />
        <RecentActivities />
      </Grid>
      
      <div className="mt-8">
        <RentCollectionChart />
      </div>
    </AppLayout>
  );
}
