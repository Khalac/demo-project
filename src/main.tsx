import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.tsx";
import AuthProvider from "./features/context/AuthContext.tsx";
import { Provider } from "react-redux";
import { store } from "./features/redux/store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
