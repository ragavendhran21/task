
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://assignment.stage.crafto.app";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getQuotes?limit=20&offset=${page}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        
        const data = await response.json();
        const newQuotes = Array.isArray(data) ? data : [];
        setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, [page, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Quotes</h1>
      <div className="grid gap-4 w-full max-w-2xl p-4">
        {quotes.map((quote, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <img src={quote.mediaUrl} alt="quote" className="w-full h-64 object-cover rounded" />
            <p className="mt-4 text-lg">{quote.text}</p>
            <span className="block text-gray-600 mt-2">{quote.username}</span>
            <span className="block text-gray-500">{quote.created_at}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="mt-8 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Load More
      </button>
      <button
        onClick={() => navigate("/create-quote")}
        className="fixed bottom-8 right-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 shadow-lg"
      >
        + Create Quote
      </button>
    </div>
  );
};

export default QuoteList;
