
import React, { useState } from "react";

const API_BASE_URL = "https://assignment.stage.crafto.app";

const QuoteCreation = () => {
  const [quoteText, setQuoteText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");


  const handleTextChange = (e) => {
    setQuoteText(e.target.value);
  };


  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
    
      const formData = new FormData();
      formData.append("file", imageFile);

      const imageUploadResponse = await fetch(`${API_BASE_URL}/crafto/v1.0/media/assignment/upload`, {
        method: "POST",
        body: formData,
      });

      const imageData = await imageUploadResponse.json();

    
      if (!imageData.mediaUrl) {
        throw new Error("Failed to upload image");
      }

      const mediaUrl = imageData.mediaUrl;

      const quoteResponse = await fetch(`${API_BASE_URL}/postQuote`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: quoteText,
          mediaUrl: mediaUrl,
        }),
      });

      if (!quoteResponse.ok) {
        throw new Error("Failed to create quote");
      }


      setQuoteText("");
      setImageFile(null);
      alert("Quote created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Create a New Quote</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Enter your quote:</label>
          <textarea
            value={quoteText}
            onChange={handleTextChange}
            className="w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter your quote here"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload an image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-4 text-white font-semibold rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Quote"}
        </button>
      </form>
    </div>
  );
};

export default QuoteCreation;
