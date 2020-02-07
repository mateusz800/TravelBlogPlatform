import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store/index";
import ArticleListContainer from "./ArticleListContainer";

const App = () => {
  return (
    <Provider store={store}>
      <ArticleListContainer />
    </Provider>
  );
};

export default App;

const container = document.querySelector("#app");
ReactDOM.render(<App />, container);
