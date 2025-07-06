import { Loader2, Sparkles } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="text-center">
        <div className="prime-card p-16 rounded-3xl max-w-md mx-auto">
          <div className="relative mb-8">
            <Loader2 className="h-20 w-20 text-blue-400 mx-auto animate-spin" />
            <Sparkles className="h-8 w-8 text-cyan-400 absolute -top-2 -right-2 animate-pulse" />
          </div>

          <h2 className="prime-heading-md text-white mb-6">
            Loading Your Experience...
          </h2>

          <p className="prime-text-base mb-8">
            Preparing the best AI tools for you
          </p>

          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full animate-shimmer"></div>
          </div>

          <p className="text-sm text-white/60">
            This usually takes just a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
