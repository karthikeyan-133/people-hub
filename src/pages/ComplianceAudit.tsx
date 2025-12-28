import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, ClipboardCheck, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2, FileText } from "lucide-react";

interface AuditRecord {
  id: number;
  area: string;
  lastAudit: string;
  nextAudit: string;
  findings: number;
  status: string;
  score: number;
}

const initialAuditData: AuditRecord[] = [
  { id: 1, area: "Labor Law Compliance", lastAudit: "2024-03-15", nextAudit: "2024-09-15", findings: 2, status: "Compliant", score: 95 },
  { id: 2, area: "Health & Safety", lastAudit: "2024-04-20", nextAudit: "2024-10-20", findings: 5, status: "Needs Improvement", score: 78 },
  { id: 3, area: "Data Protection", lastAudit: "2024-02-10", nextAudit: "2024-08-10", findings: 1, status: "Compliant", score: 98 },
  { id: 4, area: "WPS Compliance", lastAudit: "2024-05-01", nextAudit: "2024-11-01", findings: 0, status: "Compliant", score: 100 },
  { id: 5, area: "Immigration Records", lastAudit: "2024-01-15", nextAudit: "2024-07-15", findings: 3, status: "Pending Review", score: 85 },
];

export default function ComplianceAudit() {
  const { toast } = useToast();
  const [auditData, setAuditData] = useState<AuditRecord[]>(initialAuditData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [formData, setFormData] = useState({
    area: "",
    lastAudit: "",
    nextAudit: "",
    findings: 0,
    status: "Pending Review",
    score: 0,
  });

  const filteredData = auditData.filter((a) =>
    a.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgScore = Math.round(auditData.reduce((sum, a) => sum + a.score, 0) / auditData.length);
  const stats = [
    { label: "Overall Compliance", value: `${avgScore}%`, icon: ClipboardCheck, color: "text-primary" },
    { label: "Compliant Areas", value: auditData.filter(a => a.status === "Compliant").length.toString(), icon: CheckCircle, color: "text-emerald-600" },
    { label: "Pending Audits", value: auditData.filter(a => a.status === "Pending Review").length.toString(), icon: Clock, color: "text-amber-600" },
    { label: "Open Findings", value: auditData.reduce((sum, a) => sum + a.findings, 0).toString(), icon: AlertTriangle, color: "text-destructive" },
  ];

  const handleAdd = () => {
    const newRecord: AuditRecord = { id: auditData.length + 1, ...formData };
    setAuditData([...auditData, newRecord]);
    setIsAddDialogOpen(false);
    setFormData({ area: "", lastAudit: "", nextAudit: "", findings: 0, status: "Pending Review", score: 0 });
    toast({ title: "Audit Scheduled", description: `Audit for ${formData.area} has been scheduled.` });
  };

  const handleEdit = () => {
    if (!selectedRecord) return;
    setAuditData(auditData.map((a) => a.id === selectedRecord.id ? { ...a, ...formData } : a));
    setIsEditDialogOpen(false);
    toast({ title: "Audit Updated", description: "Audit record has been updated successfully." });
  };

  const handleDelete = (id: number) => {
    setAuditData(auditData.filter((a) => a.id !== id));
    toast({ title: "Audit Deleted", description: "Audit record has been deleted." });
  };

  const openEditDialog = (record: AuditRecord) => {
    setSelectedRecord(record);
    setFormData({ area: record.area, lastAudit: record.lastAudit, nextAudit: record.nextAudit, findings: record.findings, status: record.status, score: record.score });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (record: AuditRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const handleViewReport = (record: AuditRecord) => {
    toast({ title: "Report Opening", description: `Opening audit report for ${record.area}...` });
  };

  return (
    <MainLayout title="Compliance & Audit" subtitle="Track regulatory compliance and audit schedules">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-muted p-3 ${stat.color}`}><stat.icon className="h-6 w-6" /></div>
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
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search audits..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Schedule Audit</Button>
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
                {filteredData.map((audit) => (
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
                      <Badge variant={audit.status === "Compliant" ? "default" : audit.status === "Pending Review" ? "secondary" : "destructive"}>{audit.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewReport(audit)}><FileText className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(audit)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(audit)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(audit.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule Audit</DialogTitle><DialogDescription>Schedule a new compliance audit.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Compliance Area</Label><Input value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Last Audit Date</Label><Input type="date" value={formData.lastAudit} onChange={(e) => setFormData({ ...formData, lastAudit: e.target.value })} /></div>
              <div className="space-y-2"><Label>Next Audit Date</Label><Input type="date" value={formData.nextAudit} onChange={(e) => setFormData({ ...formData, nextAudit: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Audit</DialogTitle><DialogDescription>Update audit details.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Compliance Area</Label><Input value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Last Audit Date</Label><Input type="date" value={formData.lastAudit} onChange={(e) => setFormData({ ...formData, lastAudit: e.target.value })} /></div>
              <div className="space-y-2"><Label>Next Audit Date</Label><Input type="date" value={formData.nextAudit} onChange={(e) => setFormData({ ...formData, nextAudit: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Findings</Label><Input type="number" value={formData.findings} onChange={(e) => setFormData({ ...formData, findings: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Score (%)</Label><Input type="number" value={formData.score} onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="space-y-2"><Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Audit Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Compliance Area</Label><p className="font-medium">{selectedRecord.area}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedRecord.status === "Compliant" ? "default" : selectedRecord.status === "Pending Review" ? "secondary" : "destructive"}>{selectedRecord.status}</Badge></div></div>
                <div><Label className="text-muted-foreground">Last Audit</Label><p className="font-medium">{selectedRecord.lastAudit}</p></div>
                <div><Label className="text-muted-foreground">Next Audit</Label><p className="font-medium">{selectedRecord.nextAudit}</p></div>
                <div><Label className="text-muted-foreground">Findings</Label><p className="font-medium">{selectedRecord.findings}</p></div>
                <div><Label className="text-muted-foreground">Score</Label><div className="flex items-center gap-2 mt-1"><Progress value={selectedRecord.score} className="w-16 h-2" /><span>{selectedRecord.score}%</span></div></div>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
