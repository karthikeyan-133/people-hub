import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import LeaveManagement from "./pages/LeaveManagement";
import Attendance from "./pages/Attendance";
import Documents from "./pages/Documents";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import VisaDocuments from "./pages/VisaDocuments";
import DrivingLicence from "./pages/DrivingLicence";
import VehicleManagement from "./pages/VehicleManagement";
import BenefitsGratuity from "./pages/BenefitsGratuity";
import PayrollWPS from "./pages/PayrollWPS";
import Disciplinary from "./pages/Disciplinary";
import HealthInsurance from "./pages/HealthInsurance";
import ComplianceAudit from "./pages/ComplianceAudit";
import Performance from "./pages/Performance";
import CompanyExpenses from "./pages/CompanyExpenses";
import CompanyAssets from "./pages/CompanyAssets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/leave" element={<LeaveManagement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/visa-documents" element={<VisaDocuments />} />
          <Route path="/driving-licence" element={<DrivingLicence />} />
          <Route path="/vehicles" element={<VehicleManagement />} />
          <Route path="/expenses" element={<CompanyExpenses />} />
          <Route path="/assets" element={<CompanyAssets />} />
          <Route path="/benefits" element={<BenefitsGratuity />} />
          <Route path="/payroll-wps" element={<PayrollWPS />} />
          <Route path="/disciplinary" element={<Disciplinary />} />
          <Route path="/health-insurance" element={<HealthInsurance />} />
          <Route path="/compliance" element={<ComplianceAudit />} />
          <Route path="/performance" element={<Performance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
