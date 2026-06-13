import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Typography, message } from 'antd'
import { useTaskMutations } from '../../hooks/useTasks'
import styles from './CreateTaskPage.module.css'

interface FormValues {
  title: string
  description?: string
}

const CreateTaskPage = () => {
  const navigate = useNavigate()
  const { createTask } = useTaskMutations()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<FormValues>()

  const handleSubmit = (values: FormValues) => {
    setLoading(true)
    const newTask = createTask(values.title, values.description)
    setLoading(false)
    message.success(`Задача #${newTask.id} создана`)
    navigate('/board')
  }

  return (
    <div className={styles.wrapper}>
      <Typography.Title level={3}>Создать задачу</Typography.Title>
      <Card className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: 'Введите название задачи' }]}
          >
            <Input placeholder="Введите название задачи" />
          </Form.Item>

          <Form.Item name="description" label="Описание">
            <Input.TextArea
              placeholder="Введите описание задачи (необязательно)"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default CreateTaskPage
