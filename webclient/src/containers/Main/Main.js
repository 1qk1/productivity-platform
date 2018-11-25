import React, { Component, Fragment } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import Board from "../Board/Board";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

class Main extends Component {
  // This is the main component
  // It contains the routes for each page
  render() {
    return (
      <Fragment>
        {/* Sidebar */}
        <Sidebar logout={this.props.logout} />
        {/* Routes */}
        <div className="Container">
          <Switch>
            {/* Pomodoro route */}
            <Route
              path="/"
              exact
              component={() => (
                <Fragment>
                  <Pomodoro
                    timer={this.props.timer}
                    intervalId={this.props.intervalId}
                    startPomodoro={this.props.startPomodoro}
                    stopPomodoro={this.props.stopTimer}
                    pomodoroCompleted={this.props.pomodoroCompleted}
                    isPomodoro={this.props.isPomodoro}
                  />
                  {/* helper buttons to test the pomodoro */}
                  {/* uncomment it if you need to test stuff */}
                  {/* {process.env.NODE_ENV === "development" && (
                    <Fragment>
                      <button onClick={this.props.pomodoroCompleted}>
                        Completed
                      </button>
                      <button onClick={this.props.getPomodoros}>Get</button>
                      <button onClick={this.props.endPomodoro}>5 SECS</button>
                    </Fragment>
                  )} */}
                </Fragment>
              )}
            />
            <Route path="/board" component={Board} />
            {/* placeholders for future features */}
            {/* <Route path="/todo" component={() => <h1>todo</h1>} /> */}
            {/* <Route path="/notes" component={() => <h1>notes</h1>} /> */}
            <Redirect to="/" />
          </Switch>
        </div>
        <ToastContainer autoClose={5000} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  timer: state.pomodoro.timer,
  intervalId: state.pomodoro.intervalId,
  isPomodoro: state.pomodoro.isPomodoro,
  userId: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  stopTimer: () => dispatch(actions.stopTimer()),
  logout: () => dispatch(actions.logoutHandler()),
  // function to run when a pomodoro got completed
  // takes if the clock was a pomodoro or a break as
  // an argument
  pomodoroCompleted: isPomodoro =>
    dispatch(actions.pomodoroCompleted(isPomodoro)),
  // get all the user's pomodoros from the server
  getPomodoros: () => dispatch(actions.getPomodoros()),
  startPomodoro: () => dispatch(actions.startPomodoro()),
  // helper function to put the timer to 5 seconds left
  endPomodoro: () => dispatch(actions.end5Seconds())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
