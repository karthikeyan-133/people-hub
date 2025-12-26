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
import { Search, Plus, Car, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const licenceData = [
  { id: 1, employee: "Ahmed Hassan", licenceNo: "DL-2024-001", category: "Light Vehicle", issueDate: "2023-05-15", expiryDate: "2028-05-14", status: "Active" },
  { id: 2, employee: "Omar Abdullah", licenceNo: "DL-2024-002", category: "Heavy Vehicle", issueDate: "2022-08-20", expiryDate: "2024-08-19", status: "Expiring Soon" },
  { id: 3, employee: "Mohammed Khan", licenceNo: "DL-2024-003", category: "Light Vehicle", issueDate: "2024-01-10", expiryDate: "2029-01-09", status: "Active" },
  { id: 4, employee: "Khalid Ibrahim", licenceNo: "DL-2024-004", category: "Motorcycle", issueDate: "2021-11-01", expiryDate: "2024-10-31", status: "Expired" },
  { id: 5, employee: "Yusuf Mahmoud", licenceNo: "DL-2024-005", category: "Light Vehicle", issueDate: "2023-02-28", expiryDate: "2028-02-27", status: "Active" },
];

const stats = [
  { label: "Total Licences", value: "89", icon: Car, color: "text-primary" },
  { label: "Active", value: "78", icon: CheckCircle, color: "text-emerald-600" },
  { label: "Expiring Soon", value: "6", icon: Clock, color: "text-amber-600" },
  { label: "Expired", value: "5", icon: AlertTriangle, color: "text-destructive" },
];

export default function DrivingLicence() {
  return (
    <MainLayout title="Driving Licence Management" subtitle="Track employee driving licences and renewals">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Licence
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
              <CardTitle>Licence Records</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search licences..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Licence No</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenceData.map((licence) => (
                  <TableRow key={licence.id}>
                    <TableCell className="font-medium">{licence.employee}</TableCell>
                    <TableCell>{licence.licenceNo}</TableCell>
                    <TableCell>{licence.category}</TableCell>
                    <TableCell>{licence.issueDate}</TableCell>
                    <TableCell>{licence.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          licence.status === "Active"
                            ? "default"
                            : licence.status === "Expiring Soon"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {licence.status}
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
