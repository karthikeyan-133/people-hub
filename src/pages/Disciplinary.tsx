import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Search, Plus, AlertOctagon, FileWarning, CheckCircle, Clock, Eye, Edit, Trash2 } from "lucide-react";

interface DisciplinaryRecord {
  id: number;
  employee: string;
  type: string;
  reason: string;
  date: string;
  issuedBy: string;
  status: string;
}

const initialDisciplinaryData: DisciplinaryRecord[] = [
  { id: 1, employee: "John Smith", type: "Written Warning", reason: "Repeated Tardiness", date: "2024-06-15", issuedBy: "HR Manager", status: "Active" },
  { id: 2, employee: "Emily Brown", type: "Verbal Warning", reason: "Dress Code Violation", date: "2024-05-20", issuedBy: "Department Head", status: "Resolved" },
  { id: 3, employee: "Michael Lee", type: "Final Warning", reason: "Unauthorized Absence", date: "2024-06-01", issuedBy: "HR Director", status: "Active" },
  { id: 4, employee: "Sarah Johnson", type: "Written Warning", reason: "Policy Violation", date: "2024-04-10", issuedBy: "HR Manager", status: "Resolved" },
  { id: 5, employee: "David Wilson", type: "Suspension", reason: "Misconduct", date: "2024-06-25", issuedBy: "HR Director", status: "Under Review" },
];

export default function Disciplinary() {
  const { toast } = useToast();
  const [disciplinaryData, setDisciplinaryData] = useState<DisciplinaryRecord[]>(initialDisciplinaryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DisciplinaryRecord | null>(null);
  const [formData, setFormData] = useState({
    employee: "",
    type: "Verbal Warning",
    reason: "",
    date: "",
    issuedBy: "",
    status: "Active",
  });

  const filteredData = disciplinaryData.filter((d) =>
    d.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Cases", value: disciplinaryData.length.toString(), icon: AlertOctagon, color: "text-primary" },
    { label: "Active", value: disciplinaryData.filter(d => d.status === "Active").length.toString(), icon: FileWarning, color: "text-amber-600" },
    { label: "Under Review", value: disciplinaryData.filter(d => d.status === "Under Review").length.toString(), icon: Clock, color: "text-blue-600" },
    { label: "Resolved", value: disciplinaryData.filter(d => d.status === "Resolved").length.toString(), icon: CheckCircle, color: "text-emerald-600" },
  ];

  const handleAdd = () => {
    const newRecord: DisciplinaryRecord = { id: disciplinaryData.length + 1, ...formData };
    setDisciplinaryData([...disciplinaryData, newRecord]);
    setIsAddDialogOpen(false);
    setFormData({ employee: "", type: "Verbal Warning", reason: "", date: "", issuedBy: "", status: "Active" });
    toast({ title: "Case Created", description: `Disciplinary case for ${formData.employee} has been created.` });
  };

  const handleEdit = () => {
    if (!selectedRecord) return;
    setDisciplinaryData(disciplinaryData.map((d) => d.id === selectedRecord.id ? { ...d, ...formData } : d));
    setIsEditDialogOpen(false);
    toast({ title: "Case Updated", description: "Disciplinary case has been updated successfully." });
  };

  const handleDelete = (id: number) => {
    setDisciplinaryData(disciplinaryData.filter((d) => d.id !== id));
    toast({ title: "Case Deleted", description: "Disciplinary case has been deleted." });
  };

  const openEditDialog = (record: DisciplinaryRecord) => {
    setSelectedRecord(record);
    setFormData({ employee: record.employee, type: record.type, reason: record.reason, date: record.date, issuedBy: record.issuedBy, status: record.status });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (record: DisciplinaryRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <MainLayout title="Disciplinary Management" subtitle="Track and manage employee disciplinary actions">
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
              <CardTitle>Disciplinary Records</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search cases..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />New Case</Button>
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
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell><Badge variant="outline">{record.type}</Badge></TableCell>
                    <TableCell>{record.reason}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.issuedBy}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === "Resolved" ? "default" : record.status === "Under Review" ? "secondary" : "destructive"}>{record.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(record)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(record)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>New Disciplinary Case</DialogTitle><DialogDescription>Create a new disciplinary case.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
            <div className="space-y-2"><Label>Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verbal Warning">Verbal Warning</SelectItem>
                  <SelectItem value="Written Warning">Written Warning</SelectItem>
                  <SelectItem value="Final Warning">Final Warning</SelectItem>
                  <SelectItem value="Suspension">Suspension</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Reason</Label><Textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Date</Label><Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} /></div>
              <div className="space-y-2"><Label>Issued By</Label><Input value={formData.issuedBy} onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Create Case</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Disciplinary Case</DialogTitle><DialogDescription>Update the disciplinary case.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
            <div className="space-y-2"><Label>Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verbal Warning">Verbal Warning</SelectItem>
                  <SelectItem value="Written Warning">Written Warning</SelectItem>
                  <SelectItem value="Final Warning">Final Warning</SelectItem>
                  <SelectItem value="Suspension">Suspension</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Reason</Label><Textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} /></div>
            <div className="space-y-2"><Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
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
          <DialogHeader><DialogTitle>Case Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Employee</Label><p className="font-medium">{selectedRecord.employee}</p></div>
                <div><Label className="text-muted-foreground">Type</Label><div className="mt-1"><Badge variant="outline">{selectedRecord.type}</Badge></div></div>
                <div><Label className="text-muted-foreground">Date</Label><p className="font-medium">{selectedRecord.date}</p></div>
                <div><Label className="text-muted-foreground">Issued By</Label><p className="font-medium">{selectedRecord.issuedBy}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedRecord.status === "Resolved" ? "default" : selectedRecord.status === "Under Review" ? "secondary" : "destructive"}>{selectedRecord.status}</Badge></div></div>
              </div>
              <div><Label className="text-muted-foreground">Reason</Label><p className="font-medium">{selectedRecord.reason}</p></div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
