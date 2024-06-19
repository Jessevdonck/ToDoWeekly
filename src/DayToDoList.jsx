import React, { useState, useEffect } from "react";

function DayToDoList({ day, tasks, addTask, deleteTask, moveTaskUp, moveTaskDown }) {
    const [newTask, setNewTask] = useState("");
    const [listHeight, setListHeight] = useState(0);

    useEffect(() => {
        // Bereken de hoogte van de lijst wanneer de taken veranderen
        const listElement = document.getElementById(`task-list-${day}`);
        if (listElement) {
            setListHeight(listElement.scrollHeight);
        }
    }, [tasks, day]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleAddTask() {
        if (newTask.trim() !== "") {
            addTask(day, newTask);
            setNewTask("");
        }
    }

    return (
        <div className="day-to-do-list">
            <h2>{day}</h2>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={handleAddTask}>Add</button>
            </div>

            <ol className="task-list" id={`task-list-${day}`} style={{ height: listHeight }}>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(day, index)}>
                            🗑️
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(day, index)}>
                            ☝️
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(day, index)}>
                            👇 
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default DayToDoList;
