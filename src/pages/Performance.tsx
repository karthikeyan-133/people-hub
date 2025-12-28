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
import { Search, Plus, TrendingUp, Star, Target, Award, Eye, Edit, Trash2 } from "lucide-react";

interface PerformanceRecord {
  id: number;
  employee: string;
  department: string;
  reviewPeriod: string;
  rating: number;
  goals: number;
  completed: number;
  status: string;
}

const initialPerformanceData: PerformanceRecord[] = [
  { id: 1, employee: "Ahmed Hassan", department: "Engineering", reviewPeriod: "Q4 2024", rating: 4.5, goals: 8, completed: 7, status: "Completed" },
  { id: 2, employee: "Sara Ali", department: "Marketing", reviewPeriod: "Q4 2024", rating: 4.2, goals: 6, completed: 5, status: "Completed" },
  { id: 3, employee: "Mohammed Khan", department: "Finance", reviewPeriod: "Q4 2024", rating: 0, goals: 5, completed: 3, status: "In Progress" },
  { id: 4, employee: "Fatima Yusuf", department: "HR", reviewPeriod: "Q4 2024", rating: 4.8, goals: 7, completed: 7, status: "Completed" },
  { id: 5, employee: "Omar Abdullah", department: "Operations", reviewPeriod: "Q4 2024", rating: 0, goals: 6, completed: 2, status: "Pending" },
];

export default function Performance() {
  const { toast } = useToast();
  const [performanceData, setPerformanceData] = useState<PerformanceRecord[]>(initialPerformanceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PerformanceRecord | null>(null);
  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    reviewPeriod: "Q4 2024",
    rating: 0,
    goals: 0,
    completed: 0,
    status: "Pending",
  });

  const filteredData = performanceData.filter((p) =>
    p.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedReviews = performanceData.filter(p => p.status === "Completed");
  const avgRating = completedReviews.length > 0 ? (completedReviews.reduce((sum, p) => sum + p.rating, 0) / completedReviews.length).toFixed(1) : "0";
  const stats = [
    { label: "Avg Performance", value: avgRating, icon: TrendingUp, color: "text-primary" },
    { label: "Reviews Completed", value: completedReviews.length.toString(), icon: Star, color: "text-amber-500" },
    { label: "Goals Set", value: performanceData.reduce((sum, p) => sum + p.goals, 0).toString(), icon: Target, color: "text-blue-600" },
    { label: "Top Performers", value: performanceData.filter(p => p.rating >= 4.5).length.toString(), icon: Award, color: "text-emerald-600" },
  ];

  const handleAdd = () => {
    const newRecord: PerformanceRecord = { id: performanceData.length + 1, ...formData };
    setPerformanceData([...performanceData, newRecord]);
    setIsAddDialogOpen(false);
    setFormData({ employee: "", department: "", reviewPeriod: "Q4 2024", rating: 0, goals: 0, completed: 0, status: "Pending" });
    toast({ title: "Review Created", description: `Performance review for ${formData.employee} has been created.` });
  };

  const handleEdit = () => {
    if (!selectedRecord) return;
    setPerformanceData(performanceData.map((p) => p.id === selectedRecord.id ? { ...p, ...formData } : p));
    setIsEditDialogOpen(false);
    toast({ title: "Review Updated", description: "Performance review has been updated successfully." });
  };

  const handleDelete = (id: number) => {
    setPerformanceData(performanceData.filter((p) => p.id !== id));
    toast({ title: "Review Deleted", description: "Performance review has been deleted." });
  };

  const handleCompleteReview = () => {
    if (!selectedRecord) return;
    setPerformanceData(performanceData.map((p) => p.id === selectedRecord.id ? { ...p, ...formData, status: "Completed" } : p));
    setIsReviewDialogOpen(false);
    toast({ title: "Review Completed", description: `Performance review for ${selectedRecord.employee} has been completed.` });
  };

  const openEditDialog = (record: PerformanceRecord) => {
    setSelectedRecord(record);
    setFormData({ employee: record.employee, department: record.department, reviewPeriod: record.reviewPeriod, rating: record.rating, goals: record.goals, completed: record.completed, status: record.status });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (record: PerformanceRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const openReviewDialog = (record: PerformanceRecord) => {
    setSelectedRecord(record);
    setFormData({ employee: record.employee, department: record.department, reviewPeriod: record.reviewPeriod, rating: record.rating, goals: record.goals, completed: record.completed, status: record.status });
    setIsReviewDialogOpen(true);
  };

  return (
    <MainLayout title="Performance Management" subtitle="Track employee performance reviews and goals">
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
              <CardTitle>Performance Reviews - Q4 2024</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search employees..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" />New Review</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Review Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Goal Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.reviewPeriod}</TableCell>
                    <TableCell>
                      {record.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span>{record.rating}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={(record.completed / record.goals) * 100} className="w-16 h-2" />
                        <span className="text-sm">{record.completed}/{record.goals}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.status === "Completed" ? "default" : record.status === "In Progress" ? "secondary" : "outline"}>{record.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {record.status !== "Completed" && (
                          <Button variant="ghost" size="sm" onClick={() => openReviewDialog(record)}>Review</Button>
                        )}
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
          <DialogHeader><DialogTitle>New Performance Review</DialogTitle><DialogDescription>Create a new performance review.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
              <div className="space-y-2"><Label>Department</Label><Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Goals Count</Label><Input type="number" value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Create Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Performance Review</DialogTitle><DialogDescription>Update performance review details.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employee Name</Label><Input value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} /></div>
              <div className="space-y-2"><Label>Department</Label><Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Goals</Label><Input type="number" value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Completed</Label><Input type="number" value={formData.completed} onChange={(e) => setFormData({ ...formData, completed: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Rating</Label><Input type="number" step="0.1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
          <DialogHeader><DialogTitle>Review Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Employee</Label><p className="font-medium">{selectedRecord.employee}</p></div>
                <div><Label className="text-muted-foreground">Department</Label><p className="font-medium">{selectedRecord.department}</p></div>
                <div><Label className="text-muted-foreground">Review Period</Label><p className="font-medium">{selectedRecord.reviewPeriod}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1"><Badge variant={selectedRecord.status === "Completed" ? "default" : selectedRecord.status === "In Progress" ? "secondary" : "outline"}>{selectedRecord.status}</Badge></div></div>
                <div><Label className="text-muted-foreground">Rating</Label><div className="flex items-center gap-1 mt-1">{selectedRecord.rating > 0 ? <><Star className="h-4 w-4 fill-amber-500 text-amber-500" /><span>{selectedRecord.rating}</span></> : <span className="text-muted-foreground">Not rated yet</span>}</div></div>
                <div><Label className="text-muted-foreground">Goal Progress</Label><div className="flex items-center gap-2 mt-1"><Progress value={(selectedRecord.completed / selectedRecord.goals) * 100} className="w-16 h-2" /><span>{selectedRecord.completed}/{selectedRecord.goals}</span></div></div>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={() => setIsViewDialogOpen(false)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Complete Review</DialogTitle><DialogDescription>Complete the performance review for {selectedRecord?.employee}.</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Goals Completed</Label><Input type="number" value={formData.completed} onChange={(e) => setFormData({ ...formData, completed: parseInt(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Rating (1-5)</Label><Input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCompleteReview}>Complete Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
