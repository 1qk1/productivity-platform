import React from 'react'

const Pomodoro = ({ register }) => {
  return (
    <div>
      <div>
        <label htmlFor="pomodoro_time">Pomodoro Time (minutes)</label>
        <input type="number" id="pomodoro_time" {...register("pomodoro.time")} />
      </div>
      <div>
        <label htmlFor="pomodoro_break">Break Time (minutes)</label>
        <input type="number" id="pomodoro_break" {...register("pomodoro.break")} />
      </div>
      <div>
        <label htmlFor="pomodoro_longBreak">Long Time Break (minutes)</label>
        <input type="number" id="pomodoro_longBreak" {...register("pomodoro.longBreak")} />
      </div>
      <div>
        <label htmlFor="pomodoro_longBreakInterval">Long Break Interval</label>
        <input type="number" id="pomodoro_longBreakInterval" {...register("pomodoro.longBreakInterval")} />
      </div>
    </div>
  )
}

export default Pomodoro