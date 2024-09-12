'use client';

import { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { toast, Toaster } from 'react-hot-toast';

const fileTypes = ["MOV", "MPEG-1", "MPEG-2", "MPEG4", "MP4", "MPG", "AVI", "WMV", "FLV", "WEBM"];

export default function UploadForm() {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
        tags: '',
    });

    const handleChange = (file: File) => {
        setVideoFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true)

        try {            
            const videoData = new FormData();
            if (videoFile) {
                videoData.append('videoFile', videoFile);
            } else {
                console.error("No video file selected");
                throw "No video file selected"
            }
            videoData.append('title', videoDetails.title);
            videoData.append('description', videoDetails.description);
            videoData.append('tags', videoDetails.tags);

            const response = await fetch('/api/youtube/upload', {
                method: 'POST',
                body: videoData,
            });

            const result = await response.json();
            if (result.success) {
                toast.success(`Video uploaded successfully: ${result.videoId}`);
                return <>Success</>
            } else {
                toast.error(`Video upload failed: ${result.error}`);
                throw result.error
            }
        } catch (error) {
            console.log(error)
            return <>Failure</>
        } finally {
            setUploading(false)
        }
    };

    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1>Upload to Youtube</h1>
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                required={true}
            />
            <input
                type="text"
                placeholder="Title"
                value={videoDetails.title}
                onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                className=""
            />
            <textarea
                placeholder="Description"
                value={videoDetails.description}
                onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={videoDetails.tags}
                onChange={(e) => setVideoDetails({ ...videoDetails, tags: e.target.value })}
            />
            <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
        </form>
    );
}
