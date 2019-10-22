import React, { useState } from 'react';
import axios from 'axios';

function TopicSelected(props){
    const { topic, currentUser, deleteTopic, setTopics, setSessionConfirm, setTopicSelect, handleGoBack} = props;

    const [ editingTopic, setEditingTopic ] = useState(false);
    const [ formState, setFormState ] = useState({
        topic:`${topic.topic}`,
        priority:`${topic.priority}`
    })  

    const handleChange = e => {
        const { name, value } = e.target;
        setFormState(prevState => ({...prevState,[name]:value}))
    }
    
    const handleSubmit = e => {
        e.preventDefault()

        const changedTopic = {topic: formState.topic, priority: Number(formState.priority)}
        axios.put(`/topics/${currentUser._id}/${topic._id}`, changedTopic)
            .then(res => {
                setTopics(prevTopics => {
                    const newTopicIndex = prevTopics.findIndex(prevTopic => prevTopic._id === topic._id);
                    prevTopics[newTopicIndex] = res.data;
                    return [...prevTopics]
                })
                setTopicSelect({topic: res.data, isSelected: true})
                setEditingTopic(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {   
                editingTopic ? (
                    <dialog className="topic-edit-background">
                        <form className="topic-edit-form" onSubmit = {handleSubmit}>
                            <input className="topic-edit-input-topic"
                                type = "text" 
                                name = "topic"
                                required
                                value = {formState.topic}
                                onChange = {handleChange}
                            />
                            <label>Priority: 
                                <input className="topic-edit-input-priority"
                                    type = "number"
                                    min = "0"
                                    max = "5"
                                    step = "1"
                                    name = "priority"
                                    value = {formState.priority}
                                    onChange = {handleChange}
                                />
                            </label>
                            <div className="topic-edit-buttons">
                                <button type="submit">Save Changes</button>
                                <button onClick = {() => setEditingTopic(false)}>Cancel</button>
                            </div>
                        </form>
                    </dialog>
                ):(
                    <dialog className="topic-selected-background">
                        <div className="topic-selected-container">
                            <h1>{topic.topic} </h1>
                            <h3>Priority: {topic.priority} </h3>
                            <button className="topic-selected-start"
                                onClick={() => {
                                    setTopicSelect({topic: {}, isSelected: false})
                                    setSessionConfirm({topic: topic, isStarting: true});
                                }}>New Session
                            </button>
                            <div className="topic-selected-buttons">
                                <button onClick = {() => setEditingTopic(true)}>Edit</button>
                                <button onClick = {() => deleteTopic(topic._id)}>Delete</button>
                                <button onClick = {handleGoBack}>Back</button>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </>
    )
}

export default TopicSelected