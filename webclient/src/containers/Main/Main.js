import React, { Component, Fragment } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import Board from "../Board/Board";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import * as actionTypes from "../../store/actions/actionTypes";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

class Main extends Component {
  render() {
    return (
      <Fragment>
        {/* Sidebar */}
        <Sidebar logout={this.props.logout} />
        {/* Routes */}
        <div className="Container">
          <Switch>
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
                  <button onClick={this.props.pomodoroCompleted}>
                    Completed
                  </button>
                  <button onClick={this.props.getPomodoros}>Get</button>
                  <button onClick={this.props.endPomodoro}>5 SECS</button>
                </Fragment>
              )}
            />
            <Route path="/board" component={Board} />
            <Route path="/todo" component={() => <h1>todo</h1>} />
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
  startTimer: intervalId =>
    dispatch({ type: actionTypes.START_TIMER, intervalId }),
  stopTimer: () => dispatch({ type: actionTypes.STOP_TIMER }),
  logout: () => dispatch(actions.logoutHandler()),
  pomodoroCompleted: isPomodoro =>
    dispatch(actions.pomodoroCompleted(isPomodoro)),
  getPomodoros: () => dispatch(actions.getPomodoros()),
  startPomodoro: () => dispatch(actions.startPomodoro()),
  endPomodoro: () => dispatch({ type: "TEST" })
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
