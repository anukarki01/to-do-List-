import React from 'react';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import ProgressBar from '../components/ProgressBar';
import QuoteWidget from '../components/QuoteWidget';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your day and track your progress
              </p>
            </div>
            
            <TaskForm />
            <FilterBar />
            <TaskList />
          </div>
          
          <div className="space-y-6">
            <ProgressBar />
            <QuoteWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;