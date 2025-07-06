import { useState } from "react";
import { FileText, Copy, Download, Sparkles, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useApiKey } from "@/contexts/ApiKeyContext";

const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState("article");
  const { toast } = useToast();
  const { apiKey, hasApiKey } = useApiKey();

  const contentTypes = [
    { value: "article", label: "Article" },
    { value: "story", label: "Creative Story" },
    { value: "email", label: "Email" },
    { value: "social", label: "Social Media Post" },
    { value: "blog", label: "Blog Post" },
    { value: "product", label: "Product Description" },
  ];

  const generateText = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key in the navbar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Create a ${contentType} about: ${prompt}`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const text =
        data.candidates[0]?.content?.parts[0]?.text || "No content generated";
      setGeneratedText(text);

      toast({
        title: "Success!",
        description: "Content generated successfully",
      });
    } catch (error) {
      console.error("Error generating text:", error);
      toast({
        title: "Error",
        description:
          "Failed to generate content. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `generated-${contentType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Text Generator
        </h1>
        <p className="text-white/80 text-lg">
          Generate compelling content with the power of Gemini AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-400" />
              Content Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content Type
                </label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className=" border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your Prompt
                </label>
                <Textarea
                  placeholder="Describe what you want to create..."
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[120px]"
                />
              </div>

              <Button
                onClick={generateText}
                disabled={isLoading || !hasApiKey}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50">
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                Generated Content
              </h2>

              {generatedText && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-white/30 text-white hover:bg-white/10">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadText}
                    className="border-white/30 text-white hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="min-h-[400px] bg-white/5 rounded-lg p-4 border border-white/20">
              {generatedText ? (
                <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {generatedText}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated content will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;
