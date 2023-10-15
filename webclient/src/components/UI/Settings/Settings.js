import React, { useState } from 'react'
import { capitalizeWord } from "../../../shared/utilities";
import { useForm } from "react-hook-form";
import axios from "../../../axios";
import { toast } from 'react-toastify'
import "./Settings.scss"

import User from "./User";
import Pomodoro from "./Pomodoro";

const Settings = ({ extensions, user }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      user: {
        username: user.username,
        email: user.email
      },
      pomodoro: {
        time: user.extensionSettings.pomodoro.time,
        break: user.extensionSettings.pomodoro.break,
        longBreak: user.extensionSettings.pomodoro.longBreak,
        longBreakInterval: user.extensionSettings.pomodoro.longBreakInterval
      },
    }
  });


  const onSubmit = (data) => {
    console.log(data)
    axios.post('/user/update', data).then(res => {
      console.log(res)
      toast.success('Settings updated')
    }
    ).catch(error => {
      console.log(error)
      toast.error(error.response.data.error.message)
    })
  }

  const onTabClick = (tabName) => {
    setSelectedTab(tabName)
  }

  const [selectedTab, setSelectedTab] = useState("user")

  const extensionsToComponents = {
    "user": <User register={register} />,
    "pomodoro": <Pomodoro register={register} />,
  }
  return (
    <div className="container Settings">
      <h1 className="h3 mb-5 mt-4">Settings</h1>
      <div className="settings-tabs">
        <button className={selectedTab === "user" ? "active" : ""} onClick={() => onTabClick("user")}>User</button>
        {extensions.map(extension => {
          if (extensionsToComponents[extension]) {
            return (
              <button key={`settings-ext-tab-${extension}`} className={selectedTab === extension ? "active" : ""} onClick={() => onTabClick(extension)}>{capitalizeWord(extension)}</button>
            )
          }
          return null
        })}
      </div>
      <div className="settings-content">
        {extensionsToComponents[selectedTab]}
      </div>
      <div className="settings-actions">
        <button className='btn btn-green' onClick={handleSubmit(onSubmit)}>Save</button>
      </div>
    </div>
  )

}

export default Settings