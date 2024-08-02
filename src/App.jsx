import ReactDOM from "react-dom/client";
import "./styles/App.css"
import React from "react";
import { Suspense } from "react";
import Loading from "./components/Loading.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppRouter = React.lazy(() => import('./routes/router'));

const queryClient = new QueryClient();

export default function App() {

  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
          <AppRouter />
      </QueryClientProvider>
    </Suspense>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);