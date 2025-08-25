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
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with authentication */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">VebTask</h1>
          <div className="flex items-center gap-4">
            {!mounted ? (
              <div className="text-gray-500">Loading...</div>
            ) : !isLoaded ? (
              <div className="text-gray-500">Initializing auth...</div>
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
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
          <div className="text-center py-12">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Welcome to VebTask!</h2>
              <p className="text-gray-600 mb-6">
                Your AI-powered task management application with Clerk authentication
              </p>
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Sign In to Get Started
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
                    Create Account
                  </button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Task Management Interface */}
          <form onSubmit={handleCreateTask} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow border"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, task.completed)}
                  className="w-5 h-5"
                />
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {tasks?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks yet. Create your first task above!
            </div>
          )}
        </SignedIn>
      </div>
    </main>
  )
}