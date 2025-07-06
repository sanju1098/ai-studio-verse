import { useState } from "react";
import {
  FileText,
  Copy,
  Sparkles,
  Mail,
  Share2,
  ShoppingBag,
  Briefcase,
  Heart,
  Star,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const { toast } = useToast();

  const templates: Template[] = [
    {
      id: "1",
      title: "Blog Post Outline",
      description: "Create a structured outline for your blog post",
      prompt:
        "Create a detailed blog post outline about [TOPIC]. Include introduction, main points, subpoints, and conclusion with engaging headlines.",
      category: "Blog",
      icon: FileText,
      color: "text-blue-400",
    },
    {
      id: "2",
      title: "Email Marketing",
      description: "Craft compelling marketing emails",
      prompt:
        "Write a persuasive email marketing campaign for [PRODUCT/SERVICE]. Include subject line, compelling opening, benefits, and strong call-to-action.",
      category: "Marketing",
      icon: Mail,
      color: "text-cyan-400",
    },
    {
      id: "3",
      title: "Social Media Post",
      description: "Create engaging social media content",
      prompt:
        "Create an engaging social media post about [TOPIC]. Make it shareable, include relevant hashtags, and encourage interaction.",
      category: "Social Media",
      icon: Share2,
      color: "text-blue-300",
    },
    {
      id: "4",
      title: "Product Description",
      description: "Write compelling product descriptions",
      prompt:
        "Write a compelling product description for [PRODUCT]. Highlight key features, benefits, and why customers should buy it.",
      category: "E-commerce",
      icon: ShoppingBag,
      color: "text-indigo-400",
    },
    {
      id: "5",
      title: "Business Proposal",
      description: "Create professional business proposals",
      prompt:
        "Create a professional business proposal for [PROJECT/SERVICE]. Include executive summary, scope, timeline, and pricing.",
      category: "Business",
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      id: "6",
      title: "Personal Story",
      description: "Write engaging personal narratives",
      prompt:
        "Write a compelling personal story about [EXPERIENCE/TOPIC]. Make it relatable, emotional, and inspiring.",
      category: "Creative",
      icon: Heart,
      color: "text-pink-400",
    },
    {
      id: "7",
      title: "Product Review",
      description: "Create detailed product reviews",
      prompt:
        "Write a comprehensive product review for [PRODUCT]. Include pros, cons, features, and overall rating with recommendations.",
      category: "Review",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      id: "8",
      title: "Creative Story",
      description: "Generate imaginative short stories",
      prompt:
        "Write a creative short story about [THEME/CHARACTER]. Include interesting plot, character development, and engaging dialogue.",
      category: "Creative",
      icon: Sparkles,
      color: "text-purple-400",
    },
  ];

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied!",
      description: "Template prompt copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="prime-container py-8">
        <div className="text-center mb-12">
          <h1 className="prime-heading-lg text-white mb-6">
            <span className="prime-gradient-text">Content Templates</span>
          </h1>
          <p className="prime-text-lg">
            Professional templates for every content need
          </p>
        </div>

        {/* Templates Grid */}
        <div className="prime-grid mb-12">
          {templates.map(template => (
            <div
              key={template.id}
              className="prime-card p-8 rounded-xl hover:prime-card-hover transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedTemplate(template)}>
              <div className="flex items-center justify-between mb-6">
                <template.icon
                  className={`h-12 w-12 ${template.color} group-hover:animate-pulse-glow`}
                />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    copyPrompt(template.prompt);
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <h3 className="prime-heading-md text-white mb-3 group-hover:text-blue-300 transition-colors">
                {template.title}
              </h3>
              <p className="prime-text-base mb-6">{template.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-400 bg-blue-400/20 px-3 py-1 rounded-full font-medium">
                  {template.category}
                </span>
                <span className="text-blue-400 text-sm">Click to view →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="prime-card p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <selectedTemplate.icon
                    className={`h-12 w-12 ${selectedTemplate.color}`}
                  />
                  <div>
                    <h2 className="prime-heading-md text-white">
                      {selectedTemplate.title}
                    </h2>
                    <p className="text-blue-400 text-sm font-medium">
                      {selectedTemplate.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="prime-text-base mb-8">
                {selectedTemplate.description}
              </p>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">
                    Template Prompt:
                  </span>
                  <button
                    onClick={() => copyPrompt(selectedTemplate.prompt)}
                    className="prime-button-secondary flex items-center gap-2 text-sm py-2 px-4">
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {selectedTemplate.prompt}
                </p>
              </div>

              <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-8">
                <p className="text-blue-300 text-sm">
                  💡 <strong>Tip:</strong> Replace [BRACKETED TEXT] with your
                  specific details when using this template.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => copyPrompt(selectedTemplate.prompt)}
                  className="prime-button flex items-center gap-2 flex-1 justify-center">
                  <Copy className="h-4 w-4" />
                  Copy Template
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="prime-button-secondary px-8">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
