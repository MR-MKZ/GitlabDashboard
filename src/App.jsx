import ReactDOM from "react-dom/client";
import "./styles/App.css"
import React from "react";
import { Suspense } from "react";
import Loading from "./components/Loading.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

const AppRouter = React.lazy(() => import('./routes/router'));

const queryClient = new QueryClient();

export default function App() {

  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition: Bounce
          />
      </QueryClientProvider>
    </Suspense>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);