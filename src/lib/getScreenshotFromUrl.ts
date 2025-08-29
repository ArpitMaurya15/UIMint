// Utility to get screenshot from a URL using the thum.io API (free, no key required for basic usage)
export async function getScreenshotFromUrl(url: string): Promise<string> {
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL');
  }
  // thum.io API for website screenshots
  // Docs: https://www.thum.io/documentation
  const apiUrl = `https://image.thum.io/get/fullpage/${encodeURIComponent(url)}`;
  // Fetch the image as a blob and convert to data URL
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Failed to fetch screenshot');
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
