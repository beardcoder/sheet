import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Private from './layouts/Private'
import Public from './layouts/Public'
import Calendar from './routes/Calendar'
import Characters from './routes/Characters'
import Groups from './routes/Groups'
import GroupsId from './routes/Groups/[id]'
import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Register from './routes/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: '/profile',
    element: (
      <Private>
        <Profile />
      </Private>
    ),
  },
  {
    path: '/calendar',
    element: (
      <Private>
        <Calendar />
      </Private>
    ),
  },
  {
    path: '/groups',
    element: (
      <Private>
        <Groups />
      </Private>
    ),
  },
  {
    path: '/groups/:id',
    element: (
      <Private>
        <GroupsId />
      </Private>
    ),
  },
  {
    path: '/characters',
    element: (
      <Private>
        <Characters />
      </Private>
    ),
  },
  {
    path: '/register',
    element: (
      <Public>
        <Register />
      </Public>
    ),
  },
  {
    path: '/login',
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
])
