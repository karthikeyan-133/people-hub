import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Clock, Settings, Download, Calendar, User, Plus, Edit, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const defaultCompanyTime = {
  workStartTime: "09:00",
  workEndTime: "18:00",
  breakStartTime: "13:00",
  breakEndTime: "14:00",
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  overtimeRate: 1.5,
  weeklyHours: 45,
};

const employeesData = [
  { id: 1, name: "Ahmed Hassan", department: "Engineering", position: "Senior Developer" },
  { id: 2, name: "Fatima Al-Rashid", department: "HR", position: "HR Manager" },
  { id: 3, name: "Mohammed Ali", department: "Finance", position: "Accountant" },
  { id: 4, name: "Sara Ibrahim", department: "Marketing", position: "Marketing Lead" },
  { id: 5, name: "Omar Khalid", department: "Operations", position: "Operations Manager" },
  { id: 6, name: "Layla Ahmed", department: "Engineering", position: "QA Engineer" },
];

const timesheetData = [
  { date: "2024-01-15", day: "Monday", checkIn: "08:55", checkOut: "18:10", breakTime: "1:00", totalHours: "8:15", overtime: "0:15", status: "Present" },
  { date: "2024-01-16", day: "Tuesday", checkIn: "09:02", checkOut: "19:30", breakTime: "1:00", totalHours: "9:28", overtime: "1:28", status: "Present" },
  { date: "2024-01-17", day: "Wednesday", checkIn: "08:50", checkOut: "18:00", breakTime: "1:00", totalHours: "8:10", overtime: "0:10", status: "Present" },
  { date: "2024-01-18", day: "Thursday", checkIn: "-", checkOut: "-", breakTime: "-", totalHours: "0:00", overtime: "0:00", status: "Leave" },
  { date: "2024-01-19", day: "Friday", checkIn: "09:00", checkOut: "18:05", breakTime: "1:00", totalHours: "8:05", overtime: "0:05", status: "Present" },
  { date: "2024-01-20", day: "Saturday", checkIn: "-", checkOut: "-", breakTime: "-", totalHours: "0:00", overtime: "0:00", status: "Weekend" },
  { date: "2024-01-21", day: "Sunday", checkIn: "-", checkOut: "-", breakTime: "-", totalHours: "0:00", overtime: "0:00", status: "Weekend" },
];

export default function Timesheet() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeesData[0] | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [companyTime, setCompanyTime] = useState(defaultCompanyTime);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const filteredEmployees = employeesData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEmployee = (employee: typeof employeesData[0]) => {
    setSelectedEmployee(employee);
    toast({
      title: "Employee Selected",
      description: `Viewing timesheet for ${employee.name}`,
    });
  };

  const handleSaveSettings = () => {
    setSettingsOpen(false);
    toast({
      title: "Settings Saved",
      description: "Company time settings have been updated",
    });
  };

  const handleExportTimesheet = () => {
    toast({
      title: "Export Started",
      description: `Exporting timesheet for ${selectedEmployee?.name || "all employees"}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-primary/20 text-primary hover:bg-primary/20">Present</Badge>;
      case "Leave":
        return <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Leave</Badge>;
      case "Weekend":
        return <Badge variant="secondary">Weekend</Badge>;
      case "Absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalWorkingHours = timesheetData
    .filter((t) => t.status === "Present")
    .reduce((acc, t) => {
      const [hours, mins] = t.totalHours.split(":").map(Number);
      return acc + hours + mins / 60;
    }, 0);

  const totalOvertime = timesheetData
    .filter((t) => t.status === "Present")
    .reduce((acc, t) => {
      const [hours, mins] = t.overtime.split(":").map(Number);
      return acc + hours + mins / 60;
    }, 0);

  return (
    <MainLayout title="Timesheet" subtitle="Track employee working hours and manage company time settings">
      <div className="space-y-6">
        {/* Company Time Settings Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Company Time Settings
            </CardTitle>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Company Time Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Work Start Time</Label>
                      <Input
                        type="time"
                        value={companyTime.workStartTime}
                        onChange={(e) => setCompanyTime({ ...companyTime, workStartTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Work End Time</Label>
                      <Input
                        type="time"
                        value={companyTime.workEndTime}
                        onChange={(e) => setCompanyTime({ ...companyTime, workEndTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Break Start Time</Label>
                      <Input
                        type="time"
                        value={companyTime.breakStartTime}
                        onChange={(e) => setCompanyTime({ ...companyTime, breakStartTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Break End Time</Label>
                      <Input
                        type="time"
                        value={companyTime.breakEndTime}
                        onChange={(e) => setCompanyTime({ ...companyTime, breakEndTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Weekly Hours</Label>
                      <Input
                        type="number"
                        value={companyTime.weeklyHours}
                        onChange={(e) => setCompanyTime({ ...companyTime, weeklyHours: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Overtime Rate</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={companyTime.overtimeRate}
                        onChange={(e) => setCompanyTime({ ...companyTime, overtimeRate: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveSettings} className="w-full">
                    Save Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Work Start</p>
                <p className="font-semibold">{companyTime.workStartTime}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Work End</p>
                <p className="font-semibold">{companyTime.workEndTime}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Break Start</p>
                <p className="font-semibold">{companyTime.breakStartTime}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Break End</p>
                <p className="font-semibold">{companyTime.breakEndTime}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Weekly Hours</p>
                <p className="font-semibold">{companyTime.weeklyHours}h</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">OT Rate</p>
                <p className="font-semibold">{companyTime.overtimeRate}x</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Employee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, department, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="p-3 hover:bg-muted cursor-pointer flex items-center justify-between"
                        onClick={() => handleSelectEmployee(employee)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {employee.position} • {employee.department}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No employees found</div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employee Timesheet */}
        {selectedEmployee && (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{selectedEmployee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedEmployee.position} • {selectedEmployee.department}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleExportTimesheet}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{totalWorkingHours.toFixed(1)}h</p>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{totalOvertime.toFixed(1)}h</p>
                  <p className="text-sm text-muted-foreground">Overtime</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{timesheetData.filter((t) => t.status === "Present").length}</p>
                  <p className="text-sm text-muted-foreground">Days Present</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{timesheetData.filter((t) => t.status === "Leave").length}</p>
                  <p className="text-sm text-muted-foreground">Days Leave</p>
                </div>
              </div>

              {/* Timesheet Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Break</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timesheetData.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.day}</TableCell>
                        <TableCell>{entry.checkIn}</TableCell>
                        <TableCell>{entry.checkOut}</TableCell>
                        <TableCell>{entry.breakTime}</TableCell>
                        <TableCell>{entry.totalHours}</TableCell>
                        <TableCell>{entry.overtime}</TableCell>
                        <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick View - All Employees */}
        {!selectedEmployee && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                All Employees Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>This Week Hours</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeesData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>42.5h</TableCell>
                        <TableCell>2.5h</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleSelectEmployee(employee)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
