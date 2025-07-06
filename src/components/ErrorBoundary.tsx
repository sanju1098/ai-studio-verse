import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="glass-card p-12 rounded-3xl">
              <div className="mb-8">
                <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-6 animate-pulse-glow" />
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Something Went Wrong
                </h1>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  We encountered an unexpected error. Don't worry, our team has
                  been notified and is working on a fix.
                </p>
              </div>

              {this.state.error && (
                <div className="glass-card p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                  <p className="text-sm text-red-300 font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleRetry}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <RefreshCcw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
