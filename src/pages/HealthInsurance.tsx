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
import { Search, Plus, Heart, Users, Shield, AlertTriangle } from "lucide-react";

const insuranceData = [
  { id: 1, employee: "Ahmed Hassan", policyNo: "HI-2024-001", provider: "Daman", plan: "Enhanced", dependents: 3, premium: 12000, expiryDate: "2025-03-31", status: "Active" },
  { id: 2, employee: "Sara Ali", policyNo: "HI-2024-002", provider: "Oman Insurance", plan: "Basic", dependents: 0, premium: 4500, expiryDate: "2025-06-30", status: "Active" },
  { id: 3, employee: "Mohammed Khan", policyNo: "HI-2024-003", provider: "Daman", plan: "Enhanced Plus", dependents: 4, premium: 18000, expiryDate: "2024-12-31", status: "Expiring" },
  { id: 4, employee: "Fatima Yusuf", policyNo: "HI-2024-004", provider: "AXA", plan: "Basic", dependents: 1, premium: 6000, expiryDate: "2025-09-30", status: "Active" },
  { id: 5, employee: "Omar Abdullah", policyNo: "HI-2024-005", provider: "MetLife", plan: "Enhanced", dependents: 2, premium: 10000, expiryDate: "2024-11-30", status: "Expired" },
];

const stats = [
  { label: "Total Insured", value: "156", icon: Heart, color: "text-primary" },
  { label: "With Dependents", value: "98", icon: Users, color: "text-emerald-600" },
  { label: "Active Policies", value: "148", icon: Shield, color: "text-blue-600" },
  { label: "Expiring Soon", value: "12", icon: AlertTriangle, color: "text-amber-600" },
];

export default function HealthInsurance() {
  return (
    <MainLayout title="Health Insurance" subtitle="Manage employee health insurance policies and dependents">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Policy
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
              <CardTitle>Insurance Policies</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search policies..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Policy No</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Dependents</TableHead>
                  <TableHead>Premium (AED)</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insuranceData.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.employee}</TableCell>
                    <TableCell>{policy.policyNo}</TableCell>
                    <TableCell>{policy.provider}</TableCell>
                    <TableCell>{policy.plan}</TableCell>
                    <TableCell>{policy.dependents}</TableCell>
                    <TableCell>{policy.premium.toLocaleString()}</TableCell>
                    <TableCell>{policy.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          policy.status === "Active"
                            ? "default"
                            : policy.status === "Expiring"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {policy.status}
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
