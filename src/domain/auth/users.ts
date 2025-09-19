export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  password: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: 'admin' | 'user' | 'manager'
  avatar?: string
}