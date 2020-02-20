import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleListContainer from "./ArticleList/ArticleListContainer";
import ArticleDetailContainer from "./ArticleDetail/ArticleDetailContainer";

const RoutingComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact path="/blog/page/:page"
        component={routeProps => <ArticleListContainer {...routeProps} />}
      />
      <Route
        exact path="/blog/search/:keywords/page/:page"
        component={routeProps => <ArticleListContainer {...routeProps} />}
      />
      <Route path="/blog" component={ArticleListContainer}/>
      <Route
        path="/article/:pk"
        component={routeProps => <ArticleDetailContainer {...routeProps} />}
      />
    </Switch>
  </BrowserRouter>
);

export default RoutingComponent;
