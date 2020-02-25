import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ArticleListContainer from "./StoryList/StoryListContainer";
import ArticleDetailContainer from "./StoryDetail/StoryDetailContainer";
import ProfileDetailsContainer from "./ProfileDetails/ProfileDetailsContainer";
import ArticleEditor from "./StoryEditor/StoryEditor";
import LoginPage from "./LoginPage/LoginPage";
import { checkIfAuthenticated } from "../actions/profileActions";
import { render } from "react-dom";

class RoutingComponent extends Component {
  componentDidMount() {
    this.props.login();
  }
  render() {
    const { is_authenticated } = this.props;
    return (
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
        <Route exact path="/story/new" component={ArticleEditor} />
        <Route
          exact
          path="/story/:pk"
          component={routeProps => <ArticleDetailContainer {...routeProps} />}
        />
        {is_authenticated && (
          <Route
            exact
            path="/story/:pk/edit"
            component={routeProps => <ArticleEditor {...routeProps} />}
          />
        )}
        {!is_authenticated && (
          <Fragment>
            <Route
              exact
              path="/login"
              component={() => <LoginPage login={true} />}
            />
            <Route
              exact
              path="/register"
              component={() => <LoginPage login={false} />}
            />
          </Fragment>
        )}
        <Route
          exact
          path="/profile/:pk"
          component={routeProps => <ProfileDetailsContainer {...routeProps} />}
        />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.profiles.is_authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(checkIfAuthenticated())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingComponent);
