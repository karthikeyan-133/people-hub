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
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Package, Laptop, Wrench, CheckCircle, AlertTriangle, MoreVertical, Download } from "lucide-react";

interface Asset {
  id: number;
  assetTag: string;
  name: string;
  category: string;
  assignedTo: string;
  purchaseDate: string;
  value: number;
  status: "In Use" | "Available" | "Maintenance" | "Retired";
}

const initialAssets: Asset[] = [
  { id: 1, assetTag: "AST-001", name: "MacBook Pro 16\"", category: "Laptop", assignedTo: "Ahmed Hassan", purchaseDate: "2024-01-15", value: 8500, status: "In Use" },
  { id: 2, assetTag: "AST-002", name: "Dell Monitor 27\"", category: "Monitor", assignedTo: "Sara Ali", purchaseDate: "2024-02-20", value: 1200, status: "In Use" },
  { id: 3, assetTag: "AST-003", name: "HP LaserJet Pro", category: "Printer", assignedTo: "Office Pool", purchaseDate: "2023-06-10", value: 2500, status: "Available" },
  { id: 4, assetTag: "AST-004", name: "iPhone 15 Pro", category: "Mobile", assignedTo: "Mohammed Khan", purchaseDate: "2024-03-05", value: 4500, status: "In Use" },
  { id: 5, assetTag: "AST-005", name: "Ergonomic Chair", category: "Furniture", assignedTo: "Fatima Yusuf", purchaseDate: "2023-08-15", value: 1800, status: "Maintenance" },
  { id: 6, assetTag: "AST-006", name: "Projector Epson", category: "Equipment", assignedTo: "Meeting Room A", purchaseDate: "2022-11-20", value: 3200, status: "Retired" },
];

const stats = [
  { label: "Total Assets", value: "248", icon: Package, color: "text-primary" },
  { label: "In Use", value: "198", icon: Laptop, color: "text-emerald-600" },
  { label: "Under Maintenance", value: "12", icon: Wrench, color: "text-amber-600" },
  { label: "Asset Value", value: "AED 2.1M", icon: CheckCircle, color: "text-blue-600" },
];

export default function CompanyAssets() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assignTo, setAssignTo] = useState("");
  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "",
    assignedTo: "",
    purchaseDate: "",
    value: "",
  });

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.assetTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.category || !newAsset.value) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const asset: Asset = {
      id: assets.length + 1,
      assetTag: `AST-${String(assets.length + 1).padStart(3, "0")}`,
      name: newAsset.name,
      category: newAsset.category,
      assignedTo: newAsset.assignedTo || "Unassigned",
      purchaseDate: newAsset.purchaseDate || new Date().toISOString().split("T")[0],
      value: parseFloat(newAsset.value),
      status: newAsset.assignedTo ? "In Use" : "Available",
    };

    setAssets([asset, ...assets]);
    setNewAsset({ name: "", category: "", assignedTo: "", purchaseDate: "", value: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Asset Added",
      description: `${asset.name} (${asset.assetTag}) has been added to inventory.`,
    });
  };

  const handleView = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsViewDialogOpen(true);
  };

  const handleAssign = (asset: Asset) => {
    setSelectedAsset(asset);
    setAssignTo("");
    setIsAssignDialogOpen(true);
  };

  const handleAssignSubmit = () => {
    if (!selectedAsset || !assignTo) return;

    setAssets(assets.map((a) =>
      a.id === selectedAsset.id
        ? { ...a, assignedTo: assignTo, status: "In Use" }
        : a
    ));
    setIsAssignDialogOpen(false);
    toast({
      title: "Asset Assigned",
      description: `${selectedAsset.name} has been assigned to ${assignTo}.`,
    });
  };

  const handleMaintenance = (asset: Asset) => {
    setAssets(assets.map((a) =>
      a.id === asset.id ? { ...a, status: "Maintenance" } : a
    ));
    toast({
      title: "Sent for Maintenance",
      description: `${asset.name} has been marked for maintenance.`,
    });
  };

  const handleRetire = (asset: Asset) => {
    setAssets(assets.map((a) =>
      a.id === asset.id ? { ...a, status: "Retired", assignedTo: "N/A" } : a
    ));
    toast({
      title: "Asset Retired",
      description: `${asset.name} has been retired from inventory.`,
    });
  };

  const handleDelete = (asset: Asset) => {
    setAssets(assets.filter((a) => a.id !== asset.id));
    toast({
      title: "Asset Deleted",
      description: `${asset.name} has been removed from inventory.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Asset inventory report is being generated.",
    });
  };

  return (
    <MainLayout title="Company Assets" subtitle="Track and manage company assets and equipment">
      <div className="space-y-6">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Inventory
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
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
              <CardTitle>Asset Inventory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
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
                  <TableHead>Asset Tag</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Value (AED)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.assetTag}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.purchaseDate}</TableCell>
                    <TableCell>{asset.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          asset.status === "In Use"
                            ? "default"
                            : asset.status === "Available"
                            ? "secondary"
                            : asset.status === "Maintenance"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(asset)}>
                            View Details
                          </DropdownMenuItem>
                          {(asset.status === "Available" || asset.status === "In Use") && (
                            <DropdownMenuItem onClick={() => handleAssign(asset)}>
                              {asset.status === "In Use" ? "Reassign" : "Assign"}
                            </DropdownMenuItem>
                          )}
                          {asset.status !== "Maintenance" && asset.status !== "Retired" && (
                            <DropdownMenuItem onClick={() => handleMaintenance(asset)}>
                              Send for Maintenance
                            </DropdownMenuItem>
                          )}
                          {asset.status !== "Retired" && (
                            <DropdownMenuItem onClick={() => handleRetire(asset)}>
                              Retire Asset
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(asset)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Asset Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Add a new asset to the company inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input
                id="name"
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                placeholder="e.g., MacBook Pro 16 inch"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newAsset.category}
                onValueChange={(value) => setNewAsset({ ...newAsset, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Monitor">Monitor</SelectItem>
                  <SelectItem value="Mobile">Mobile Device</SelectItem>
                  <SelectItem value="Printer">Printer</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value (AED)</Label>
              <Input
                id="value"
                type="number"
                value={newAsset.value}
                onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
                placeholder="Enter asset value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={newAsset.purchaseDate}
                onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To (Optional)</Label>
              <Input
                id="assignedTo"
                value={newAsset.assignedTo}
                onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                placeholder="Employee name or location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAsset}>Add Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Asset Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>
              View complete asset information.
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Asset Tag</p>
                  <p className="font-medium">{selectedAsset.assetTag}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedAsset.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedAsset.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">AED {selectedAsset.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{selectedAsset.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Date</p>
                  <p className="font-medium">{selectedAsset.purchaseDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedAsset.status === "In Use"
                        ? "default"
                        : selectedAsset.status === "Available"
                        ? "secondary"
                        : selectedAsset.status === "Maintenance"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {selectedAsset.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Asset Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Asset</DialogTitle>
            <DialogDescription>
              {selectedAsset && `Assign ${selectedAsset.name} to an employee or location.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign To</Label>
              <Input
                id="assignTo"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                placeholder="Employee name or location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignSubmit}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
