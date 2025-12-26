import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, TrendingUp, Star, Target, Award } from "lucide-react";

const performanceData = [
  { id: 1, employee: "Ahmed Hassan", department: "Engineering", reviewPeriod: "Q4 2024", rating: 4.5, goals: 8, completed: 7, status: "Completed" },
  { id: 2, employee: "Sara Ali", department: "Marketing", reviewPeriod: "Q4 2024", rating: 4.2, goals: 6, completed: 5, status: "Completed" },
  { id: 3, employee: "Mohammed Khan", department: "Finance", reviewPeriod: "Q4 2024", rating: 0, goals: 5, completed: 3, status: "In Progress" },
  { id: 4, employee: "Fatima Yusuf", department: "HR", reviewPeriod: "Q4 2024", rating: 4.8, goals: 7, completed: 7, status: "Completed" },
  { id: 5, employee: "Omar Abdullah", department: "Operations", reviewPeriod: "Q4 2024", rating: 0, goals: 6, completed: 2, status: "Pending" },
];

const stats = [
  { label: "Avg Performance", value: "4.2", icon: TrendingUp, color: "text-primary" },
  { label: "Reviews Completed", value: "124", icon: Star, color: "text-amber-500" },
  { label: "Goals Set", value: "458", icon: Target, color: "text-blue-600" },
  { label: "Top Performers", value: "18", icon: Award, color: "text-emerald-600" },
];

export default function Performance() {
  return (
    <MainLayout title="Performance Management" subtitle="Track employee performance reviews and goals">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Review
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
              <CardTitle>Performance Reviews - Q4 2024</CardTitle>
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
                  <TableHead>Department</TableHead>
                  <TableHead>Review Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Goal Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.reviewPeriod}</TableCell>
                    <TableCell>
                      {record.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span>{record.rating}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={(record.completed / record.goals) * 100} className="w-16 h-2" />
                        <span className="text-sm">{record.completed}/{record.goals}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "Completed"
                            ? "default"
                            : record.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        {record.status === "Completed" ? "View" : "Review"}
                      </Button>
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
