import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleListContainer from "./ArticleList/ArticleListContainer";
import ArticleDetailContainer from "./ArticleDetail/ArticleDetailContainer";
import ProfileDetailsContainer from "./ProfileDetails/ProfileDetailsContainer";

const RoutingComponent = () => (

    <Switch>
      <Route
        exact
        path="/stories/page/:page"
        component={routeProps => <ArticleListContainer {...routeProps} />}
      />
      <Route
        exact
        path="/stories/search/:keywords/page/:page"
        component={routeProps => <ArticleListContainer {...routeProps} />}
      />
      <Route exact path="/stories" component={ArticleListContainer} />
      <Route
        exact
        path="/story/:pk"
        component={routeProps => <ArticleDetailContainer {...routeProps} />}
      />
      <Route
        exact
        path="/profile/:pk"
        component={routeProps => <ProfileDetailsContainer {...routeProps} />}
      />
    </Switch>
);

export default RoutingComponent;
