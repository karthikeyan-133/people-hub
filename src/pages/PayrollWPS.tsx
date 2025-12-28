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
import { Search, Upload, Download, Banknote, CheckCircle, Clock, AlertCircle, Eye, Edit, RefreshCw } from "lucide-react";

interface WPSRecord {
  id: number;
  employee: string;
  bankName: string;
  accountNo: string;
  salary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: string;
}

const initialWpsData: WPSRecord[] = [
  { id: 1, employee: "Ahmed Hassan", bankName: "Emirates NBD", accountNo: "****1234", salary: 15000, allowances: 3000, deductions: 500, netPay: 17500, status: "Processed" },
  { id: 2, employee: "Sara Ali", bankName: "ADCB", accountNo: "****5678", salary: 12000, allowances: 2500, deductions: 400, netPay: 14100, status: "Processed" },
  { id: 3, employee: "Mohammed Khan", bankName: "FAB", accountNo: "****9012", salary: 20000, allowances: 4000, deductions: 600, netPay: 23400, status: "Pending" },
  { id: 4, employee: "Fatima Yusuf", bankName: "Mashreq", accountNo: "****3456", salary: 10000, allowances: 2000, deductions: 300, netPay: 11700, status: "Processed" },
  { id: 5, employee: "Omar Abdullah", bankName: "RAK Bank", accountNo: "****7890", salary: 18000, allowances: 3500, deductions: 550, netPay: 20950, status: "Failed" },
];

export default function PayrollWPS() {
  const { toast } = useToast();
  const [wpsData, setWpsData] = useState<WPSRecord[]>(initialWpsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<WPSRecord | null>(null);
  const [formData, setFormData] = useState({
    salary: 0,
    allowances: 0,
    deductions: 0,
    status: "Pending",
  });

  const filteredData = wpsData.filter((r) =>
    r.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayroll = wpsData.reduce((sum, r) => sum + r.netPay, 0);
  const stats = [
    { label: "Total Payroll", value: `AED ${(totalPayroll / 1000).toFixed(0)}K`, icon: Banknote, color: "text-primary" },
    { label: "Processed", value: wpsData.filter(r => r.status === "Processed").length.toString(), icon: CheckCircle, color: "text-emerald-600" },
    { label: "Pending", value: wpsData.filter(r => r.status === "Pending").length.toString(), icon: Clock, color: "text-amber-600" },
    { label: "Failed", value: wpsData.filter(r => r.status === "Failed").length.toString(), icon: AlertCircle, color: "text-destructive" },
  ];

  const handleExportWPS = () => {
    toast({ title: "WPS File Export", description: "WPS file is being generated for bank submission." });
  };

  const handleProcessPayroll = () => {
    setWpsData(wpsData.map((r) => r.status === "Pending" ? { ...r, status: "Processed" } : r));
    toast({ title: "Payroll Processed", description: "All pending payroll entries have been processed." });
  };

  const handleRetry = (id: number) => {
    setWpsData(wpsData.map((r) => r.id === id ? { ...r, status: "Processed" } : r));
    toast({ title: "Payment Retried", description: "Payment has been reprocessed successfully." });
  };

  const handleEdit = () => {
    if (!selectedRecord) return;
    const netPay = formData.salary + formData.allowances - formData.deductions;
    setWpsData(wpsData.map((r) => r.id === selectedRecord.id ? { ...r, ...formData, netPay } : r));
    setIsEditDialogOpen(false);
    toast({ title: "Record Updated", description: "WPS record has been updated successfully." });
  };

  const openEditDialog = (record: WPSRecord) => {
    setSelectedRecord(record);
    setFormData({ salary: record.salary, allowances: record.allowances, deductions: record.deductions, status: record.status });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (record: WPSRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <MainLayout title="Payroll & WPS" subtitle="Wage Protection System management and payroll processing">
      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={handleExportWPS}><Download className="mr-2 h-4 w-4" />Export WPS File</Button>
          <Button onClick={handleProcessPayroll}><Upload className="mr-2 h-4 w-4" />Process Payroll</Button>
        </div>

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
              <CardTitle>WPS Salary Transfer - December 2024</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Salary (AED)</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>{record.bankName}</TableCell>
                    <TableCell>{record.accountNo}</TableCell>
                    <TableCell>{record.salary.toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-600">+{record.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive">-{record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">{record.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === "Processed" ? "default" : record.status === "Pending" ? "secondary" : "destructive"}>{record.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(record)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(record)}><Edit className="h-4 w-4" /></Button>
                        {record.status === "Failed" && (
                          <Button variant="ghost" size="icon" onClick={() => handleRetry(record.id)}><RefreshCw className="h-4 w-4" /></Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Payment Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Employee</Label><p className="font-medium">{selectedRecord.employee}</p></div>
                <div><Label className="text-muted-foreground">Bank</Label><p className="font-medium">{selectedRecord.bankName}</p></div>
                <div><Label className="text-muted-foreground">Account</Label><p className="font-medium">{selectedRecord.accountNo}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedRecord.status === "Processed" ? "default" : selectedRecord.status === "Pending" ? "secondary" : "destructive"}>{selectedRecord.status}</Badge></div></div>
              </div>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between"><span>Basic Salary:</span><span>AED {selectedRecord.salary.toLocaleString()}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Allowances:</span><span>+AED {selectedRecord.allowances.toLocaleString()}</span></div>
                <div className="flex justify-between text-destructive"><span>Deductions:</span><span>-AED {selectedRecord.deductions.toLocaleString()}</span></div>
                <div className="flex justify-between border-t pt-2 font-semibold"><span>Net Pay:</span><span>AED {selectedRecord.netPay.toLocaleString()}</span></div>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Payment</DialogTitle><DialogDescription>Update payment details.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Salary (AED)</Label><Input type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })} /></div>
            <div className="space-y-2"><Label>Allowances (AED)</Label><Input type="number" value={formData.allowances} onChange={(e) => setFormData({ ...formData, allowances: parseInt(e.target.value) || 0 })} /></div>
            <div className="space-y-2"><Label>Deductions (AED)</Label><Input type="number" value={formData.deductions} onChange={(e) => setFormData({ ...formData, deductions: parseInt(e.target.value) || 0 })} /></div>
            <div className="space-y-2"><Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processed">Processed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
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
    </MainLayout>
  );
}
