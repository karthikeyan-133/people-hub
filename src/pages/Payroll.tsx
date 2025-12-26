import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, TrendingUp, Users, Calendar, Search, Download } from "lucide-react";

const payrollStats = [
  { label: "Total Payroll", value: "$485,230", icon: DollarSign, change: "+5.2%", changeType: "positive" },
  { label: "Average Salary", value: "$3,110", icon: TrendingUp, change: "+2.1%", changeType: "positive" },
  { label: "Employees Paid", value: "156", icon: Users, change: "0", changeType: "neutral" },
  { label: "Next Payroll", value: "Dec 31", icon: Calendar, change: "5 days", changeType: "neutral" },
];

const salaryRecords = [
  {
    id: 1,
    employee: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      initials: "SJ",
      position: "Marketing Manager",
    },
    baseSalary: 5500,
    bonus: 500,
    deductions: 450,
    netSalary: 5550,
    status: "paid",
  },
  {
    id: 2,
    employee: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      initials: "MC",
      position: "Senior Developer",
    },
    baseSalary: 7200,
    bonus: 800,
    deductions: 620,
    netSalary: 7380,
    status: "paid",
  },
  {
    id: 3,
    employee: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      initials: "ED",
      position: "UI/UX Designer",
    },
    baseSalary: 5000,
    bonus: 300,
    deductions: 380,
    netSalary: 4920,
    status: "pending",
  },
  {
    id: 4,
    employee: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      initials: "JW",
      position: "Product Manager",
    },
    baseSalary: 6500,
    bonus: 600,
    deductions: 540,
    netSalary: 6560,
    status: "paid",
  },
  {
    id: 5,
    employee: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      initials: "LA",
      position: "HR Specialist",
    },
    baseSalary: 4500,
    bonus: 200,
    deductions: 340,
    netSalary: 4360,
    status: "pending",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Payroll = () => {
  return (
    <MainLayout title="Payroll" subtitle="Manage employee compensation">
      {/* Stats */}
      <div className="mb-6 grid gap-6 md:grid-cols-4">
        {payrollStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-accent p-3">
                <stat.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p
                  className={`text-sm ${
                    stat.changeType === "positive"
                      ? "text-primary"
                      : stat.changeType === "negative"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Salary Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>December 2024 Payroll</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search employees..." className="w-64 pl-9" />
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>Process Payroll</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Bonus</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Salary</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={record.employee.avatar} />
                        <AvatarFallback>{record.employee.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{record.employee.name}</p>
                        <p className="text-sm text-muted-foreground">{record.employee.position}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(record.baseSalary)}
                  </TableCell>
                  <TableCell className="text-right text-primary">
                    +{formatCurrency(record.bonus)}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -{formatCurrency(record.deductions)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatCurrency(record.netSalary)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={record.status === "paid" ? "default" : "secondary"}>
                      {record.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Payroll;
