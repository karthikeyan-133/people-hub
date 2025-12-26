import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Filter, MoreVertical, Mail, Phone } from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 234 567 8901",
    position: "Marketing Manager",
    department: "Marketing",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    initials: "SJ",
    joinDate: "Jan 15, 2022",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 234 567 8902",
    position: "Senior Developer",
    department: "Engineering",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    initials: "MC",
    joinDate: "Mar 22, 2021",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 234 567 8903",
    position: "UI/UX Designer",
    department: "Design",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    initials: "ED",
    joinDate: "Jun 10, 2022",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 234 567 8904",
    position: "Product Manager",
    department: "Product",
    status: "on-leave",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    initials: "JW",
    joinDate: "Sep 05, 2020",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1 234 567 8905",
    position: "HR Specialist",
    department: "Human Resources",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    initials: "LA",
    joinDate: "Feb 18, 2023",
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1 234 567 8906",
    position: "Financial Analyst",
    department: "Finance",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    initials: "DK",
    joinDate: "Nov 30, 2021",
  },
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <MainLayout title="Employees" subtitle="Manage your team members">
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Employee Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>{employee.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {employee.status === "active" ? "Active" : "On Leave"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{employee.department}</span>
                <span className="text-muted-foreground">Joined {employee.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Employees;
