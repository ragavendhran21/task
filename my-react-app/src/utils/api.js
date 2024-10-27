
const API_BASE_URL = "https://assignment.stage.crafto.app";

export const loginUser = async (username, otp) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, otp }),
  });
  return response.json();
};

export const fetchQuotes = async (token, limit = 20, offset = 0) => {
  const response = await fetch(`${API_BASE_URL}/getQuotes?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

export const uploadMedia = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://crafto.app/crafto/v1.0/media/assignment/upload", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  return response.json();
};

export const createQuote = async (text, mediaUrl, token) => {
  const response = await fetch(`${API_BASE_URL}/postQuote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ text, mediaUrl }),
  });
  return response.json();
};
