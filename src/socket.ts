import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://chat-express-pyh4.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
