'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { useState, useEffect } from 'react'

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  userId?: string;
  createdAt: number;
}

export default function Home() {
  const { user, isLoaded } = useUser()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Local state management (Convex integration ready for future)
  const [tasks, setTasks] = useState<Task[]>([])
  
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
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VebTask</h1>
          <div className="flex items-center gap-4">
            {!mounted ? (
              <div className="text-gray-500">Loading...</div>
            ) : !isLoaded ? (
              <div className="text-gray-500">Initializing auth...</div>
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <span className="text-gray-600">
                    Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            )}
          </div>
        </div>

        <SignedOut>
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              {/* Hero Section */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">Welcome to VebTask!</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Your AI-powered task management application with secure authentication and real-time collaboration
                  </p>
                </div>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Secure authentication with Clerk</span>
                  </div>
                  <div className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Real-time task synchronization</span>
                  </div>
                  <div className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span>Beautiful, responsive interface</span>
                  </div>
                </div>

                {/* Auth buttons */}
                <div className="space-y-3">
                  <SignInButton mode="modal">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      Sign In to Get Started
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      Create Your Account
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
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
        </SignedIn>
      </div>
    </main>
  )
}