import ReactDOM from "react-dom/client";
import "./styles/App.css"
import "./styles/Fonts.css"
import React from "react";
// import AppRouter from "./routes/router";

const AppRouter = React.lazy(() => import('./routes/router'));

export default function App() {
  return (
    <AppRouter />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);