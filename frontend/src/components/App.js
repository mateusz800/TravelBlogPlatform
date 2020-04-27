import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import store from "../store/index";
import RoutingComponent from "./RoutingComponent";
import Header from "./Header/Header";
import Footer from "./Footer";

const App = () => {
  /** to do
   * change suspense fallback component (loading )
   */
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <RoutingComponent />
          </Suspense>
          <Footer />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};

export default App;

const container = document.querySelector("#app");
ReactDOM.render(<App />, container);
