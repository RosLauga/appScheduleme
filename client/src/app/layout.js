"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createContext } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  const Context = createContext();
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </LocalizationProvider>
    </Provider>
  );
}
