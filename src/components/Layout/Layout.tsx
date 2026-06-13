import { Layout as AntLayout, Menu, Typography } from 'antd'
import { AppstoreOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

const { Header, Content } = AntLayout

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = location.pathname.startsWith('/create')
    ? 'create'
    : 'board'

  const menuItems = [
    {
      key: 'board',
      icon: <AppstoreOutlined />,
      label: 'Доска',
      onClick: () => navigate('/board'),
    },
    {
      key: 'create',
      icon: <PlusCircleOutlined />,
      label: 'Создать задачу',
      onClick: () => navigate('/create'),
    },
  ]

  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <AppstoreOutlined className={styles.logoIcon} />
          <Typography.Text className={styles.logoText}>Доска задач</Typography.Text>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className={styles.menu}
        />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </AntLayout>
  )
}

export default AppLayout
