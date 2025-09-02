'use client'

import { useState, useCallback } from 'react'

interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete project proposal', completed: false, priority: 'high' },
    { id: '2', text: 'Review meeting notes', completed: false, priority: 'medium' },
    { id: '3', text: 'Organize workspace', completed: true, priority: 'low' },
  ])
  const [newTaskText, setNewTaskText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = useCallback(() => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        priority: 'medium',
      }
      setTasks(prev => [newTask, ...prev])
      setNewTaskText('')
    }
  }, [newTaskText])

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [])

  const updateTaskPriority = useCallback((id: string, priority: Task['priority']) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, priority } : task
    ))
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const priorityColors = {
    low: 'bg-pastel-green',
    medium: 'bg-pastel-yellow',
    high: 'bg-pastel-pink',
  }

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-adhd-cream via-adhd-sage to-adhd-lavender pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Queue</h1>
            <p className="text-lg text-gray-600">
              Organize your tasks in a way that works for your ADHD brain
            </p>
          </div>

          {/* Add New Task */}
          <div className="card mb-8">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <div className="flex space-x-3">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="What do you need to focus on?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={addTask}
                className="btn-primary flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-md">
              {(['all', 'active', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === tab
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Task List */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Your Tasks</h3>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl leading-none">○</span>
                <p>No tasks found. Add a new task to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-transparent hover:shadow-lg transition-all duration-200 flex items-center space-x-3"
                    style={{
                      borderLeftColor: task.completed ? '#10b981' :
                        task.priority === 'high' ? '#f87171' :
                        task.priority === 'medium' ? '#fbbf24' : '#34d399'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400 cursor-grab"><path d="M4 6h16M4 12h16M4 18h16"/></svg>

                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0"
                    >
                      {task.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.87"/><path d="M12 2v10"/><path d="M22 4l-7 7-3-3"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400 hover:text-primary-500"><circle cx="12" cy="12" r="10"/></svg>
                      )}
                    </button>

                    <span
                      className={`flex-1 text-left ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </span>

                    <div className="flex items-center space-x-2">
                      <select
                        value={task.priority}
                        onChange={(e) => updateTaskPriority(task.id, e.target.value as Task['priority'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${priorityColors[task.priority]}`}
                      >
                        {(['low', 'medium', 'high'] as const).map((priority) => (
                          <option key={priority} value={priority}>
                            {priorityLabels[priority]}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Task Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {tasks.filter(t => !t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
