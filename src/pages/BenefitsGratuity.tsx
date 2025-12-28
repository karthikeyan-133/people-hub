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
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Gift, DollarSign, Users, TrendingUp, Eye, Edit, Trash2, Calculator } from "lucide-react";

interface BenefitRecord {
  id: number;
  employee: string;
  yearsOfService: number;
  basicSalary: number;
  gratuityAmount: number;
  status: string;
}

const initialBenefitsData: BenefitRecord[] = [
  { id: 1, employee: "Ahmed Hassan", yearsOfService: 5, basicSalary: 15000, gratuityAmount: 37500, status: "Accruing" },
  { id: 2, employee: "Sara Ali", yearsOfService: 3, basicSalary: 12000, gratuityAmount: 18000, status: "Accruing" },
  { id: 3, employee: "Mohammed Khan", yearsOfService: 8, basicSalary: 20000, gratuityAmount: 100000, status: "Accruing" },
  { id: 4, employee: "Fatima Yusuf", yearsOfService: 2, basicSalary: 10000, gratuityAmount: 10000, status: "Accruing" },
  { id: 5, employee: "Omar Abdullah", yearsOfService: 6, basicSalary: 18000, gratuityAmount: 54000, status: "Paid Out" },
];

export default function BenefitsGratuity() {
  const { toast } = useToast();
  const [benefitsData, setBenefitsData] = useState<BenefitRecord[]>(initialBenefitsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCalculateDialogOpen, setIsCalculateDialogOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitRecord | null>(null);
  const [formData, setFormData] = useState({
    employee: "",
    yearsOfService: 0,
    basicSalary: 0,
    gratuityAmount: 0,
    status: "Accruing",
  });

  const filteredData = benefitsData.filter((b) =>
    b.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalLiability = benefitsData.reduce((sum, b) => sum + b.gratuityAmount, 0);
  const stats = [
    { label: "Total Liability", value: `AED ${(totalLiability / 1000000).toFixed(1)}M`, icon: DollarSign, color: "text-primary" },
    { label: "Eligible Employees", value: benefitsData.length.toString(), icon: Users, color: "text-emerald-600" },
    { label: "Avg. Years of Service", value: (benefitsData.reduce((sum, b) => sum + b.yearsOfService, 0) / benefitsData.length).toFixed(1), icon: TrendingUp, color: "text-amber-600" },
    { label: "Benefits Programs", value: "6", icon: Gift, color: "text-purple-600" },
  ];

  const calculateGratuity = (years: number, salary: number) => {
    if (years < 1) return 0;
    if (years <= 5) return (salary / 2) * years;
    return (salary / 2) * 5 + salary * (years - 5);
  };

  const handleAdd = () => {
    const gratuity = calculateGratuity(formData.yearsOfService, formData.basicSalary);
    const newBenefit: BenefitRecord = { id: benefitsData.length + 1, ...formData, gratuityAmount: gratuity };
    setBenefitsData([...benefitsData, newBenefit]);
    setIsAddDialogOpen(false);
    setFormData({ employee: "", yearsOfService: 0, basicSalary: 0, gratuityAmount: 0, status: "Accruing" });
    toast({ title: "Benefit Added", description: `Benefit record for ${formData.employee} has been added.` });
  };

  const handleEdit = () => {
    if (!selectedBenefit) return;
    const gratuity = calculateGratuity(formData.yearsOfService, formData.basicSalary);
    setBenefitsData(benefitsData.map((b) => b.id === selectedBenefit.id ? { ...b, ...formData, gratuityAmount: gratuity } : b));
    setIsEditDialogOpen(false);
    toast({ title: "Benefit Updated", description: "Benefit record has been updated successfully." });
  };

  const handleDelete = (id: number) => {
    setBenefitsData(benefitsData.filter((b) => b.id !== id));
    toast({ title: "Benefit Deleted", description: "Benefit record has been deleted." });
  };

  const openEditDialog = (benefit: BenefitRecord) => {
    setSelectedBenefit(benefit);
    setFormData({ employee: benefit.employee, yearsOfService: benefit.yearsOfService, basicSalary: benefit.basicSalary, gratuityAmount: benefit.gratuityAmount, status: benefit.status });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (benefit: BenefitRecord) => {
    setSelectedBenefit(benefit);
    setIsViewDialogOpen(true);
  };

  const openCalculateDialog = (benefit: BenefitRecord) => {
    setSelectedBenefit(benefit);
    setIsCalculateDialogOpen(true);
  };

  return (
    <MainLayout title="Benefits & Gratuity" subtitle="Manage employee benefits and end-of-service gratuity">
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
              <CardTitle>Gratuity Calculator</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search employees..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Benefit</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Years of Service</TableHead>
                  <TableHead>Basic Salary (AED)</TableHead>
                  <TableHead>Gratuity Amount (AED)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((benefit) => (
                  <TableRow key={benefit.id}>
                    <TableCell className="font-medium">{benefit.employee}</TableCell>
                    <TableCell>{benefit.yearsOfService} years</TableCell>
                    <TableCell>{benefit.basicSalary.toLocaleString()}</TableCell>
                    <TableCell>{benefit.gratuityAmount.toLocaleString()}</TableCell>
                    <TableCell><Badge variant={benefit.status === "Accruing" ? "default" : "secondary"}>{benefit.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openCalculateDialog(benefit)}><Calculator className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(benefit)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(benefit)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(benefit.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>Add Benefit Record</DialogTitle><DialogDescription>Add a new employee benefit record.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Years of Service</Label><Input type="number" value={formData.yearsOfService} onChange={(e) => setFormData({ ...formData, yearsOfService: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Basic Salary (AED)</Label><Input type="number" value={formData.basicSalary} onChange={(e) => setFormData({ ...formData, basicSalary: parseInt(e.target.value) || 0 })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Benefit Record</DialogTitle><DialogDescription>Update the benefit record.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Years of Service</Label><Input type="number" value={formData.yearsOfService} onChange={(e) => setFormData({ ...formData, yearsOfService: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Basic Salary (AED)</Label><Input type="number" value={formData.basicSalary} onChange={(e) => setFormData({ ...formData, basicSalary: parseInt(e.target.value) || 0 })} /></div>
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
          <DialogHeader><DialogTitle>Benefit Details</DialogTitle></DialogHeader>
          {selectedBenefit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Employee</Label><p className="font-medium">{selectedBenefit.employee}</p></div>
                <div><Label className="text-muted-foreground">Years of Service</Label><p className="font-medium">{selectedBenefit.yearsOfService} years</p></div>
                <div><Label className="text-muted-foreground">Basic Salary</Label><p className="font-medium">AED {selectedBenefit.basicSalary.toLocaleString()}</p></div>
                <div><Label className="text-muted-foreground">Gratuity Amount</Label><p className="font-medium">AED {selectedBenefit.gratuityAmount.toLocaleString()}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedBenefit.status === "Accruing" ? "default" : "secondary"}>{selectedBenefit.status}</Badge></div></div>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calculate Dialog */}
      <Dialog open={isCalculateDialogOpen} onOpenChange={setIsCalculateDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Gratuity Calculation</DialogTitle><DialogDescription>End of service gratuity calculation details.</DialogDescription></DialogHeader>
          {selectedBenefit && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-semibold mb-2">{selectedBenefit.employee}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Basic Salary:</span><span>AED {selectedBenefit.basicSalary.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Years of Service:</span><span>{selectedBenefit.yearsOfService} years</span></div>
                  <div className="flex justify-between border-t pt-2 font-semibold"><span>Calculated Gratuity:</span><span>AED {selectedBenefit.gratuityAmount.toLocaleString()}</span></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Formula: First 5 years = 50% of salary per year. After 5 years = 100% of salary per year.</p>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsCalculateDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
