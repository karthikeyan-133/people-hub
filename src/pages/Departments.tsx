import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight, Plus } from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Engineering",
    description: "Software development and technical operations",
    head: "Robert Martinez",
    employees: 42,
    openPositions: 5,
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Marketing",
    description: "Brand management and marketing campaigns",
    head: "Sarah Johnson",
    employees: 28,
    openPositions: 2,
    color: "bg-chart-2",
  },
  {
    id: 3,
    name: "Sales",
    description: "Customer acquisition and revenue generation",
    head: "David Thompson",
    employees: 35,
    openPositions: 4,
    color: "bg-chart-3",
  },
  {
    id: 4,
    name: "Human Resources",
    description: "Employee management and organizational development",
    head: "Lisa Anderson",
    employees: 12,
    openPositions: 1,
    color: "bg-chart-4",
  },
  {
    id: 5,
    name: "Finance",
    description: "Financial planning and accounting",
    head: "David Kim",
    employees: 18,
    openPositions: 2,
    color: "bg-chart-5",
  },
  {
    id: 6,
    name: "Design",
    description: "UI/UX design and creative services",
    head: "Emily Davis",
    employees: 15,
    openPositions: 3,
    color: "bg-primary",
  },
];

const Departments = () => {
  return (
    <MainLayout title="Departments" subtitle="Organizational structure overview">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card key={dept.id} className="transition-shadow hover:shadow-md cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`h-10 w-10 rounded-lg ${dept.color} flex items-center justify-center`}>
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <CardTitle className="mt-4">{dept.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{dept.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Department Head</span>
                <span className="font-medium text-foreground">{dept.head}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Employees</span>
                <span className="font-medium text-foreground">{dept.employees}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Open Positions</span>
                <Badge variant={dept.openPositions > 0 ? "default" : "secondary"}>
                  {dept.openPositions}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Departments;
