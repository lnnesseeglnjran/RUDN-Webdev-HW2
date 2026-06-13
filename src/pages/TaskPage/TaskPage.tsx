import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Typography,
  Descriptions,
  Button,
  Space,
  Popconfirm,
  Tag,
  Alert,
  Spin,
} from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTasks, useTaskMutations } from '../../hooks/useTasks'
import { STATUS_LABELS } from '../../types'
import styles from './TaskPage.module.css'

const STATUS_COLORS: Record<number, string> = {
  0: 'orange',
  1: 'blue',
  2: 'green',
}

const TaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: tasks, isLoading } = useTasks()
  const { updateTaskStatus, deleteTask } = useTaskMutations()

  const taskId = Number(id)
  const task = tasks?.find((t) => t.id === taskId)

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    )
  }

  if (!task) {
    return (
      <Alert
        type="warning"
        message="Задача не найдена"
        description={`Задача с номером ${id} не существует.`}
        action={
          <Button onClick={() => navigate('/board')} type="primary">
            Вернуться на доску
          </Button>
        }
      />
    )
  }

  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/board')
  }

  const nextStatuses = ([0, 1, 2] as const).filter((s) => s !== task.status)

  return (
    <div className={styles.wrapper}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/board')}
        className={styles.back}
      >
        Назад к доске
      </Button>

      <Card
        title={
          <Space>
            <Typography.Text type="secondary">#{task.id}</Typography.Text>
            <Typography.Text strong>{task.title}</Typography.Text>
          </Space>
        }
        extra={
          <Popconfirm
            title="Удалить задачу?"
            description="Это действие нельзя отменить."
            onConfirm={handleDelete}
            okText="Удалить"
            cancelText="Отмена"
            okType="danger"
          >
            <Button danger icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Popconfirm>
        }
        className={styles.card}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Номер">{task.id}</Descriptions.Item>
          <Descriptions.Item label="Название">{task.title}</Descriptions.Item>
          <Descriptions.Item label="Описание">
            {task.description ?? <Typography.Text type="secondary">Не указано</Typography.Text>}
          </Descriptions.Item>
          <Descriptions.Item label="Дата создания">
            {task.createdAt.toLocaleString('ru-RU')}
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={STATUS_COLORS[task.status]}>{STATUS_LABELS[task.status]}</Tag>
          </Descriptions.Item>
        </Descriptions>

        <div className={styles.actions}>
          <Typography.Text strong>Переместить в статус:</Typography.Text>
          <Space className={styles.statusButtons}>
            {nextStatuses.map((s) => (
              <Button
                key={s}
                onClick={() => updateTaskStatus(task.id, s)}
              >
                {STATUS_LABELS[s]}
              </Button>
            ))}
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default TaskPage
