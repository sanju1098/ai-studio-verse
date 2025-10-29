import { useState } from "react";
import { Upload, Image as ImageIcon, Sparkles, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useApiKey } from "@/contexts/ApiKeyContext";
import Markdown from "react-markdown";

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { apiKey, hasApiKey } = useApiKey();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = reject;
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image first",
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
      const base64Image = await convertToBase64(selectedImage);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                    text: "Analyze this image in detail. Describe what you see, identify objects, people, colors, composition, and provide insights about the image.",
                  },
                  {
                    inline_data: {
                      mime_type: selectedImage.type,
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      const analysisText =
        data.candidates[0]?.content?.parts[0]?.text || "No analysis generated";
      setAnalysis(analysisText);

      toast({
        title: "Success!",
        description: "Image analyzed successfully",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Error",
        description:
          "Failed to analyze image. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setAnalysis("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Image Analyzer
        </h1>
        <p className="text-white/80 text-lg">
          Upload images and get detailed AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-purple-400" />
              Image Upload
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Select Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                    <Upload className="h-8 w-8 text-white/60 mb-2" />
                    <p className="text-white/60 text-sm">
                      Click to upload an image
                    </p>
                    <p className="text-white/40 text-xs">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              </div>

              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearImage}
                    className="absolute top-2 right-2 border-white/30 text-white hover:bg-white/10">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Button
                onClick={analyzeImage}
                disabled={isLoading || !selectedImage || !hasApiKey}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
              Analysis Results
            </h2>

            <div className="min-h-[400px] bg-white/5 rounded-lg p-4 border border-white/20">
              {analysis ? (
                <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  <Markdown>{analysis}</Markdown>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to see AI analysis</p>
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

export default ImageAnalyzer;
