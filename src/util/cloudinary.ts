import crypto from "crypto";

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  uploadUrl: `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/upload`,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
};

export function generateSignedUrl(publicId: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateSignature(publicId, timestamp);

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/s--${signature}--/fl_attachment/${publicId}`;
}

function generateSignature(publicId: string, timestamp: number) {
  const str = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_CONFIG.apiSecret}`;
  const signature = crypto.createHash("sha1").update(str).digest("base64");
  return signature.replace(/\+/g, "-").replace(/\//g, "_");
}
