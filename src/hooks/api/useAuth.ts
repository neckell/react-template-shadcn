import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../services/api'
import { useToast } from '../use-toast'
import { LoginCredentials, AuthResponse, RegisterData } from '@/domain/auth/auth'
import { Paths } from '../../routes/Paths'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authApi.login(credentials)
      return response.data as AuthResponse
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)

      queryClient.clear()

      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${data.user.name}.`,
        variant: "success",
      })

      window.location.href = Paths.Dashboard
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials.",
        variant: "destructive",
      })
    },
  })
}

export function useRegister() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await authApi.register(data)
      return response.data as AuthResponse
    },
    onSuccess: (data) => {
      toast({
        title: "Account Created",
        description: `Welcome ${data.user.name}! Your account has been created successfully.`,
        variant: "success",
      })

      setTimeout(() => {
        window.location.href = Paths.Dashboard
      }, 2000)
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Failed to create account.",
        variant: "destructive",
      })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async () => {
      await authApi.logout()
    },
    onSuccess: () => {
      localStorage.removeItem('token')

      queryClient.clear()

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "success",
      })

      window.location.href = Paths.Login
    },
    onError: (error: any) => {
      localStorage.removeItem('token')
      queryClient.clear()

      toast({
        title: "Logged Out",
        description: "You have been logged out.",
        variant: "warning",
      })

      window.location.href = Paths.Login
    },
  })
}
