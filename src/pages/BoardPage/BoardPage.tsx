import { Spin, Alert, Typography } from 'antd'
import { useTasks } from '../../hooks/useTasks'
import Column from '../../components/Column/Column'
import styles from './BoardPage.module.css'

const BoardPage = () => {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Ошибка загрузки задач"
        description="Не удалось получить данные с сервера. Проверьте подключение к интернету."
      />
    )
  }

  const todo = tasks?.filter((t) => t.status === 0) ?? []
  const inProgress = tasks?.filter((t) => t.status === 1) ?? []
  const done = tasks?.filter((t) => t.status === 2) ?? []

  return (
    <div>
      <Typography.Title level={3} className={styles.title}>
        Все задачи
      </Typography.Title>
      <div className={styles.columns}>
        <Column status={0} tasks={todo} />
        <Column status={1} tasks={inProgress} />
        <Column status={2} tasks={done} />
      </div>
    </div>
  )
}

export default BoardPage
