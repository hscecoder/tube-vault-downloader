
import React from "react";
import { VideoInfo, VideoFormat } from "../types";
import QualitySelector from "./QualitySelector";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  videoInfo: VideoInfo;
  isLoading?: boolean;
  onDownload: (formatId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoInfo,
  isLoading = false,
  onDownload,
}) => {
  const [selectedFormat, setSelectedFormat] = React.useState<string>(
    videoInfo.formats[0]?.formatId || ""
  );

  const handleDownload = () => {
    onDownload(selectedFormat);
  };

  return (
    <div
      className={cn(
        "video-card bg-secondary rounded-xl overflow-hidden shadow-lg",
        "border border-muted transition-all",
        isLoading && "opacity-75"
      )}
    >
      <div className="relative aspect-video w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        ) : null}
        <img
          src={videoInfo.thumbnail}
          alt={videoInfo.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if the maxresdefault thumbnail isn't available
            const target = e.target as HTMLImageElement;
            target.src = `https://i.ytimg.com/vi/${videoInfo.id}/hqdefault.jpg`;
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {videoInfo.duration}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold line-clamp-2">{videoInfo.title}</h3>
        <p className="text-sm text-muted-foreground">{videoInfo.author}</p>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <QualitySelector
            formats={videoInfo.formats}
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            disabled={isLoading}
          />

          <Button
            className="w-full md:w-auto"
            onClick={handleDownload}
            disabled={isLoading || !selectedFormat}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
