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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Receipt, DollarSign, TrendingUp, Clock, MoreVertical, Download, Check, X } from "lucide-react";

interface Expense {
  id: number;
  employee: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialExpenses: Expense[] = [
  { id: 1, employee: "Ahmed Hassan", category: "Travel", description: "Client meeting in Abu Dhabi", amount: 1500, date: "2024-12-20", receipt: "REC-001", status: "Pending" },
  { id: 2, employee: "Sara Ali", category: "Office Supplies", description: "Printer cartridges and paper", amount: 450, date: "2024-12-18", receipt: "REC-002", status: "Approved" },
  { id: 3, employee: "Mohammed Khan", category: "Software", description: "Annual license renewal", amount: 2400, date: "2024-12-15", receipt: "REC-003", status: "Approved" },
  { id: 4, employee: "Fatima Yusuf", category: "Training", description: "Professional certification course", amount: 3500, date: "2024-12-10", receipt: "REC-004", status: "Pending" },
  { id: 5, employee: "Omar Abdullah", category: "Equipment", description: "Laptop for new employee", amount: 4200, date: "2024-12-08", receipt: "REC-005", status: "Rejected" },
];

const stats = [
  { label: "Total Expenses", value: "AED 156K", icon: DollarSign, color: "text-primary" },
  { label: "This Month", value: "AED 42K", icon: Receipt, color: "text-emerald-600" },
  { label: "Pending Approval", value: "12", icon: Clock, color: "text-amber-600" },
  { label: "Avg. per Employee", value: "AED 2.8K", icon: TrendingUp, color: "text-blue-600" },
];

export default function CompanyExpenses() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState({
    employee: "",
    category: "",
    description: "",
    amount: "",
    date: "",
  });

  const filteredExpenses = expenses.filter((expense) =>
    expense.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExpense = () => {
    if (!newExpense.employee || !newExpense.category || !newExpense.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const expense: Expense = {
      id: expenses.length + 1,
      employee: newExpense.employee,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date || new Date().toISOString().split("T")[0],
      receipt: `REC-${String(expenses.length + 1).padStart(3, "0")}`,
      status: "Pending",
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ employee: "", category: "", description: "", amount: "", date: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Expense Added",
      description: `Expense claim of AED ${expense.amount.toLocaleString()} has been submitted for approval.`,
    });
  };

  const handleApprove = (expense: Expense) => {
    setExpenses(expenses.map((e) => (e.id === expense.id ? { ...e, status: "Approved" } : e)));
    toast({
      title: "Expense Approved",
      description: `Expense of AED ${expense.amount.toLocaleString()} by ${expense.employee} has been approved.`,
    });
  };

  const handleReject = (expense: Expense) => {
    setExpenses(expenses.map((e) => (e.id === expense.id ? { ...e, status: "Rejected" } : e)));
    toast({
      title: "Expense Rejected",
      description: `Expense of AED ${expense.amount.toLocaleString()} by ${expense.employee} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleView = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (expense: Expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
    toast({
      title: "Expense Deleted",
      description: `Expense record ${expense.receipt} has been deleted.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Expense report is being generated and will download shortly.",
    });
  };

  return (
    <MainLayout title="Company Expenses" subtitle="Track and manage company expenses and reimbursements">
      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
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
              <CardTitle>Expense Claims</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount (AED)</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.employee}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{expense.description}</TableCell>
                    <TableCell>{expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.receipt}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          expense.status === "Approved"
                            ? "default"
                            : expense.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {expense.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
                              onClick={() => handleApprove(expense)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleReject(expense)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(expense)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(expense)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Submit a new expense claim for approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Employee Name</Label>
              <Input
                id="employee"
                value={newExpense.employee}
                onChange={(e) => setNewExpense({ ...newExpense, employee: e.target.value })}
                placeholder="Enter employee name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Meals">Meals & Entertainment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (AED)</Label>
              <Input
                id="amount"
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="Enter expense description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>Submit Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Expense Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>
              View complete expense information.
            </DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="font-medium">{selectedExpense.employee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedExpense.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">AED {selectedExpense.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedExpense.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Receipt No</p>
                  <p className="font-medium">{selectedExpense.receipt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedExpense.status === "Approved"
                        ? "default"
                        : selectedExpense.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedExpense.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedExpense.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
