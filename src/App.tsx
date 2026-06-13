import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/Layout/Layout'
import BoardPage from './pages/BoardPage/BoardPage'
import TaskPage from './pages/TaskPage/TaskPage'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/board" replace />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="tasks/:id" element={<TaskPage />} />
        <Route path="create" element={<CreateTaskPage />} />
      </Route>
    </Routes>
  )
}

export default App
