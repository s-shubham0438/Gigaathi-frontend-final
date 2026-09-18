import axios from 'axios';

/**
 * ImageKit Upload Service
 * Supports direct client-side upload or backend-signed upload.
 * If ImageKit endpoint is not configured, provides seamless fallback
 * to base64 Data URLs so the app always functions smoothly.
 */

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/gigsaathi';
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || '';
const IMAGEKIT_UPLOAD_ENDPOINT = 'https://upload.imagekit.io/api/v1/files/upload';

// Helper to compress and downscale images before sending to backend
const compressImage = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.7) => {
  return new Promise((resolve) => {
    // If already a URL string, return directly
    if (typeof file === 'string') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as compressed JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = () => resolve(null);
  });
};

export const uploadToImageKit = async (fileOrDataUrl, fileName = 'community_cleaning.jpg', tags = ['community-cleaning']) => {
  // If public key is provided, attempt direct or authenticated upload
  if (IMAGEKIT_PUBLIC_KEY) {
    try {
      const formData = new FormData();
      formData.append('file', fileOrDataUrl);
      formData.append('fileName', fileName);
      formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
      formData.append('tags', tags.join(','));

      const response = await axios.post(IMAGEKIT_UPLOAD_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.url) {
        return {
          url: response.data.url,
          fileId: response.data.fileId,
          thumbnailUrl: response.data.thumbnailUrl,
        };
      }
    } catch (err) {
      console.warn('ImageKit direct upload warning, falling back to data URL:', err);
    }
  }

  // If already an online external URL (http/https), return it directly
  if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('http')) {
    return {
      url: fileOrDataUrl,
      fileId: 'remote_' + Date.now(),
      thumbnailUrl: fileOrDataUrl,
    };
  }

  // Compress to lightweight downscaled JPEG (< 150-300kb)
  const compressed = await compressImage(fileOrDataUrl);

  return {
    url: compressed,
    fileId: 'compressed_' + Date.now(),
    thumbnailUrl: compressed,
  };
};

export default {
  uploadToImageKit,
  IMAGEKIT_URL_ENDPOINT,
};
