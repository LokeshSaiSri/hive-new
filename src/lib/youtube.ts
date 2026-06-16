export function youtubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "maxresdefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
