'use client'

import {
  SignedIn,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  userId?: string;
  createdAt: number;
}

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Show loading while checking auth or redirecting
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VebTask</h1>
          <p className="text-slate-500 mt-2">Loading your workspace...</p>
        </div>
      </div>
    )
  }
  
  // Mock functions for task management (will be replaced with Convex)
  const createTask = async ({ title }: { title: string }) => {
    const newTask = {
      _id: Date.now().toString(),
      title,
      completed: false,
      userId: user?.id,
      createdAt: Date.now()
    }
    setTasks(prev => [newTask, ...prev])
  }
  
  const updateTask = async ({ id, completed }: { id: string; completed: boolean }) => {
    setTasks(prev => prev.map(task => 
      task._id === id ? { ...task, completed } : task
    ))
  }
  
  const removeTask = async ({ id }: { id: string }) => {
    setTasks(prev => prev.filter(task => task._id !== id))
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim() || !user) return
    
    try {
      await createTask({
        title: newTaskTitle,
      })
      setNewTaskTitle('')
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const toggleTask = async (taskId: any, completed: boolean) => {
    try {
      await updateTask({
        id: taskId,
        completed: !completed,
      })
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId: any) => {
    try {
      await removeTask({ id: taskId })
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with authentication */}
        {/* Clean header for authenticated users */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VebTask</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">
              Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>

        {/* Task Management Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
            <form onSubmit={handleCreateTask} className="mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Add Task
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className={`flex-1 font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>

            {tasks?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-slate-500 text-lg font-medium">No tasks yet</p>
                <p className="text-slate-400 text-sm">Create your first task above to get started!</p>
              </div>
            )}
        </div>
      </div>
    </main>
  )
}