import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Video } from "@/types";
import { fetchVideos } from "@/utils/fetchVideos";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toggleLikeVideo, getLikedVideos } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";


const VideoDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return; // Wait for the `id` to be available from the router

    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const videos = await fetchVideos(); // Fetch all videos
        const foundVideo = videos.find((v) => v.id === id) || null;
        setVideo(foundVideo);
        if (foundVideo) {
          const likedVideos = getLikedVideos();
          setLiked(likedVideos.includes(foundVideo.id));
        } else {
          setError("Video not found!");
        }
      } catch (err) {
        console.error("Error fetching video details:", err);
        setError("Failed to fetch video details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleLike = () => {
    if (video) {
      const newLikedState = toggleLikeVideo(video.id);
      setLiked(newLikedState);
    }
  };

  if (loading) {
    return (
      <div className="pt-8 max-w-6xl mx-auto p-4">
        <Skeleton className="aspect-video w-full rounded-xl mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return (
      <div className="pt-8 max-w-6xl mx-auto p-4">
        <Alert className="max-w-xl mx-auto">
          <AlertTitle>Video Not Found</AlertTitle>
          <AlertDescription>
            Sorry, we couldn't find the video you're looking for. It may have
            been removed or the URL might be incorrect.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="relative aspect-video mb-4">
        <video controls className="w-full h-full object-cover rounded-xl">
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <span>{video.author}</span> • <span>{video.views} views</span> •{" "}
              <span>{video.uploadTime}</span>
            </div>
          </div>
          <Button
            onClick={handleLike}
            variant={liked ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-xl">
          <p className="text-gray-700">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
