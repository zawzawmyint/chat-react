import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL = import.meta.env.VITE_API_BASE_UR;

export const socket = io(URL, {
  autoConnect: false,
});
