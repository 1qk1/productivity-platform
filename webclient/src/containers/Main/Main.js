import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import * as actionTypes from "../../store/actions/actionTypes";

class Main extends Component {
  startPomodoro = () => {
    const intervalId = setInterval(this.props.decTimer, 1000);
    console.log(intervalId);
    this.props.startTimer(intervalId);
  };

  render() {
    return (
      <BrowserRouter>
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
                  <Pomodoro
                    timer={this.props.timer}
                    intervalId={this.props.intervalId}
                    startPomodoro={this.startPomodoro}
                    stopPomodoro={this.props.stopTimer}
                  />
                )}
              />
              <Route path="/settings" component={() => <h1>settings</h1>} />
              <Route path="/todo" component={() => <h1>todo</h1>} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  timer: state.pomodoro.timer,
  intervalId: state.pomodoro.intervalId
});

const mapDispatchToProps = dispatch => ({
  startTimer: intervalId =>
    dispatch({ type: actionTypes.START_TIMER, intervalId }),
  stopTimer: () => dispatch({ type: actionTypes.STOP_TIMER }),
  decTimer: () => dispatch({ type: actionTypes.DEC_TIMER }),
  logout: () => dispatch(actions.logoutHandler())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
