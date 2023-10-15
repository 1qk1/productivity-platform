import React from 'react'

const User = ({ register }) => {
  return (
    <div>
      <div>
        <label htmlFor="user_username">Username</label>
        <input type="text" id="user_username" {...register("user.username")} />
      </div>
      <div>
        <label htmlFor="user_email">E-Mail</label>
        <input type="email" id="user_email" {...register("user.email")} />
      </div>
      <button className='mt-4 btn btn-red'>Delete Account</button>
    </div>
  )
}

export default User