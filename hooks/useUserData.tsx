import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export function useUserData() {
  return useContext(UserContext)
}
