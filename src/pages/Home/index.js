import React, { Component } from "react";
import { connect } from "react-redux";
import { homeAction } from "../../redux/actions/homeAction.js";
import ShowsList from "./ShowsList"
class Home extends Component {
  static initialAction() {
    return homeAction.fetchShowsList();
  }

  componentDidMount() {
    if (!this.props.showsList) {
      this.props.dispatch(Home.initialAction());
    }
  }

  render() {
    const { response } = this.props;
    return <ShowsList showsList={response.showsList} />;
  }
}

const mapStateToProps = state => ({
  response: state.homeReducer
});

export default connect(mapStateToProps)(Home);
