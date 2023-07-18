import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET, 
});

export async function POST(req: Request) {
  const { path } = await req.json(); 
  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status : 400 }
    );
  }
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 753, crop: "scale" }],
    };
    
    const res = await cloudinary.uploader.upload(path, options);
    return NextResponse.json(res, { status : 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status : 500 });
  }
}