export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  likes?: number;
  uploadTime: string;
  views: string;
  author: string;
  subscriber: string;
}

export const genres = ["All", "Programming", "Music", "Gaming", "Education", "Entertainment"];