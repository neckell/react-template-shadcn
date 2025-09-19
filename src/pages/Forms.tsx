import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'manager', 'admin']),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Must be less than 100 years old'),
})

type UserFormData = z.infer<typeof userFormSchema>

export function Forms() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      bio: '',
      age: 18,
    },
  })

  const onSubmit = async (data: UserFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    alert('Form submitted successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
        <p className="text-muted-foreground">
          Example forms with React Hook Form and Zod validation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Form */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Fill out the form below to create a new user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value: string) => setValue('role', value as 'user' | 'manager' | 'admin')}
                  defaultValue="user"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  placeholder="Enter your age"
                />
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age.message}</p>
                )}
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Form Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Form Preview</CardTitle>
            <CardDescription>
              Live preview of the form data as you type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Current Form Data:</Label>
                <pre className="mt-2 p-4 bg-muted rounded-md text-sm overflow-auto">
                  {JSON.stringify(watch(), null, 2)}
                </pre>
              </div>

              <div>
                <Label className="text-sm font-medium">Validation Errors:</Label>
                <pre className="mt-2 p-4 bg-muted rounded-md text-sm overflow-auto">
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Form Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Form Features</CardTitle>
          <CardDescription>
            This form demonstrates various features of React Hook Form with Zod validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">✅ Real-time Validation</h4>
              <p className="text-sm text-muted-foreground">
                Form fields are validated as you type with immediate feedback.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">✅ Type Safety</h4>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with Zod schema validation.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">✅ Error Handling</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive error messages for better user experience.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">✅ Loading States</h4>
              <p className="text-sm text-muted-foreground">
                Submit button shows loading state during form submission.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">✅ Live Preview</h4>
              <p className="text-sm text-muted-foreground">
                See form data and validation errors in real-time.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">✅ Accessibility</h4>
              <p className="text-sm text-muted-foreground">
                Proper labels and ARIA attributes for screen readers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
