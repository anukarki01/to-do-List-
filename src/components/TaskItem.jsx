import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Calendar, Flag, Check, X } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const priorityColors = {
    low: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
  };

  const categoryColors = {
    personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    shopping: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const handleSave = () => {
    if (!editData.title.trim()) return;
    updateTask(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(task);
    setIsEditing(false);
  };

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      {!isEditing ? (
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={toggleComplete}
              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {task.completed && <Check size={12} />}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                  {task.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${priorityColors[task.priority]}`}>
                  <Flag size={12} />
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Calendar size={12} />
                    {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md transition-colors"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Task title"
          />
          
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Task description"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <select
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
            
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <input
            type="date"
            name="dueDate"
            value={editData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          />
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;