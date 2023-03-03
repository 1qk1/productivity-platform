import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withRouter from '../../shared/withRouter';
import PropTypes from "prop-types";
import { secondsToTime } from "../../shared/utilities";
import "./Pomodoro.scss";

class Pomodoro extends Component {
  static propTypes = {
    timer: PropTypes.number.isRequired,
    startPomodoro: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    pomodoroCompleted: PropTypes.func.isRequired,
    isPomodoro: PropTypes.bool.isRequired,
    completedSessions: PropTypes.number.isRequired,
    intervalId: PropTypes.number
  };

  componentDidUpdate() {
    const time = secondsToTime(this.props.timer);
    if (this.props.intervalId !== null) {
      document.title = `${this.props.isPomodoro ? "Running" : "Break"
        }: ${time} left`;
    }
  }

  componentDidMount() {
    window.addEventListener("focus", this.props.updateTimer);
    document.title = "Pomodoro | Productivity Platform";
  }

  render() {
    // if timer finished and the timer was running
    // execute the function
    if (this.props.timer === 0 && this.props.intervalId) {
      this.props.pomodoroCompleted(this.props.isPomodoro);
    }
    const running = this.props.intervalId !== null;
    // every 4 sessions the break will be 10 minutes instead of 5
    const breakTime = this.props.completedSessions % 4 !== 0 ? 300 : 600;
    const fullTime = this.props.isPomodoro ? 1500 : breakTime;
    const percentageDone = ((fullTime - this.props.timer) / fullTime) * 100;
    const innerColor = this.props.isPomodoro ? "#2ecc71" : "#3498db";
    const style = {
      background: `linear-gradient(0deg, 
          ${innerColor} ${percentageDone}%, 
          transparent ${percentageDone}%)`,
      border: `5px solid ${this.props.isPomodoro ? "#f39c12" : "#bdc3c7"}`
    };

    return (
      <Fragment>
        <div className="Pomodoro">
          {/* clock */}
          <div style={style} className="Pomodoro-Clock">
            {/* controls */}
            <div className="Pomodoro-Controls">
              <h2 className="Pomodoro-Time">
                {secondsToTime(this.props.timer)}
              </h2>
              <i
                // if timer is running, show the stop icon else show
                // the play icon and execute the respective function
                onClick={
                  !running ? this.props.startPomodoro : this.props.stopTimer
                }
                className={`Pomodoro-Icon fas fa-${running ? "stop" : "play"}`}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  timer: state.pomodoro.timer,
  completedSessions: state.pomodoro.completedSessions,
  intervalId: state.pomodoro.intervalId,
  isPomodoro: state.pomodoro.isPomodoro,
  userId: state.user.user.id
});

const mapDispatchToProps = dispatch => ({
  stopTimer: () => dispatch(actions.stopTimer()),
  // function to run when a pomodoro got completed
  // takes if the clock was a pomodoro or a break as
  // an argument
  pomodoroCompleted: isPomodoro =>
    dispatch(actions.pomodoroCompleted(isPomodoro)),
  // get all the user's pomodoros from the server
  startPomodoro: () => dispatch(actions.startPomodoro()),
  // helper function to put the timer to 5 seconds left
  endPomodoro: () => dispatch(actions.end5Seconds()),
  updateTimer: () => dispatch(actions.updateTimer())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Pomodoro)
);
