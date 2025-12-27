import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Clock, UserCheck, UserX, AlertTriangle } from "lucide-react";

interface AttendanceRecord {
  id: number;
  employee: {
    name: string;
    avatar: string;
    initials: string;
    department: string;
  };
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "absent" | "on-leave";
  workHours: string;
}

const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    employee: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      initials: "SJ",
      department: "Marketing",
    },
    checkIn: "08:45 AM",
    checkOut: "05:30 PM",
    status: "present",
    workHours: "8h 45m",
  },
  {
    id: 2,
    employee: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      initials: "MC",
      department: "Engineering",
    },
    checkIn: "09:15 AM",
    checkOut: "06:00 PM",
    status: "late",
    workHours: "8h 45m",
  },
  {
    id: 3,
    employee: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      initials: "ED",
      department: "Design",
    },
    checkIn: "08:30 AM",
    checkOut: "05:15 PM",
    status: "present",
    workHours: "8h 45m",
  },
  {
    id: 4,
    employee: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      initials: "JW",
      department: "Product",
    },
    checkIn: "-",
    checkOut: "-",
    status: "on-leave",
    workHours: "-",
  },
  {
    id: 5,
    employee: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      initials: "LA",
      department: "Human Resources",
    },
    checkIn: "08:55 AM",
    checkOut: "05:45 PM",
    status: "present",
    workHours: "8h 50m",
  },
  {
    id: 6,
    employee: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      initials: "DK",
      department: "Finance",
    },
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    workHours: "-",
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "present":
      return <Badge variant="default">Present</Badge>;
    case "late":
      return <Badge className="bg-chart-4 text-primary-foreground hover:bg-chart-4/90">Late</Badge>;
    case "absent":
      return <Badge variant="destructive">Absent</Badge>;
    case "on-leave":
      return <Badge variant="secondary">On Leave</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Attendance = () => {
  const { toast } = useToast();
  const [attendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = attendanceRecords.filter((record) =>
    record.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const attendanceStats = [
    { label: "Present", value: filteredRecords.filter(r => r.status === "present").length, icon: UserCheck, color: "text-primary" },
    { label: "Absent", value: filteredRecords.filter(r => r.status === "absent").length, icon: UserX, color: "text-destructive" },
    { label: "Late", value: filteredRecords.filter(r => r.status === "late").length, icon: AlertTriangle, color: "text-chart-4" },
    { label: "On Leave", value: filteredRecords.filter(r => r.status === "on-leave").length, icon: Clock, color: "text-muted-foreground" },
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Attendance report is being generated and will download shortly.",
    });
  };

  return (
    <MainLayout title="Attendance" subtitle="Track employee attendance">
      {/* Stats */}
      <div className="mb-6 grid gap-6 md:grid-cols-4">
        {attendanceStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Today's Attendance</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={record.employee.avatar} />
                        <AvatarFallback>{record.employee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{record.employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.employee.department}</TableCell>
                  <TableCell className="text-muted-foreground">{record.checkIn}</TableCell>
                  <TableCell className="text-muted-foreground">{record.checkOut}</TableCell>
                  <TableCell className="text-muted-foreground">{record.workHours}</TableCell>
                  <TableCell>{statusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Attendance;
