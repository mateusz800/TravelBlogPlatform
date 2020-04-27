import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store/index";
import RoutingComponent from "./RoutingComponent";
import Header from "./Header/Header";
import Footer from "./Footer";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <RoutingComponent />
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

const container = document.querySelector("#app");
ReactDOM.render(<App />, container);
