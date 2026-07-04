import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store";
import { ThemeProvider } from "../theme/ThemeProvider";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;