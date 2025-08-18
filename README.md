# Mini Seller Console

A modern, responsive sales management dashboard built with React and TypeScript, designed to help sales teams efficiently manage leads and opportunities. The application follows Atomic Design principles and implements a clean, scalable architecture with React Context API for state management.

## 🚀 Features

- **Lead Management**: View, filter, and manage sales leads with comprehensive details
- **Opportunity Tracking**: Convert leads to opportunities and track conversion progress
- **Advanced Filtering**: Search, filter by status, and sort leads/opportunities
- **Responsive Design**: Modern UI that works seamlessly across all devices
- **Real-time Updates**: Instant feedback and state management
- **Data Persistence**: Local storage integration for data persistence
- **Virtual Scrolling**: Efficient rendering of large datasets using react-window

## 🏗️ Architecture

The project follows a well-structured, scalable architecture:

### Component Organization (Atomic Design)

- **Atoms**: Basic UI components (Button, Input, Loading, Badge, etc.)
- **Molecules**: Composite components (Table, Modal, Dropdown, etc.)
- **Organisms**: Complex UI sections (Drawer, TableSection, etc.)
- **Templates**: Layout components (MainLayout)
- **Pages**: Main application views (Home)

### State Management

- **React Context API**: Centralized state management for business logic
- **Custom Hooks**: Reusable logic separated from UI components
- **Context Separation**: Business logic centralized in dedicated context files
- **Minimal Prop Drilling**: Components access context directly for cleaner code

### Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # State management and business logic
├── pages/             # Application views
├── utils/             # Helper functions and utilities
└── mocks/             # Sample data for development
```

## 🛠️ Technologies

- **Frontend Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.12 with PostCSS
- **State Management**: React Context API
- **Testing**: Vitest 3.2.4 + React Testing Library
- **Code Quality**: ESLint 9.30.1 + Prettier 3.6.2
- **Performance**: React Window for virtual scrolling
- **UI Components**: Custom component library with Flowbite integration

## 📋 Prerequisites

- **Node.js**: Version 22.12.0 (as specified in package.json)
- **Package Manager**: Yarn (recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mini-seller-console
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn dev
```

The application will open at `http://localhost:5173` with hot reload enabled.

### 4. Build for Production

```bash
yarn build
```

### 5. Run Tests

```bash
yarn test
```

### 6. Lint Code

```bash
yarn lint
```

## 🔧 Development

### Project Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run test suite
- `yarn lint` - Check code quality
- `yarn preview` - Preview production build

### Key Components

#### TableSection

- **LeadsTab**: Displays and manages sales leads
- **OpportunitiesTab**: Shows converted opportunities
- **Virtual Scrolling**: Efficient rendering of large datasets
- **Row Actions**: Click to view details, convert leads

#### Filters

- **Search**: Text-based filtering across all fields
- **Status Filter**: Filter by lead/opportunity status
- **Sorting**: Ascending/descending order by various fields

#### Context System

- **HomeContext**: Main application state and business logic
- **Lead Management**: CRUD operations for leads
- **Opportunity Conversion**: Lead-to-opportunity workflow
- **Filter State**: Centralized filtering and search logic

## 🎯 Business Logic

### Lead Management

- View lead details (name, company, email, source, score, status)
- Filter leads by various criteria
- Convert qualified leads to opportunities
- Update lead information in real-time

### Opportunity Tracking

- Track converted leads as opportunities
- Monitor conversion progress
- Maintain conversion history and timestamps

### Data Flow

1. **Initial Load**: Simulated delay with loading state
2. **Data Fetching**: Mock data integration (easily replaceable with real APIs)
3. **State Updates**: Real-time updates through React Context
4. **Persistence**: Local storage integration for data retention

## 🧪 Testing

The project includes comprehensive testing setup with extensive coverage of all major components:

### Test Coverage

- **Component Testing**: All UI components are thoroughly tested using React Testing Library
- **Unit Tests**: Individual component functionality and props validation
- **Integration Tests**: Component interactions and context integration
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Responsive Design Tests**: Mobile and desktop behavior validation

### Tested Components

#### Atoms (Basic UI Components)

- **Button**: Variants, sizes, interactions, accessibility
- **Loading**: Different sizes, fullScreen mode, styling
- **Input**: Form handling, validation, edit modes
- **Select**: Options rendering, value handling, styling

#### Molecules (Composite Components)

- **Modal**: Open/close states, keyboard events, accessibility, body scroll management
- **Table**: Data rendering, row interactions, custom renderers, responsive behavior
- **Tabs**: Tab switching, disabled states, content rendering, responsive design
- **Dropdown**: Positioning, mouse events, portal rendering, item interactions

#### Organisms (Complex UI Sections)

- **Drawer**: Open/close states, overlay interactions, positioning, accessibility

#### Templates & Pages

- **MainLayout**: Children rendering, styling, responsive behavior
- **LeadsTab**: Data rendering, loading states, empty states, context integration
- **LeadActions**: Business logic, dropdown functionality, context usage
- **EmptyTableState**: Icon rendering, text display, responsive styling

### Testing Technologies

- **Vitest**: Fast unit testing framework powered by Vite
- **React Testing Library**: User-centric testing utilities
- **Jest DOM**: Custom matchers for DOM testing
- **Mocking**: Comprehensive mocking of contexts, hooks, and external dependencies

### Test Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   └── ...
│   ├── molecules/
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.test.tsx
│   │   └── ...
│   └── ...
└── pages/
    └── Home/
        └── TableSection/
            └── components/
                ├── LeadActions.tsx
                ├── LeadActions.test.tsx
                └── ...
```

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test Button.test.tsx
```

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS:

- Responsive grid layouts
- Adaptive component sizing
- Touch-friendly interactions
- Cross-device compatibility

## 🔮 Future Enhancements

- API integration for real data
- Advanced analytics and reporting
- User authentication and roles
- Real-time collaboration features
- Export functionality (CSV, PDF)
- Advanced filtering and search

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Maintain component reusability
4. Write tests for new features
5. Follow the established naming conventions

### Testing Guidelines

#### Writing Tests

- **Coverage**: Aim for 90%+ test coverage on new components
- **User Behavior**: Test from the user's perspective using React Testing Library
- **Accessibility**: Include tests for ARIA attributes and keyboard navigation
- **Responsive Design**: Test mobile and desktop behavior
- **Edge Cases**: Test error states, loading states, and boundary conditions

#### Test Structure

- Use descriptive test names that explain the expected behavior
- Group related tests using `describe` blocks
- Test one specific behavior per test case
- Use proper setup and teardown with `beforeEach` and `afterEach`
- Mock external dependencies and contexts appropriately

#### Test Examples

```typescript
describe('Button Component', () => {
  it('should render with primary variant by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable Button</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using modern web technologies and best practices.
