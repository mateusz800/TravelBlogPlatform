import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store/index";
import RoutingComponent from "./RoutingComponent";


const App = () => {
  return (
    <Provider store={store}>
      <RoutingComponent />
    </Provider>
  );
};

export default App;

const container = document.querySelector("#app");
ReactDOM.render(<App />, container);
