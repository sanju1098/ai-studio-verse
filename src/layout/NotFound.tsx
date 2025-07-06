import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="glass-card p-12 rounded-3xl">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold gradient-text mb-4 animate-pulse-glow">
              404
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full animate-shimmer"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>

          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital sunset. Don't worry though - let's get you back on track!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-white/5">
            <Search className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/text-generator"
                className="text-white/70 hover:text-orange-400 transition-colors">
                Text Generator
              </Link>
              <Link
                to="/image-analyzer"
                className="text-white/70 hover:text-orange-400 transition-colors">
                Image Analyzer
              </Link>
              <Link
                to="/chat"
                className="text-white/70 hover:text-orange-400 transition-colors">
                AI Chat
              </Link>
              <Link
                to="/templates"
                className="text-white/70 hover:text-orange-400 transition-colors">
                Templates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
