export interface Task {
  id: number
  title: string
  description?: string
  createdAt: Date
  status: 0 | 1 | 2
}

export interface TodoPlaceholder {
  id: number
  title: string
  completed: boolean
  userId: number
}

export const STATUS_LABELS: Record<number, string> = {
  0: 'К выполнению',
  1: 'В работе',
  2: 'Выполнено',
}
