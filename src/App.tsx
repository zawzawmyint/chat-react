import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NoMatch from "./components/global/NoMatch";
import { Toaster } from "./components/ui/toaster";

const Layout = React.lazy(() => import("./components/global/layouts/Layout"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Chat = React.lazy(() => import("./pages/chat/Chat"));
const Login = React.lazy(() => import("./pages/login/Login"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/chat"
            element={
              <React.Suspense fallback={<>...</>}>
                <Chat />
              </React.Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
