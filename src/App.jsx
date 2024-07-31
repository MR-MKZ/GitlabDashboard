import ReactDOM from "react-dom/client";
import "./assets/css/App.css"
import "./assets/css/Fonts.css"
import AppRouter from "./routes/router";

export default function App() {
  return (
    <AppRouter />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);