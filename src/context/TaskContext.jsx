import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/localStorageUtils';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      const newTasks = [...state.tasks, action.payload];
      saveTasks(newTasks);
      return { ...state, tasks: newTasks };
    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(filteredTasks);
      return { ...state, tasks: filteredTasks };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
  theme: 'light'
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const tasks = loadTasks();
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch({ type: 'SET_TASKS', payload: tasks });
    dispatch({ type: 'SET_THEME', payload: savedTheme });
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSearchQuery,
    toggleTheme
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};