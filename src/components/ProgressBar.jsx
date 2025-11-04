import React from 'react';
import { motion } from 'framer-motion';
import { useTask } from '../context/TaskContext';

const ProgressBar = () => {
  const { tasks } = useTask();

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Progress
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completedTasks} of {totalTasks} tasks
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
        />
      </div>
      
      <div className="mt-2 text-right">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;