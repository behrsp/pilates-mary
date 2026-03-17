import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export async function uploadToCloudinary(file: File, folder: string = 'pilates-personalizado') {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', // Detects if it is image or video
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as any);
      }
    );

    uploadStream.end(buffer);
  });
}

export default cloudinary;
