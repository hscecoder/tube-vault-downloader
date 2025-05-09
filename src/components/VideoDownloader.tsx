
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoInfo, VideoStatus } from "../types";
import { getVideoInfo, downloadVideo, validateYouTubeUrl } from "../services/youtubeService";
import VideoCard from "./VideoCard";
import { toast } from "sonner";

const VideoDownloader: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<VideoStatus>(VideoStatus.INITIAL);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    if (!validateYouTubeUrl(url)) {
      toast.error("Invalid YouTube URL");
      return;
    }

    try {
      setStatus(VideoStatus.LOADING);
      const info = await getVideoInfo(url);
      setVideoInfo(info);
      setStatus(VideoStatus.SUCCESS);
    } catch (error) {
      setStatus(VideoStatus.ERROR);
      toast.error("Failed to fetch video information");
      console.error("Error fetching video info:", error);
    }
  };

  const handleDownload = async (formatId: string) => {
    if (!videoInfo) return;

    try {
      await downloadVideo(videoInfo.id, formatId);
    } catch (error) {
      toast.error("Download failed");
      console.error("Error downloading video:", error);
    }
  };

  const isLoading = status === VideoStatus.LOADING;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">YouTube Video Downloader</h1>
        <p className="text-muted-foreground">
          Download high-quality videos from YouTube
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={handleUrlChange}
            className="flex-1 yt-url-input"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="bg-youtube hover:bg-youtube-dark"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 mr-2 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                Loading...
              </>
            ) : (
              "Get Video"
            )}
          </Button>
        </div>
      </form>

      {status === VideoStatus.SUCCESS && videoInfo && (
        <VideoCard
          videoInfo={videoInfo}
          onDownload={handleDownload}
        />
      )}

      <div className="text-center text-xs text-muted-foreground pt-8">
        <p>
          This is a demo application. In a production environment, video downloads
          would be processed through a secure backend service.
        </p>
      </div>
    </div>
  );
};

export default VideoDownloader;
