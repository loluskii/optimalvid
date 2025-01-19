import Image from "next/image";

import { VideoCard } from "@/components/VideoCard";
import { useVideos } from "@/hooks/useVideos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { Video, genres } from "@/types";

const VIDEOS_PER_PAGE = 8;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [page, setPage] = useState(1);
  const { videos, loading } = useVideos(searchTerm);

  const filteredVideos = videos.filter((video:Video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const displayedVideos = filteredVideos.slice(0, page * VIDEOS_PER_PAGE);
  const hasMore = displayedVideos.length < filteredVideos.length;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search videos..."
            className="max-w-md mx-auto mb-4"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 justify-center overflow-x-auto pb-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className="whitespace-nowrap"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedVideos.map((video: Video) => (
            <Link key={video.id} href={`/video/${video.id}`}>
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <Button onClick={() => setPage(p => p + 1)}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};