import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Gift, DollarSign, Users, TrendingUp } from "lucide-react";

const benefitsData = [
  { id: 1, employee: "Ahmed Hassan", yearsOfService: 5, basicSalary: 15000, gratuityAmount: 37500, status: "Accruing" },
  { id: 2, employee: "Sara Ali", yearsOfService: 3, basicSalary: 12000, gratuityAmount: 18000, status: "Accruing" },
  { id: 3, employee: "Mohammed Khan", yearsOfService: 8, basicSalary: 20000, gratuityAmount: 100000, status: "Accruing" },
  { id: 4, employee: "Fatima Yusuf", yearsOfService: 2, basicSalary: 10000, gratuityAmount: 10000, status: "Accruing" },
  { id: 5, employee: "Omar Abdullah", yearsOfService: 6, basicSalary: 18000, gratuityAmount: 54000, status: "Paid Out" },
];

const stats = [
  { label: "Total Liability", value: "AED 2.4M", icon: DollarSign, color: "text-primary" },
  { label: "Eligible Employees", value: "145", icon: Users, color: "text-emerald-600" },
  { label: "Avg. Years of Service", value: "4.2", icon: TrendingUp, color: "text-amber-600" },
  { label: "Benefits Programs", value: "6", icon: Gift, color: "text-purple-600" },
];

export default function BenefitsGratuity() {
  return (
    <MainLayout title="Benefits & Gratuity" subtitle="Manage employee benefits and end-of-service gratuity">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Benefit
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Gratuity Calculator</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Years of Service</TableHead>
                  <TableHead>Basic Salary (AED)</TableHead>
                  <TableHead>Gratuity Amount (AED)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benefitsData.map((benefit) => (
                  <TableRow key={benefit.id}>
                    <TableCell className="font-medium">{benefit.employee}</TableCell>
                    <TableCell>{benefit.yearsOfService} years</TableCell>
                    <TableCell>{benefit.basicSalary.toLocaleString()}</TableCell>
                    <TableCell>{benefit.gratuityAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={benefit.status === "Accruing" ? "default" : "secondary"}>
                        {benefit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Calculate</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
