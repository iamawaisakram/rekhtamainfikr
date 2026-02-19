/**
 * Extract Google Drive file ID from embed or sharing URL.
 * Embed: https://drive.google.com/file/d/FILE_ID/preview
 * Export: https://drive.google.com/uc?export=download&id=FILE_ID
 */
export function getDriveFileId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Get direct download URL for a Google Drive file.
 * Use with "Anyone with the link" sharing.
 */
export function getDriveDownloadUrl(urlOrId: string): string {
  const id = urlOrId.includes("drive.google.com") ? getDriveFileId(urlOrId) : urlOrId;
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : urlOrId;
}
