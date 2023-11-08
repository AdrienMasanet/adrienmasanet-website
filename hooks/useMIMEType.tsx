"use client";

import { useEffect, useState } from "react";

const useMIMEType = (mediaURI: string) => {
  const [mediaCategory, setMediaCategory] = useState<string>("other");
  const [mediaExtension, setMediaExtension] = useState<string>("other");

  useEffect(() => {
    if (!mediaURI) return;
    const extensionMatch = mediaURI.match(
      /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mp3|wav|flv|avi)$/
    );
    if (!extensionMatch) return;

    setMediaExtension(extensionMatch[0]);

    switch (mediaExtension) {
      case ".jpg":
      case ".jpeg":
      case ".png":
      case ".gif":
      case ".webp":
      case ".svg":
        setMediaCategory("image");
        break;
      case ".mp4":
      case ".webm":
      case ".flv":
      case ".avi":
        setMediaCategory("video");
        break;
      case ".mp3":
      case ".wav":
        setMediaCategory("audio");
        break;
    }
  }, [mediaURI, mediaExtension]);

  return { mediaCategory, mediaExtension };
};

export default useMIMEType;
