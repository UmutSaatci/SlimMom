const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    const networkError = new Error(
      "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.",
    );

    networkError.cause = error;
    throw networkError;
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Yanıt boş veya geçerli JSON değilse data null kalır.
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || `Request failed with status ${response.status}.`,
    );

    error.status = response.status;
    throw error;
  }

  return data;
};
