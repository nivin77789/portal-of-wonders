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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<PlaceholderPage title="Chat" iconName="MessageCircle" />} />
            <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" iconName="BarChart3" />} />
            <Route path="/services" element={<PlaceholderPage title="Services" iconName="Briefcase" />} />
            <Route path="/happiness" element={<PlaceholderPage title="Happiness" iconName="Smile" />} />
            <Route path="/lust" element={<Lust />} />
            <Route path="/sad" element={<PlaceholderPage title="Sad" iconName="Frown" />} />
            <Route path="/craving" element={<PlaceholderPage title="Craving" iconName="UtensilsCrossed" />} />
            <Route path="/worried" element={<PlaceholderPage title="Worried" iconName="AlertTriangle" />} />
            <Route path="/pleasure" element={<PlaceholderPage title="Pleasure" iconName="Sparkles" />} />
            <Route path="/health" element={<PlaceholderPage title="Health" iconName="HeartPulse" />} />
            <Route path="/family" element={<PlaceholderPage title="Family" iconName="Users" />} />
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
