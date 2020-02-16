import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleListContainer from "./ArticleList/ArticleListContainer";
import ArticleDetail from "./ArticleDetail/ArticleDetail";

const RoutingComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/blog" component={ArticleListContainer} />
      <Route
        path="/article/:pk"
        component={routeProps => <ArticleDetail {...routeProps} />}
      />
    </Switch>
  </BrowserRouter>
);

export default RoutingComponent;
