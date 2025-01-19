import { Video } from "@/types";

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch("/mock/videos.json"); 
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  const data: Video[] = await response.json();
  return data;
};
