import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { apiKey, setApiKey, hasApiKey } = useApiKey();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Text Generator", path: "/text-generator" },
    { name: "Image Analyzer", path: "/image-analyzer" },
    { name: "AI Chat", path: "/chat" },
    { name: "Templates", path: "/templates" },
  ];

  return (
    <nav className="sticky top-0 z-50 prime-card rounded-lg">
      <div className="prime-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold prime-gradient-text">
              AI Studio Verse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === item.path
                    ? "text-blue-400"
                    : "text-white"
                }`}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section - API Key & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop API Key Section */}
            <div className="hidden md:block">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      hasApiKey
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}>
                    <Key className="h-4 w-4" />
                    <span className="text-sm">
                      {hasApiKey
                        ? "API Key Set"
                        : "Set Gemini 2.5 flash API Key"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-80 bg-slate-800 border-white/20 shadow-xl">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Gemini API Key
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your Gemini API key"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    />
                    <p className="text-xs text-white/60">
                      This key will be used across all AI features (Use Gemini
                      2.5 Flash)
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mobile API Key Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                      hasApiKey
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}>
                    <Key className="h-4 w-4" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-slate-800 border-white/20">
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/80">
                        Gemini API Key
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your Gemini API key"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50"
                      />
                      <p className="text-xs text-white/60">
                        This key will be used across all AI features (Use Gemini
                        2.5 Flash)
                      </p>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="space-y-2">
                        {navItems.map(item => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors hover:text-blue-400 hover:bg-white/5 ${
                              location.pathname === item.path
                                ? "text-blue-400 bg-blue-400/10"
                                : "text-white"
                            }`}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile menu button (hamburger) - only for navigation when API key sheet is not open */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-400 transition-colors">
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (fallback) */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 mt-4">
            <div className="py-4 space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 text-base font-medium transition-colors hover:text-blue-400 ${
                    location.pathname === item.path
                      ? "text-blue-400"
                      : "text-white"
                  }`}
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
