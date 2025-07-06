import { ArrowRight, Sparkles, Brain, Zap, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="prime-hero-section relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 right-10 w-64 h-64 opacity-20 rounded-2xl overflow-hidden transform rotate-12">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=400"
            alt="AI Technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-20 left-10 w-48 h-48 opacity-15 rounded-2xl overflow-hidden transform -rotate-6">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=300"
            alt="Programming"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 opacity-10 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&h=200"
            alt="Matrix Code"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="prime-container relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 prime-card rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-white/80">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="prime-heading-xl text-white mb-6">
              <span className="prime-gradient-text">AI Studio Verse</span>
              <br />
              <span className="text-white">Create. Analyze. Chat.</span>
            </h1>

            <p className="prime-text-lg mb-10 max-w-4xl mx-auto">
              Experience the future of content creation with our AI-powered
              platform. Generate stunning content, analyze images with
              precision, and engage in intelligent conversations.
            </p>
          </div>

          {/* Hero Image Section */}
          <div className="mb-12 relative">
            <div className="max-w-4xl mx-auto relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=600"
                  alt="AI Workspace"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-lg font-medium">
                    Transform your ideas into reality with AI-powered tools
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/text-generator">
              <button className="prime-button flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link to="/chat">
              <button className="prime-button-secondary">Try AI Chat</button>
            </Link>
          </div>

          <div className="prime-grid">
            <div className="prime-card p-8 rounded-xl hover:prime-card-hover transition-all duration-300 group">
              <div className="mb-6 relative">
                <Brain className="h-16 w-16 text-blue-400 mx-auto group-hover:animate-pulse-glow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=50&h=50"
                    alt="Writing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="prime-heading-md text-white mb-4">
                Smart Text Generation
              </h3>
              <p className="prime-text-base">
                Generate articles, stories, and creative content with advanced
                AI technology
              </p>
            </div>

            <div className="prime-card p-8 rounded-xl hover:prime-card-hover transition-all duration-300 group">
              <div className="mb-6 relative">
                <Zap className="h-16 w-16 text-cyan-400 mx-auto group-hover:animate-pulse-glow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=50&h=50"
                    alt="Analysis"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="prime-heading-md text-white mb-4">
                Image Analysis
              </h3>
              <p className="prime-text-base">
                Upload and analyze images with detailed AI-powered insights and
                recognition
              </p>
            </div>

            <div className="prime-card p-8 rounded-xl hover:prime-card-hover transition-all duration-300 group">
              <div className="mb-6 relative">
                <Sparkles className="h-16 w-16 text-blue-300 mx-auto group-hover:animate-pulse-glow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=50&h=50"
                    alt="Chat"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="prime-heading-md text-white mb-4">
                Interactive Chat
              </h3>
              <p className="prime-text-base">
                Engage in natural conversations with our advanced AI assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
