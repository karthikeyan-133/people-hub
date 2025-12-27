import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import { Download, FileText, Users, TrendingUp, Calendar } from "lucide-react";

const departmentData = [
  { name: "Engineering", employees: 42 },
  { name: "Marketing", employees: 28 },
  { name: "Sales", employees: 35 },
  { name: "HR", employees: 12 },
  { name: "Finance", employees: 18 },
  { name: "Design", employees: 15 },
];

const attendanceTrend = [
  { month: "Jul", rate: 94 }, { month: "Aug", rate: 92 }, { month: "Sep", rate: 95 },
  { month: "Oct", rate: 93 }, { month: "Nov", rate: 91 }, { month: "Dec", rate: 94 },
];

const leaveDistribution = [
  { name: "Annual", value: 45, color: "hsl(var(--primary))" },
  { name: "Sick", value: 25, color: "hsl(var(--chart-3))" },
  { name: "Personal", value: 20, color: "hsl(var(--chart-4))" },
  { name: "Unpaid", value: 10, color: "hsl(var(--chart-5))" },
];

const reportCards = [
  { title: "Employee Report", description: "Complete employee directory with details", icon: Users },
  { title: "Attendance Report", description: "Monthly attendance summary", icon: Calendar },
  { title: "Leave Report", description: "Leave utilization analysis", icon: FileText },
  { title: "Payroll Report", description: "Salary and compensation data", icon: TrendingUp },
];

const Reports = () => {
  const { toast } = useToast();

  const handleDownload = (reportName: string) => {
    toast({ title: "Download Started", description: `${reportName} is being generated and will download shortly.` });
  };

  return (
    <MainLayout title="Reports" subtitle="Analytics and insights">
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reportCards.map((report) => (
          <Card key={report.title} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-accent p-3"><report.icon className="h-6 w-6 text-accent-foreground" /></div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(report.title)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Employees by Department</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Leave Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={leaveDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {leaveDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {leaveDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Attendance Rate Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[85, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Reports;
