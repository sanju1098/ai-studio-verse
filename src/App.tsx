import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import Navbar from "./layout/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TextGenerator from "./components/TextGenerator";
import ImageAnalyzer from "./components/ImageAnalyzer";
import ChatInterface from "./components/ChatInterface";
import Templates from "./components/Templates";
import NotFound from "./layout/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ApiKeyProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
              <div className="relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
                  <div
                    className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
                    style={{ animationDelay: "2s" }}
                  />
                </div>

                <Navbar />

                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <>
                            <Hero />
                            <Features />
                          </>
                        }
                      />
                      <Route
                        path="/text-generator"
                        element={<TextGenerator />}
                      />
                      <Route
                        path="/image-analyzer"
                        element={<ImageAnalyzer />}
                      />
                      <Route path="/chat" element={<ChatInterface />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </ApiKeyProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
