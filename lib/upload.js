import { apiFetch } from "@/lib/api";

/**
 * Upload an image file to the Express /upload/image endpoint,
 * which proxies it to Cloudinary (provider credentials stay on the server).
 */
export async function uploadImage(file) {
  if (!file) throw new Error("Choose an image first");
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5 MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  const result = await apiFetch("/upload/image", {
    method: "POST",
    body: formData,
  });

  return result.url;
}
