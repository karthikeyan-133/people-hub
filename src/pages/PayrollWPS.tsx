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
import { Search, Upload, Download, Banknote, CheckCircle, Clock, AlertCircle } from "lucide-react";

const wpsData = [
  { id: 1, employee: "Ahmed Hassan", bankName: "Emirates NBD", accountNo: "****1234", salary: 15000, allowances: 3000, deductions: 500, netPay: 17500, status: "Processed" },
  { id: 2, employee: "Sara Ali", bankName: "ADCB", accountNo: "****5678", salary: 12000, allowances: 2500, deductions: 400, netPay: 14100, status: "Processed" },
  { id: 3, employee: "Mohammed Khan", bankName: "FAB", accountNo: "****9012", salary: 20000, allowances: 4000, deductions: 600, netPay: 23400, status: "Pending" },
  { id: 4, employee: "Fatima Yusuf", bankName: "Mashreq", accountNo: "****3456", salary: 10000, allowances: 2000, deductions: 300, netPay: 11700, status: "Processed" },
  { id: 5, employee: "Omar Abdullah", bankName: "RAK Bank", accountNo: "****7890", salary: 18000, allowances: 3500, deductions: 550, netPay: 20950, status: "Failed" },
];

const stats = [
  { label: "Total Payroll", value: "AED 1.2M", icon: Banknote, color: "text-primary" },
  { label: "Processed", value: "142", icon: CheckCircle, color: "text-emerald-600" },
  { label: "Pending", value: "8", icon: Clock, color: "text-amber-600" },
  { label: "Failed", value: "2", icon: AlertCircle, color: "text-destructive" },
];

export default function PayrollWPS() {
  return (
    <MainLayout title="Payroll & WPS" subtitle="Wage Protection System management and payroll processing">
      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export WPS File
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Process Payroll
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
              <CardTitle>WPS Salary Transfer - December 2024</CardTitle>
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
                  <TableHead>Bank</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Salary (AED)</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wpsData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>{record.bankName}</TableCell>
                    <TableCell>{record.accountNo}</TableCell>
                    <TableCell>{record.salary.toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-600">+{record.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive">-{record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">{record.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "Processed"
                            ? "default"
                            : record.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
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
