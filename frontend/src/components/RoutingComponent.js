import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticleListContainer from "./StoryList/StoryListContainer";
import ArticleDetailContainer from "./StoryDetail/StoryDetailContainer";
import ProfileDetailsContainer from "./ProfileDetails/ProfileDetailsContainer";
import ArticleEditor from "./StoryEditor/StoryEditor";

const RoutingComponent = () => (

    <Switch>
      <Route exact path="/stories/new" component={ArticleEditor}/>
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
        path="/story/:pk/edit"
        component={routeProps => <ArticleEditor {...routeProps} />}
      />
      <Route
        exact
        path="/profile/:pk"
        component={routeProps => <ProfileDetailsContainer {...routeProps} />}
      />
    </Switch>
);

export default RoutingComponent;
