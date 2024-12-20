import ReactDOM from "react-dom/client";
import "@/styles/global.scss";

import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<App />);
