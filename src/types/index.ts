
export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: VideoFormat[];
  isLoading?: boolean;
  highestQuality?: string;
}

export interface VideoFormat {
  formatId: string;
  quality: string;
  resolution: string;
  fps: number;
  url: string;
}

export enum VideoStatus {
  INITIAL = 'initial',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
