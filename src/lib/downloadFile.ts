export function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function triggerFileDownload(url: string, filename: string) {
  const response = await fetch(url, { credentials: "same-origin" });
  if (!response.ok) {
    throw new Error("Could not download file. Please try again.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}
