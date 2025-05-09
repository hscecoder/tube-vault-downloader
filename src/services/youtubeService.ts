
import { VideoInfo, VideoFormat } from "../types";
import { toast } from "sonner";

// YouTube URL regex pattern
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

// Mock YouTube video formats (in a real app, these would come from an API)
const mockVideoFormats: VideoFormat[] = [
  {
    formatId: "137",
    quality: "1080p",
    resolution: "1920x1080",
    fps: 30,
    url: "#",
  },
  {
    formatId: "136",
    quality: "720p",
    resolution: "1280x720",
    fps: 30,
    url: "#",
  },
  {
    formatId: "135",
    quality: "480p",
    resolution: "854x480",
    fps: 30,
    url: "#",
  },
  {
    formatId: "134",
    quality: "360p",
    resolution: "640x360",
    fps: 30,
    url: "#",
  },
];

// Simple function to extract video ID from YouTube URL
const extractVideoId = (url: string): string | null => {
  // Match for standard YouTube URLs
  const standardMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (standardMatch && standardMatch[1]) {
    return standardMatch[1];
  }
  return null;
};

// Validate YouTube URL
export const validateYouTubeUrl = (url: string): boolean => {
  return YOUTUBE_URL_REGEX.test(url) && !!extractVideoId(url);
};

// Mock function to get video info (in real app this would call a backend API)
export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
  // Validate URL
  if (!validateYouTubeUrl(url)) {
    toast.error("Invalid YouTube URL");
    throw new Error("Invalid YouTube URL");
  }

  // Extract video ID
  const videoId = extractVideoId(url);
  if (!videoId) {
    toast.error("Could not extract video ID");
    throw new Error("Could not extract video ID");
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response with video details
  // In a real app, this would come from the API
  const mockVideoInfo: VideoInfo = {
    id: videoId,
    title: "Sample YouTube Video Title - High Quality Content",
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    duration: "10:30",
    author: "Content Creator",
    formats: mockVideoFormats,
  };

  return mockVideoInfo;
};

// Mock function to download a video (in a real app, this would be handled by the backend)
export const downloadVideo = async (
  videoId: string,
  formatId: string
): Promise<void> => {
  // Simulate API delay
  toast.info(`Starting download for format: ${formatId}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real app, this would trigger a download instead of displaying a message
  toast.success("Download started! Check your downloads folder.");

  // In a real implementation, we'd redirect to a backend endpoint:
  // window.location.href = `/api/download?videoId=${videoId}&formatId=${formatId}`;
};
