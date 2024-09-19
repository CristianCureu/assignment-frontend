import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";
import { UserProvider } from "./contexts/UserProvider";
import { router } from "./routes/router";

const queryClient = new QueryClient({});

ReactDOM.createRoot(
  document.getElementById("root") || document.createElement("div")
).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
