// src/hooks/useVideos.ts
import { useState, useEffect } from "react";
import { fetchVideos } from "@/utils/fetchVideos";
import { Video } from "@/types";

export const useVideos = (searchTerm: string = "") => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const allVideos = await fetchVideos();
        const filteredVideos = allVideos.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [searchTerm]);

  return { videos, loading };
};
