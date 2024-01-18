import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from "./App.tsx";
import("flowbite");
import 'regenerator-runtime'
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { ThemeProvider } from "@mui/material/styles";
// import { CssBaseline, StyledEngineProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// export const theme = () => {
//   const themes = createTheme();
//   return themes;
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);
