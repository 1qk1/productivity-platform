import React, { Component } from "react";
import "./App.scss";
import Main from "./containers/Main/Main";
import Loader from "./components/UI/Loader/Loader";

class App extends Component {
  state = {
    // logged in value for when the backend is built
    loggedIn: null
  };

  componentDidMount() {
    // simulate auth load
    setTimeout(() => {
      this.setState({ loggedIn: true });
    }, 2000);
  }

  render() {
    let content = <Loader />;
    const { loggedIn } = this.state;

    if (loggedIn === true) {
      // show main app when you are logged in
      content = <Main />;
    } else if (loggedIn === false) {
      // check if not logged in then
      // show the website
      content = <h1>you are not logged in</h1>;
    }

    return content;
  }
}

export default App;
