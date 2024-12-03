import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./lib/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter
				future={{
					v7_relativeSplatPath: true,
					v7_startTransition: true,
				}}
		>
			{/* <StrictMode> */}
				<App />
			{/* </StrictMode> */}
		</BrowserRouter>
	</Provider>,
);
