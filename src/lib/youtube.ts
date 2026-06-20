export function youtubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "maxresdefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function youtubePreviewEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    showinfo: "0",
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
