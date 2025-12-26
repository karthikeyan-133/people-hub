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
import { Search, Plus, AlertOctagon, FileWarning, CheckCircle, Clock } from "lucide-react";

const disciplinaryData = [
  { id: 1, employee: "John Smith", type: "Written Warning", reason: "Repeated Tardiness", date: "2024-06-15", issuedBy: "HR Manager", status: "Active" },
  { id: 2, employee: "Emily Brown", type: "Verbal Warning", reason: "Dress Code Violation", date: "2024-05-20", issuedBy: "Department Head", status: "Resolved" },
  { id: 3, employee: "Michael Lee", type: "Final Warning", reason: "Unauthorized Absence", date: "2024-06-01", issuedBy: "HR Director", status: "Active" },
  { id: 4, employee: "Sarah Johnson", type: "Written Warning", reason: "Policy Violation", date: "2024-04-10", issuedBy: "HR Manager", status: "Resolved" },
  { id: 5, employee: "David Wilson", type: "Suspension", reason: "Misconduct", date: "2024-06-25", issuedBy: "HR Director", status: "Under Review" },
];

const stats = [
  { label: "Total Cases", value: "23", icon: AlertOctagon, color: "text-primary" },
  { label: "Active", value: "8", icon: FileWarning, color: "text-amber-600" },
  { label: "Under Review", value: "3", icon: Clock, color: "text-blue-600" },
  { label: "Resolved", value: "12", icon: CheckCircle, color: "text-emerald-600" },
];

export default function Disciplinary() {
  return (
    <MainLayout title="Disciplinary Management" subtitle="Track and manage employee disciplinary actions">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
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
              <CardTitle>Disciplinary Records</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search cases..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Issued By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disciplinaryData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.type}</Badge>
                    </TableCell>
                    <TableCell>{record.reason}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.issuedBy}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "Resolved"
                            ? "default"
                            : record.status === "Under Review"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {record.status}
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
