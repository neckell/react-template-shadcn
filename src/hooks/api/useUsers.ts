import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../services/api'
import { useToast } from '../use-toast'
import { User } from '@/domain/auth/users'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await userApi.getUsers()
      return response.data as User[]
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await userApi.getUser(id)
      return response.data as User
    },
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await userApi.createUser(userData)
      return response.data as User
    },
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })

      toast({
        title: "User Created",
        description: `${newUser.name} has been successfully created.`,
        variant: "success",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create user.",
        variant: "destructive",
      })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> }) => {
      const response = await userApi.updateUser(id, data)
      return response.data as User
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)

      queryClient.invalidateQueries({ queryKey: userKeys.lists() })

      toast({
        title: "User Updated",
        description: `${updatedUser.name} has been successfully updated.`,
        variant: "success",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update user.",
        variant: "destructive",
      })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (id: string) => {
      await userApi.deleteUser(id)
      return id
    },
    onSuccess: (deletedId) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) })

      queryClient.invalidateQueries({ queryKey: userKeys.lists() })

      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
        variant: "success",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete user.",
        variant: "destructive",
      })
    },
  })
}
