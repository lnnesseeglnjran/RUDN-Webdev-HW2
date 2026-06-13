import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { Task, TodoPlaceholder } from '../types'

const TASKS_KEY = ['tasks']

const fetchInitialTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get<TodoPlaceholder[]>(
    'https://jsonplaceholder.typicode.com/todos'
  )
  return data.slice(0, 20).map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: undefined,
    createdAt: new Date(),
    status: todo.completed ? 2 : (todo.id % 3 === 0 ? 1 : 0) as 0 | 1 | 2,
  }))
}

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: TASKS_KEY,
    queryFn: fetchInitialTasks,
    staleTime: Infinity,
  })
}

export const useTask = (id: number) => {
  const queryClient = useQueryClient()
  return useQuery<Task | undefined>({
    queryKey: ['tasks', id],
    queryFn: () => {
      const tasks = queryClient.getQueryData<Task[]>(TASKS_KEY)
      return tasks?.find((t) => t.id === id)
    },
    enabled: queryClient.getQueryData<Task[]>(TASKS_KEY) !== undefined,
  })
}

export const useTaskMutations = () => {
  const queryClient = useQueryClient()

  const createTask = (title: string, description?: string) => {
    const tasks = queryClient.getQueryData<Task[]>(TASKS_KEY) ?? []
    const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0)
    const newTask: Task = {
      id: maxId + 1,
      title,
      description,
      createdAt: new Date(),
      status: 0,
    }
    queryClient.setQueryData<Task[]>(TASKS_KEY, [...tasks, newTask])
    return newTask
  }

  const updateTaskStatus = (id: number, status: 0 | 1 | 2) => {
    const tasks = queryClient.getQueryData<Task[]>(TASKS_KEY) ?? []
    queryClient.setQueryData<Task[]>(
      TASKS_KEY,
      tasks.map((t) => (t.id === id ? { ...t, status } : t))
    )
    queryClient.invalidateQueries({ queryKey: ['tasks', id] })
  }

  const deleteTask = (id: number) => {
    const tasks = queryClient.getQueryData<Task[]>(TASKS_KEY) ?? []
    queryClient.setQueryData<Task[]>(
      TASKS_KEY,
      tasks.filter((t) => t.id !== id)
    )
  }

  return { createTask, updateTaskStatus, deleteTask }
}
