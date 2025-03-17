import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import IsLogined from "./context/IsLogined.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_KEY,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IsLogined>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </IsLogined>
  </StrictMode>
);
