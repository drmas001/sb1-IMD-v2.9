# IMD-Care: Internal Medicine Department Management System

A comprehensive patient management system designed specifically for internal medicine departments.

## Features

- Patient Management
- Appointment Scheduling
- Medical Records
- Department-wise Patient Distribution
- Real-time Updates
- Reporting System
- User Management
- Role-based Access Control

## Tech Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for backend
- Zustand for state management
- Vitest for testing
- Lucide React for icons

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/imd-care.git
   cd imd-care
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run coverage` - Generate test coverage report
- `npm run lint` - Run linter

## Deployment

The application is automatically deployed to Netlify when changes are pushed to the main branch.

## Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_S3_ACCESS_KEY_ID=your-s3-access-key
VITE_S3_SECRET_ACCESS_KEY=your-s3-secret-key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.