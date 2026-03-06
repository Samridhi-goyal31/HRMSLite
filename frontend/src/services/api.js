// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Wraps response to standard format: returns { ok, message, data }
const unwrap = (res) => {
  // backend returns { status, message, data }
  console.log(res);
  
  if (res && res.data && typeof res.data.status !== "undefined") {
    return { ok: !!res.data.status, message: res.data.message, data: res.data.data };
  }
  // fallback
  return { ok: true, message: "", data: res.data };
};

export default {
  get: async (url, cfg) => {
    const res = await api.get(url, cfg);
    return unwrap(res);
  },
  post: async (url, body, cfg) => {
  try {
    const res = await api.post(url, body, cfg);
    return unwrap(res);
  } catch (error) {
    if (error.response) {
      return unwrap(error.response);
    }

    return {
      ok: false,
      message: "Network error",
      data: null,
    };
  }
},
  put: async (url, body, cfg) => {
  try {
    const res = await api.put(url, body, cfg);
    return unwrap(res);
  } catch (error) {
    if (error.response) {
      return unwrap(error.response);
    }

    return {
      ok: false,
      message: "Network error",
      data: null,
    };
  }
},
  patch: async (url, body, cfg) => {
    const res = await api.patch(url, body, cfg);
    return unwrap(res);
  },
  delete: async (url, cfg) => {
    const res = await api.delete(url, cfg);
    return unwrap(res);
  },
};