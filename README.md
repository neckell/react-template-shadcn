# React Management Template

A production-ready React template for building classic web applications focused on management systems with table-heavy interfaces.

## Features

- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **TanStack Router** for type-safe routing with devtools
- **TanStack Query** for server state management with caching
- **Zustand** for lightweight global state management
- **shadcn/ui** components with Tailwind CSS styling
- **React Hook Form** with Zod validation for forms
- **TanStack Table** for advanced data tables with sorting, filtering, pagination
- **Framer Motion** for smooth animations
- **Axios** for HTTP requests with interceptors
- **Dark/Light theme** support with system preference detection
- **Responsive design** with mobile-first approach
- **ESLint + Prettier** for code quality and formatting
- **Husky + lint-staged** for pre-commit hooks

## Tech Stack

### Core Framework
- React ^18.3.1
- TypeScript ^5.5.3
- Vite ^5.3.3

### State Management
- Zustand ^4.5.0 (Global state)
- TanStack Query ^5.0.0 (Server state)
- TanStack Query Devtools ^5.0.0

### Routing
- TanStack Router ^1.0.0
- TanStack Router Devtools ^1.0.0

### UI Components & Styling
- shadcn/ui (Radix UI primitives)
- Tailwind CSS ^3.4.4
- Tailwind CSS Animate ^1.0.7
- Lucide React ^0.379.0 (Icons)
- Framer Motion ^12.3.1

### Forms & Validation
- React Hook Form ^7.52.2
- Zod ^3.23.8
- @hookform/resolvers ^3.9.0

### Data Handling
- TanStack Table ^8.20.1
- Axios ^1.7.5
- date-fns ^3.6.0
- Recharts ^2.12.7

### Development Tools
- ESLint ^8.57.0
- Prettier ^3.3.3
- Husky ^9.0.0
- lint-staged ^15.0.0

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-management-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler check
- `npm run pre:commit` - Run pre-commit checks (format + lint)

## Project Structure

```bash
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui base components
│   ├── features/       # Business logic components
│   └── layouts/        # Layout components (Header, Sidebar, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (utils.ts for cn helper)
├── pages/              # Page components (Dashboard, Users, etc.)
├── routes/             # TanStack Router configuration
├── services/           # API services and HTTP client setup
├── store/              # Zustand store definitions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## UI Components

The template includes pre-built shadcn/ui components:

- **Button** - Various button variants and sizes
- **Input** - Form input with validation styles
- **Label** - Accessible form labels
- **Card** - Content containers with header/footer
- **Table** - Data table components
- **Select** - Dropdown selection component
- **Textarea** - Multi-line text input
- **Switch** - Toggle switch component

## Features Implemented

### Data Table
- Sorting by columns
- Global search/filtering
- Pagination controls
- Row selection
- Responsive design
- Loading states

### Forms
- Real-time validation with Zod
- Type-safe form handling
- Error message display
- Loading states during submission
- Accessible form controls

### Layout & Navigation
- Responsive sidebar navigation
- Collapsible sidebar
- Header with user actions
- Dark/light theme toggle
- Mobile-friendly design

### State Management
- Global app state with Zustand
- Server state caching with TanStack Query
- Theme persistence
- User session management

### Example Pages
- **Dashboard** - Overview with stats and charts placeholder
- **Users** - User management with data table
- **Forms** - Form examples with validation
- **Settings** - App configuration and preferences

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

### API Integration
The template includes a pre-configured Axios instance with:
- Request/response interceptors
- Authentication token handling
- Error handling for common HTTP status codes
- Retry logic for failed requests

### Theme Configuration
Themes are configured in `src/main.css` with CSS custom properties:
- Light theme (default)
- Dark theme
- System preference detection

## Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload the build/ directory to Netlify
```

## Testing

The template is set up for testing with Vitest:

```bash
npm run test
```

## Code Quality

### ESLint Configuration
- React and TypeScript rules
- Prettier integration
- Import sorting
- Accessibility checks

### Pre-commit Hooks
Husky runs the following on each commit:
- Code formatting with Prettier
- Linting with ESLint
- Type checking with TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [TanStack](https://tanstack.com/) for the excellent developer tools
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
