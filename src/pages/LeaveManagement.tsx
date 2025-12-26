import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, X, Clock, Plus } from "lucide-react";

const leaveRequests = [
  {
    id: 1,
    employee: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      initials: "SJ",
      department: "Marketing",
    },
    type: "Annual Leave",
    startDate: "Dec 28, 2024",
    endDate: "Jan 2, 2025",
    days: 4,
    status: "pending",
    reason: "Family vacation",
  },
  {
    id: 2,
    employee: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      initials: "JW",
      department: "Engineering",
    },
    type: "Sick Leave",
    startDate: "Dec 27, 2024",
    endDate: "Dec 27, 2024",
    days: 1,
    status: "pending",
    reason: "Medical appointment",
  },
  {
    id: 3,
    employee: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      initials: "ED",
      department: "Design",
    },
    type: "Personal Leave",
    startDate: "Dec 30, 2024",
    endDate: "Dec 30, 2024",
    days: 1,
    status: "pending",
    reason: "Personal errands",
  },
  {
    id: 4,
    employee: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      initials: "MC",
      department: "Engineering",
    },
    type: "Annual Leave",
    startDate: "Jan 6, 2025",
    endDate: "Jan 10, 2025",
    days: 5,
    status: "approved",
    reason: "Winter break",
  },
  {
    id: 5,
    employee: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      initials: "LA",
      department: "Human Resources",
    },
    type: "Sick Leave",
    startDate: "Dec 20, 2024",
    endDate: "Dec 21, 2024",
    days: 2,
    status: "approved",
    reason: "Flu recovery",
  },
];

const leaveBalances = [
  { type: "Annual Leave", used: 12, total: 20, color: "bg-primary" },
  { type: "Sick Leave", used: 3, total: 10, color: "bg-chart-3" },
  { type: "Personal Leave", used: 2, total: 5, color: "bg-chart-4" },
  { type: "Unpaid Leave", used: 0, total: 30, color: "bg-chart-5" },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "approved":
      return <Badge variant="default">Approved</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const LeaveManagement = () => {
  return (
    <MainLayout title="Leave Management" subtitle="Manage time off requests">
      {/* Quick Stats */}
      <div className="mb-6 grid gap-6 md:grid-cols-4">
        {leaveBalances.map((leave) => (
          <Card key={leave.type}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{leave.type}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {leave.total - leave.used} <span className="text-sm font-normal text-muted-foreground">days left</span>
                  </p>
                </div>
                <div className={`h-10 w-10 rounded-full ${leave.color} flex items-center justify-center`}>
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${leave.color}`}
                  style={{ width: `${(leave.used / leave.total) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {leave.used} of {leave.total} days used
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mb-6">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Leave
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({leaveRequests.filter(r => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {leaveRequests
            .filter((r) => r.status === "pending")
            .map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.employee.avatar} />
                        <AvatarFallback>{request.employee.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{request.employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                        <Check className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <X className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Leave Type</p>
                      <p className="font-medium text-foreground">{request.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{request.days} day{request.days > 1 ? "s" : ""}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="font-medium text-foreground">{request.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">To</p>
                      <p className="font-medium text-foreground">{request.endDate}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <span className="font-medium">Reason:</span> {request.reason}
                  </p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {leaveRequests
            .filter((r) => r.status === "approved")
            .map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.employee.avatar} />
                        <AvatarFallback>{request.employee.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{request.employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                      </div>
                    </div>
                    {statusBadge(request.status)}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Leave Type</p>
                      <p className="font-medium text-foreground">{request.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{request.days} day{request.days > 1 ? "s" : ""}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="font-medium text-foreground">{request.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">To</p>
                      <p className="font-medium text-foreground">{request.endDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {leaveRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.employee.avatar} />
                      <AvatarFallback>{request.employee.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{request.employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.type} • {request.days} day{request.days > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  {statusBadge(request.status)}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{request.startDate}</span>
                  <span>→</span>
                  <span>{request.endDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default LeaveManagement;
