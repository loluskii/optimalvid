export const getLikedVideos = (): string[] => {
    const likedVideos = localStorage.getItem("likedVideos");
    return likedVideos ? JSON.parse(likedVideos) : [];
  };
  
  export const saveLikedVideos = (videoIds: string[]): void => {
    localStorage.setItem("likedVideos", JSON.stringify(videoIds));
  };
  
  export const toggleLikeVideo = (videoId: string): boolean => {
    const likedVideos = getLikedVideos();
    const isLiked = likedVideos.includes(videoId);
  
    if (isLiked) {
      const updatedLikes = likedVideos.filter((id) => id !== videoId);
      saveLikedVideos(updatedLikes);
      return false;
    } else {
      likedVideos.push(videoId);
      saveLikedVideos(likedVideos);
      return true;
    }
  };
  