import { Card, Typography, Badge } from 'antd'
import type { Task } from '../../types'
import { STATUS_LABELS } from '../../types'
import TaskCard from '../TaskCard/TaskCard'
import styles from './Column.module.css'

interface ColumnProps {
  status: 0 | 1 | 2
  tasks: Task[]
}

const STATUS_COLORS: Record<number, string> = {
  0: '#fa8c16',
  1: '#1677ff',
  2: '#52c41a',
}

const Column = ({ status, tasks }: ColumnProps) => {
  return (
    <Card
      className={styles.column}
      title={
        <div className={styles.columnHeader}>
          <Badge color={STATUS_COLORS[status]} />
          <Typography.Text strong className={styles.columnTitle}>
            {STATUS_LABELS[status]}
          </Typography.Text>
          <span className={styles.count}>{tasks.length}</span>
        </div>
      }
    >
      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <Typography.Text type="secondary" className={styles.empty}>
            Нет задач
          </Typography.Text>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </Card>
  )
}

export default Column
