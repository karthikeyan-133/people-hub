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
import { Search, Plus, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const visaData = [
  { id: 1, employee: "Ahmed Hassan", type: "Work Visa", number: "V-2024-001", issueDate: "2024-01-15", expiryDate: "2026-01-14", status: "Active" },
  { id: 2, employee: "Sara Ali", type: "Residence Visa", number: "V-2024-002", issueDate: "2023-06-20", expiryDate: "2024-06-19", status: "Expiring Soon" },
  { id: 3, employee: "Mohammed Khan", type: "Work Visa", number: "V-2024-003", issueDate: "2024-03-10", expiryDate: "2026-03-09", status: "Active" },
  { id: 4, employee: "Fatima Yusuf", type: "Work Visa", number: "V-2024-004", issueDate: "2022-11-01", expiryDate: "2024-10-31", status: "Expired" },
  { id: 5, employee: "Omar Abdullah", type: "Residence Visa", number: "V-2024-005", issueDate: "2024-02-28", expiryDate: "2026-02-27", status: "Active" },
];

const stats = [
  { label: "Total Documents", value: "156", icon: FileText, color: "text-primary" },
  { label: "Active Visas", value: "142", icon: CheckCircle, color: "text-emerald-600" },
  { label: "Expiring Soon", value: "8", icon: Clock, color: "text-amber-600" },
  { label: "Expired", value: "6", icon: AlertTriangle, color: "text-destructive" },
];

export default function VisaDocuments() {
  return (
    <MainLayout title="Visa & Document Management" subtitle="Track and manage employee visas and documents">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Document
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
              <CardTitle>Visa Records</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search visas..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Visa Type</TableHead>
                  <TableHead>Visa Number</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visaData.map((visa) => (
                  <TableRow key={visa.id}>
                    <TableCell className="font-medium">{visa.employee}</TableCell>
                    <TableCell>{visa.type}</TableCell>
                    <TableCell>{visa.number}</TableCell>
                    <TableCell>{visa.issueDate}</TableCell>
                    <TableCell>{visa.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          visa.status === "Active"
                            ? "default"
                            : visa.status === "Expiring Soon"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {visa.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
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
