import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import { CareJourney } from "./components/pages/CareJourney/CareJourney";
import { AddOnServices } from "./components/pages/AddOnServices/AddOnServices";
import { Settings } from "./components/pages/Settings/Settings";

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/care-journey" element={<CareJourney />} />
            <Route path="/add-on-services" element={<AddOnServices />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
