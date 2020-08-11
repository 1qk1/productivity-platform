import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import * as actions from "../../store/actions/index";
import Loader from "./../../components/UI/Loader/Loader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { getddmmYYYYDate, weekDayMap } from "./../../shared/utilities";
import "./Pomodoro.scss";

export class Timesheets extends Component {
  state = {
    pomodoros: this.props.pomodoros,
    lineChart: null,
    barChart: null,
  };
  componentDidMount() {
    // this.props.getPomodoros();
    this.getTimesheets();
  }

  getTimesheets = (fromDate, toDate) => {
    axios.get("/pomodoro").then((response) => {
      const pomodoros = response.data;
      // const firstDate = new Date(pomodoros[0].date);
      // const lastDate = new Date(pomodoros[pomodoros.length - 1].date);
      this.setState({ pomodoros: pomodoros }, () => {
        this.getCharts();
      });
    });
  };

  getCharts = () => {
    const lineChart = [];
    const barChart = Array.apply(null, { length: 7 }).map((day, index) => ({
      name: weekDayMap[index].name,
      shortName: weekDayMap[index].short,
      pomos: 0,
    }));
    // get day
    // barchart[day].pomos++
    this.state.pomodoros.forEach((pomo) => {
      const pomoDate = getddmmYYYYDate(pomo.date);
      const pomoDay = new Date(pomo.date).getDay();
      barChart[pomoDay].pomos++;
      if (lineChart.length === 0) {
        lineChart.push({ pomos: 1, date: pomoDate });
      } else {
        const pindex = lineChart.findIndex((el) => el.date === pomoDate);
        if (pindex !== -1) {
          lineChart[pindex].pomos = lineChart[pindex].pomos + 1;
        } else {
          lineChart.push({ pomos: 1, date: pomoDate });
        }
      }
    });
    this.setState({ lineChart, barChart });
  };

  render() {
    if (
      this.state.pomodoros === null
      // this.state.barChart === null ||
      // this.state.lineChart === null
    ) {
      return <Loader />;
    }
    return (
      <div className="Container">
        <h1>Your timesheets</h1>
        {/* Will get pomodoros from the server */}
        {/* Will get last week's pomodoros by default */}
        {/* You can change the settings and get previous days' pomodoros */}
        {/* Will display pomodoros */}
        <div className="timesheets-container">
          <BarChart width={500} height={300} data={this.state.barChart}>
            <CartesianGrid strokeDasharray="0" />
            <XAxis dataKey="shortName" />
            <YAxis name="Pomodoros" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="pomos" fill="#8884d8" />
          </BarChart>
          <LineChart
            width={500}
            height={300}
            data={this.state.lineChart}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis
              dataKey="pomos"
              // domain={[
              //   (dataMin) => dataMin,
              //   (dataMax) => Math.ceil(dataMax / 5) * 5,
              // ]}
              name="Pomodoros"
              allowDecimals={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pomos"
              stroke="#8884d8"
              // activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pomodoros: state.pomodoro.pomodoros,
});

const mapDispatchToProps = (dispatch) => ({
  getPomodoros: () => dispatch(actions.getPomodoros()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timesheets);
