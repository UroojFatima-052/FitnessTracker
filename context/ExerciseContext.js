import React, { createContext, useState, useContext } from 'react';
import { initialExercises } from '../data/exercises';

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState(initialExercises);
  const [completedIds, setCompletedIds] = useState([]);

  // Add a new custom exercise to the list
  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now().toString(), // simple unique id
    };
    setExercises((prev) => [newExercise, ...prev]);
  };

  // Toggle exercise completion
  const toggleComplete = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isCompleted = (id) => completedIds.includes(id);

  return (
    <ExerciseContext.Provider
      value={{ exercises, addExercise, toggleComplete, isCompleted, completedIds }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);
