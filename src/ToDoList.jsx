import React, { useState, useEffect } from "react";
import DayToDoList from "./DayToDoList.jsx";

function ToDoList() {
  const daysOfWeekTop = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  const daysOfWeekBottom = ["Friday", "Saturday", "Sunday"];

  // Functie om taken op te slaan in localStorage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Functie om taken op te halen uit localStorage
  function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : getDefaultTasks();
  }

  // Functie om standaard taken terug te geven als localStorage leeg is
  function getDefaultTasks() {
    return {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
  }

  // Voorbeeld van taken per dag, gebruik localStorage als beschikbaar
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());

  // Effect om taken op te slaan in localStorage wanneer ze veranderen
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  function addTask(day, task) {
    if (task.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [day]: [...prevTasks[day], task],
      }));
    }
  }

  function deleteTask(day, index) {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: prevTasks[day].filter((_, i) => i !== index),
    }));
  }

  function moveTaskUp(day, index) {
    if (index > 0) {
      const newTasks = [...tasks[day]];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index - 1];
      newTasks[index - 1] = temp;
      setTasks((prevTasks) => ({
        ...prevTasks,
        [day]: newTasks,
      }));
    }
  }

  function moveTaskDown(day, index) {
    if (index < tasks[day].length - 1) {
      const newTasks = [...tasks[day]];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index + 1];
      newTasks[index + 1] = temp;
      setTasks((prevTasks) => ({
        ...prevTasks,
        [day]: newTasks,
      }));
    }
  }

  return (
    <div className="weekly-to-do-list">
      <h1>Weekly To-Do List</h1>
      <div className="week">
        <div className="row">
          {daysOfWeekTop.map((day) => (
            <DayToDoList
              key={day}
              day={day}
              tasks={tasks[day]}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTaskUp={moveTaskUp}
              moveTaskDown={moveTaskDown}
            />
          ))}
        </div>
        <div className="row">
          {daysOfWeekBottom.map((day) => (
            <DayToDoList
              key={day}
              day={day}
              tasks={tasks[day]}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTaskUp={moveTaskUp}
              moveTaskDown={moveTaskDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
