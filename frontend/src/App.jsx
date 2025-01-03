
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Protected from './components/Protected'
import LoginProtected from './components/LoginProtected'
import CompletedTask from './components/CompletedTask'
import AllTasks from './components/AllTasks'
import PendingTask from './components/PendingTask'
import AddTaskForm from './components/AddTaskForm'
import ViewTask from './components/ViewTask'
import UpdateTaskForm from './components/UpdateTaskForm'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Protected><Home /></Protected>,
    children : [
      {
        path : '/',
        element : <AllTasks />
      },
      {
        path : '/pending-task',
        element : <PendingTask />
      },
      {
        path : '/add-task',
        element : <AddTaskForm />
      },
      {
        path : '/completed-task',
        element : <CompletedTask />
      },
      {
        path : '/task/:id',
        element : <ViewTask />
      },

    ]

  },
  {
    path : '/login',
    element : <Login />
  },
  {
    path : '/signup',
    element : <LoginProtected><Register /></LoginProtected>
  }
])

function App() {
  

  return (
    <>
      {/* <Login /> */}
      <RouterProvider router={router}/>
      <UpdateTaskForm />
    </>
  )
}

export default App
