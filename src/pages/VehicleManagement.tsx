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
import { Search, Plus, Truck, Wrench, CheckCircle, AlertTriangle } from "lucide-react";

const vehicleData = [
  { id: 1, plateNo: "ABC-1234", make: "Toyota", model: "Hilux", year: "2022", assignedTo: "Ahmed Hassan", status: "Active", nextService: "2024-08-15" },
  { id: 2, plateNo: "XYZ-5678", make: "Nissan", model: "Patrol", year: "2021", assignedTo: "Pool Vehicle", status: "Active", nextService: "2024-07-20" },
  { id: 3, plateNo: "DEF-9012", make: "Ford", model: "Ranger", year: "2023", assignedTo: "Mohammed Khan", status: "In Service", nextService: "2024-06-30" },
  { id: 4, plateNo: "GHI-3456", make: "Mitsubishi", model: "Pajero", year: "2020", assignedTo: "Pool Vehicle", status: "Active", nextService: "2024-09-01" },
  { id: 5, plateNo: "JKL-7890", make: "Toyota", model: "Land Cruiser", year: "2023", assignedTo: "Management", status: "Active", nextService: "2024-10-15" },
];

const stats = [
  { label: "Total Vehicles", value: "24", icon: Truck, color: "text-primary" },
  { label: "Active", value: "20", icon: CheckCircle, color: "text-emerald-600" },
  { label: "In Service", value: "3", icon: Wrench, color: "text-amber-600" },
  { label: "Out of Service", value: "1", icon: AlertTriangle, color: "text-destructive" },
];

export default function VehicleManagement() {
  return (
    <MainLayout title="Vehicle Management" subtitle="Manage company vehicles and assignments">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
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
              <CardTitle>Vehicle Fleet</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search vehicles..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate No</TableHead>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Next Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleData.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.plateNo}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.assignedTo}</TableCell>
                    <TableCell>{vehicle.nextService}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vehicle.status === "Active"
                            ? "default"
                            : vehicle.status === "In Service"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {vehicle.status}
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
