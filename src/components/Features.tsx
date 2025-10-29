import {
  FileText,
  Image,
  MessageCircle,
  Layout,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import textGeneratorImage from "@/assets/textGenerator.jpg";
import imageAnalyzerImage from "@/assets/imageAnalyzer.jpg";
import chatAssistantImage from "@/assets/chatAssistant.jpg";
import templatesImage from "@/assets/templates.jpg";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "AI Text Generator",
      description:
        "Create compelling articles, stories, and content with our advanced AI text generation engine.",
      path: "/text-generator",
      color: "text-blue-400",
      image: textGeneratorImage,
    },
    {
      icon: Image,
      title: "Image Analyzer",
      description:
        "Upload images and get detailed AI-powered analysis, recognition, and insights instantly.",
      path: "/image-analyzer",
      color: "text-cyan-400",
      image: imageAnalyzerImage,
    },
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description:
        "Engage in natural, intelligent conversations with our advanced AI assistant.",
      path: "/chat",
      color: "text-blue-300",
      image: chatAssistantImage,
    },
    {
      icon: Layout,
      title: "Content Templates",
      description:
        "Access pre-built templates for various content types and professional use cases.",
      path: "/templates",
      color: "text-indigo-400",
      image: templatesImage,
    },
  ];

  return (
    <section className="prime-section bg-slate-800/50">
      <div className="prime-container">
        <div className="text-center mb-16">
          <h2 className="prime-heading-lg mb-6">
            <span className="prime-gradient-text">Powerful AI Features</span>
          </h2>
          <p className="prime-text-lg max-w-4xl mx-auto">
            Discover the complete suite of AI-powered tools designed to
            revolutionize your content creation workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((feature, index) => (
            <Link
              key={`${feature.title}-${index}`}
              to={feature.path}
              className="group block h-full">
              <div className="prime-card p-0 rounded-xl h-full flex flex-col transition-all duration-300 group-hover:prime-card-hover group-hover:transform group-hover:scale-105 overflow-hidden">
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  {/* <img
                    loading="lazy"
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  /> */}
                  <feature.icon
                    className={`h-full w-full ${feature.color} group-hover:animate-pulse-glow`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="prime-heading-md text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="prime-text-base mb-4 flex-1">
                    {feature.description}
                  </p>

                  <div>
                    <span className="text-blue-400 text-sm font-medium">
                      Explore Feature →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="prime-card p-12 rounded-2xl max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&h=400"
                alt="AI Technology Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <Sparkles className="h-20 w-20 text-blue-400 mx-auto mb-8" />
              <h3 className="prime-heading-lg text-white mb-6">
                Ready to Transform Your Content?
              </h3>
              <p className="prime-text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators and professionals who are already
                using AI to supercharge their productivity and creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/text-generator">
                  <button className="prime-button">Start Creating Now</button>
                </Link>
                <Link to="/templates">
                  <button className="prime-button-secondary">
                    Explore Templates
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
