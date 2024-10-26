import { getCurrentUser } from "../services/auth.services"
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

export const AuthGuard = ({unauthorize: boolean = false}) => {
  const { pathname } = useLocation()
  const currentUser = getCurrentUser()

  if (!currentUser) return <Navigate to='/login' replace state={{from: pathname}} />

  const decoded = jwtDecode(currentUser.accessToken)
  const now = new Date().getTime() / 1000
  const isExpired = Number(now) > Number(decoded.exp)

  if (isExpired) return <Navigate to='/login' replace state={{from: pathname}} />

  return <Outlet />
}