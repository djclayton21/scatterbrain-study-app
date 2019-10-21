import React, { useState } from "react";
import "../../style/Onboarding/AddPriority.css";
import userBrowser from '../../functions/User/Browser.js';
import axios from "axios";
import { set } from "mongoose";

function AddPriority(props) {
  const[priority, setPriority] = useState(0)
  const topicId = props.match.params.topicId
  const currentUser = userBrowser.get()

  const handleChange = (e) => { //payload
    e.preventDefault()
    setPriority(e.target.value)
  }

  const increment = (e)=> { e.preventDefault()
    if (priority < 5 ){
      setPriority(priority + 1)
  }}

  const decrement = (e)=> { e.preventDefault()
    if (priority > 0 ){
      setPriority(priority - 1)
    }}



  const updateTopicWithPriority = (e) => {
    e.preventDefault()
    axios.put(`/topics/${currentUser._id}/${topicId}`,
    { priority: Number(priority),  currentWeight: Number(priority) })
    .then(res => {
      console.log(res)
      props.history.push("/onboard/redirect")// redirect
    })
     .catch(err => console.log(err))
  }

  return (
    <div className="add-priority-page">
      <div className="add-priority-text">
        <h1>Do You want to Add Priority to your Topic?</h1>
        <h5>
          <em>A Higher priority (i.e. 5) is more important.</em>
        </h5>
        <form onSubmit={
          updateTopicWithPriority
        } className="priority-btn-container">
          <button type="minus-button" onClick={decrement}>
            <b>-</b>
          </button>
          <input
            className="priority-input"
            type="number"
            name="quantity"
            min="1"
            max="5"
            placeholder="Type your number"
            onChange={handleChange}
            value={priority}
          ></input>
          <button type="add-button" onClick={increment}>
            <b>+</b>
          </button>
            <button className="add-priority-btn">
                Add
            </button>
        </form>
      </div>
    </div>
  );
}

export default AddPriority;
