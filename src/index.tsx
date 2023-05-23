import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/components/app/App";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import "@/assets/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "@/sw/init";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);
root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
