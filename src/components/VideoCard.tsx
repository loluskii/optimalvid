import { CheckCircle2 } from "lucide-react";
import { Video } from "@/types";

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="flex flex-col gap-2 group w-full mx-auto">
      <div className="relative h-44">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-sm line-clamp-2">
            {video.title}
          </h3>
          <div className="text-sm text-gray-500">
            {video.uploadTime}
          </div>
        </div>
      </div>
    </div>
  );
};
