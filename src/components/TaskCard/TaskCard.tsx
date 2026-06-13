import { Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { Task } from '../../types'
import styles from './TaskCard.module.css'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate()

  return (
    <Card className={styles.card} size="small">
      <Typography.Link
        onClick={() => navigate(`/tasks/${task.id}`)}
        className={styles.taskId}
      >
        #{task.id}
      </Typography.Link>
      <Typography.Text className={styles.taskTitle}>{task.title}</Typography.Text>
    </Card>
  )
}

export default TaskCard
