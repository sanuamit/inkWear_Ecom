// src/pages/DesignUploader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";

const DesignUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    // simple client-side validation
    if (!selected.type.startsWith("image/")) {
      setMessage("Please select an image file (png, jpg, svg, etc.).");
      return;
    }
    if (selected.size > 8 * 1024 * 1024) {
      setMessage("Image is too large. Max size is 8MB.");
      return;
    }
    setMessage(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setMessage(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please choose a design image to upload.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("design", file);
      formData.append("title", title);
      formData.append("notes", notes);

      // endpoint: adjust if your backend uses a different path
      const res = await api.post("/upload/design", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // success behaviour: navigate, show id, or clear form
      setMessage("Design uploaded successfully.");
      setFile(null);
      setPreview(null);
      setTitle("");
      setNotes("");

      // Optional: navigate to the uploaded design page if backend returned id/url
      if (res?.data?.designId) {
        navigate(`/designs/${res.data.designId}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to upload design. Try again.";
      setMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {isUploading && <Loader fullScreen />}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Your Design</h1>

        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-lg shadow space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Design Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-600"
            />
            <p className="text-xs text-gray-400 mt-1">
              Supported: PNG, JPG, SVG. Max 8MB.
            </p>
          </div>

          {preview && (
            <div className="flex items-start gap-4">
              <div className="w-40 h-40 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <label className="block text-sm font-medium">Title (optional)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 'Floral Sleeve Design'"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any instructions for printing (colors, placement...)"
                    className="w-full border rounded px-3 py-2 min-h-[80px] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Upload Design
                  </button>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {!preview && (
            <div className="text-sm text-gray-500">
              Choose an image to preview and add optional title/notes before uploading.
            </div>
          )}

          {message && (
            <div
              className={`text-sm p-2 rounded ${
                message.toLowerCase().includes("success")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DesignUploader;
