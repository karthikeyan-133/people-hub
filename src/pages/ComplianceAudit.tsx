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
import { Search, Plus, ClipboardCheck, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const auditData = [
  { id: 1, area: "Labor Law Compliance", lastAudit: "2024-03-15", nextAudit: "2024-09-15", findings: 2, status: "Compliant", score: 95 },
  { id: 2, area: "Health & Safety", lastAudit: "2024-04-20", nextAudit: "2024-10-20", findings: 5, status: "Needs Improvement", score: 78 },
  { id: 3, area: "Data Protection", lastAudit: "2024-02-10", nextAudit: "2024-08-10", findings: 1, status: "Compliant", score: 98 },
  { id: 4, area: "WPS Compliance", lastAudit: "2024-05-01", nextAudit: "2024-11-01", findings: 0, status: "Compliant", score: 100 },
  { id: 5, area: "Immigration Records", lastAudit: "2024-01-15", nextAudit: "2024-07-15", findings: 3, status: "Pending Review", score: 85 },
];

const stats = [
  { label: "Overall Compliance", value: "92%", icon: ClipboardCheck, color: "text-primary" },
  { label: "Compliant Areas", value: "8", icon: CheckCircle, color: "text-emerald-600" },
  { label: "Pending Audits", value: "3", icon: Clock, color: "text-amber-600" },
  { label: "Open Findings", value: "11", icon: AlertTriangle, color: "text-destructive" },
];

export default function ComplianceAudit() {
  return (
    <MainLayout title="Compliance & Audit" subtitle="Track regulatory compliance and audit schedules">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Audit
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
              <CardTitle>Audit Schedule & Results</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search audits..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compliance Area</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead>Next Audit</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditData.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.area}</TableCell>
                    <TableCell>{audit.lastAudit}</TableCell>
                    <TableCell>{audit.nextAudit}</TableCell>
                    <TableCell>{audit.findings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={audit.score} className="w-16 h-2" />
                        <span className="text-sm">{audit.score}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          audit.status === "Compliant"
                            ? "default"
                            : audit.status === "Pending Review"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {audit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View Report</Button>
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
