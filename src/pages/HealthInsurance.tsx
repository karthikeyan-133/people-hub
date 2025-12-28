import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Search, Plus, Heart, Users, Shield, AlertTriangle, Eye, Edit, Trash2 } from "lucide-react";

interface InsuranceRecord {
  id: number;
  employee: string;
  policyNo: string;
  provider: string;
  plan: string;
  dependents: number;
  premium: number;
  expiryDate: string;
  status: string;
}

const initialInsuranceData: InsuranceRecord[] = [
  { id: 1, employee: "Ahmed Hassan", policyNo: "HI-2024-001", provider: "Daman", plan: "Enhanced", dependents: 3, premium: 12000, expiryDate: "2025-03-31", status: "Active" },
  { id: 2, employee: "Sara Ali", policyNo: "HI-2024-002", provider: "Oman Insurance", plan: "Basic", dependents: 0, premium: 4500, expiryDate: "2025-06-30", status: "Active" },
  { id: 3, employee: "Mohammed Khan", policyNo: "HI-2024-003", provider: "Daman", plan: "Enhanced Plus", dependents: 4, premium: 18000, expiryDate: "2024-12-31", status: "Expiring" },
  { id: 4, employee: "Fatima Yusuf", policyNo: "HI-2024-004", provider: "AXA", plan: "Basic", dependents: 1, premium: 6000, expiryDate: "2025-09-30", status: "Active" },
  { id: 5, employee: "Omar Abdullah", policyNo: "HI-2024-005", provider: "MetLife", plan: "Enhanced", dependents: 2, premium: 10000, expiryDate: "2024-11-30", status: "Expired" },
];

export default function HealthInsurance() {
  const { toast } = useToast();
  const [insuranceData, setInsuranceData] = useState<InsuranceRecord[]>(initialInsuranceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<InsuranceRecord | null>(null);
  const [formData, setFormData] = useState({
    employee: "",
    policyNo: "",
    provider: "",
    plan: "Basic",
    dependents: 0,
    premium: 0,
    expiryDate: "",
    status: "Active",
  });

  const filteredData = insuranceData.filter((i) =>
    i.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.policyNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Insured", value: insuranceData.length.toString(), icon: Heart, color: "text-primary" },
    { label: "With Dependents", value: insuranceData.filter(i => i.dependents > 0).length.toString(), icon: Users, color: "text-emerald-600" },
    { label: "Active Policies", value: insuranceData.filter(i => i.status === "Active").length.toString(), icon: Shield, color: "text-blue-600" },
    { label: "Expiring Soon", value: insuranceData.filter(i => i.status === "Expiring").length.toString(), icon: AlertTriangle, color: "text-amber-600" },
  ];

  const handleAdd = () => {
    const newRecord: InsuranceRecord = { id: insuranceData.length + 1, ...formData };
    setInsuranceData([...insuranceData, newRecord]);
    setIsAddDialogOpen(false);
    setFormData({ employee: "", policyNo: "", provider: "", plan: "Basic", dependents: 0, premium: 0, expiryDate: "", status: "Active" });
    toast({ title: "Policy Added", description: `Insurance policy for ${formData.employee} has been added.` });
  };

  const handleEdit = () => {
    if (!selectedRecord) return;
    setInsuranceData(insuranceData.map((i) => i.id === selectedRecord.id ? { ...i, ...formData } : i));
    setIsEditDialogOpen(false);
    toast({ title: "Policy Updated", description: "Insurance policy has been updated successfully." });
  };

  const handleDelete = (id: number) => {
    setInsuranceData(insuranceData.filter((i) => i.id !== id));
    toast({ title: "Policy Deleted", description: "Insurance policy has been deleted." });
  };

  const openEditDialog = (record: InsuranceRecord) => {
    setSelectedRecord(record);
    setFormData({ employee: record.employee, policyNo: record.policyNo, provider: record.provider, plan: record.plan, dependents: record.dependents, premium: record.premium, expiryDate: record.expiryDate, status: record.status });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (record: InsuranceRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <MainLayout title="Health Insurance" subtitle="Manage employee health insurance policies and dependents">
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
              <CardTitle>Insurance Policies</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search policies..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Policy</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Policy No</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Dependents</TableHead>
                  <TableHead>Premium (AED)</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.employee}</TableCell>
                    <TableCell>{policy.policyNo}</TableCell>
                    <TableCell>{policy.provider}</TableCell>
                    <TableCell>{policy.plan}</TableCell>
                    <TableCell>{policy.dependents}</TableCell>
                    <TableCell>{policy.premium.toLocaleString()}</TableCell>
                    <TableCell>{policy.expiryDate}</TableCell>
                    <TableCell>
                      <Badge variant={policy.status === "Active" ? "default" : policy.status === "Expiring" ? "secondary" : "destructive"}>{policy.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(policy)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(policy)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(policy.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>Add Insurance Policy</DialogTitle><DialogDescription>Add a new insurance policy.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
              <div className="space-y-2"><Label>Policy Number</Label><Input value={formData.policyNo} onChange={(e) => setFormData({ ...formData, policyNo: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Provider</Label><Input value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} /></div>
              <div className="space-y-2"><Label>Plan</Label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Enhanced">Enhanced</SelectItem>
                    <SelectItem value="Enhanced Plus">Enhanced Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Dependents</Label><Input type="number" value={formData.dependents} onChange={(e) => setFormData({ ...formData, dependents: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Premium (AED)</Label><Input type="number" value={formData.premium} onChange={(e) => setFormData({ ...formData, premium: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Insurance Policy</DialogTitle><DialogDescription>Update insurance policy details.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
              <div className="space-y-2"><Label>Policy Number</Label><Input value={formData.policyNo} onChange={(e) => setFormData({ ...formData, policyNo: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Provider</Label><Input value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} /></div>
              <div className="space-y-2"><Label>Plan</Label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Enhanced">Enhanced</SelectItem>
                    <SelectItem value="Enhanced Plus">Enhanced Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expiring">Expiring</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} /></div>
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
          <DialogHeader><DialogTitle>Policy Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Employee</Label><p className="font-medium">{selectedRecord.employee}</p></div>
                <div><Label className="text-muted-foreground">Policy No</Label><p className="font-medium">{selectedRecord.policyNo}</p></div>
                <div><Label className="text-muted-foreground">Provider</Label><p className="font-medium">{selectedRecord.provider}</p></div>
                <div><Label className="text-muted-foreground">Plan</Label><p className="font-medium">{selectedRecord.plan}</p></div>
                <div><Label className="text-muted-foreground">Dependents</Label><p className="font-medium">{selectedRecord.dependents}</p></div>
                <div><Label className="text-muted-foreground">Premium</Label><p className="font-medium">AED {selectedRecord.premium.toLocaleString()}</p></div>
                <div><Label className="text-muted-foreground">Expiry Date</Label><p className="font-medium">{selectedRecord.expiryDate}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedRecord.status === "Active" ? "default" : selectedRecord.status === "Expiring" ? "secondary" : "destructive"}>{selectedRecord.status}</Badge></div></div>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
