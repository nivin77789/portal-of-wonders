import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Lust from "./pages/Lust";
import SpaDashboard from "./pages/SpaDashboard";
import ClientDetail from "./pages/ClientDetail";
import PlaceholderPage from "./pages/PlaceholderPage";
import Health from "./pages/Health";
import Family from "./pages/Family";
import Cravings from "./pages/Cravings";

import Happiness from "./pages/Happiness";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" iconName="BarChart3" />} />
            <Route path="/services" element={<PlaceholderPage title="Services" iconName="Briefcase" />} />
            <Route path="/happiness" element={<Happiness />} />
            <Route path="/lust" element={<Lust />} />
            <Route path="/craving" element={<Cravings />} />
            <Route path="/health" element={<Health />} />
            <Route path="/family" element={<Family />} />
            <Route path="/spa" element={<SpaDashboard />} />
            <Route path="/spa/:id" element={<ClientDetail />} />
            <Route path="/partners" element={<PlaceholderPage title="Partners" iconName="Heart" />} />
            <Route path="/colleagues" element={<PlaceholderPage title="Colleagues" iconName="UserCheck" />} />
            <Route path="/home-service" element={<PlaceholderPage title="Home Service" iconName="Home" />} />
            <Route path="/pub" element={<PlaceholderPage title="Pub" iconName="Wine" />} />
            <Route path="/hookedup" element={<PlaceholderPage title="Hooked Up" iconName="Flame" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
