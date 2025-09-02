import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Home: () => <div data-testid="home-icon">Home</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  CheckSquare: () => <div data-testid="check-square-icon">CheckSquare</div>,
  Image: () => <div data-testid="image-icon">Image</div>,
}))

describe('Navigation', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders all navigation items', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Timer')).toBeInTheDocument()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(screen.getByText('Fridge')).toBeInTheDocument()
  })

  it('shows active state for current path', () => {
    mockUsePathname.mockReturnValue('/timer')
    render(<Navigation />)
    
    const timerLink = screen.getByText('Timer').closest('a')
    expect(timerLink).toHaveClass('active')
  })

  it('applies correct navigation link classes', () => {
    render(<Navigation />)
    
    const navLinks = screen.getAllByRole('link')
    navLinks.forEach(link => {
      expect(link).toHaveClass('nav-link')
    })
  })

  it('renders with correct structure', () => {
    render(<Navigation />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toHaveClass('fixed', 'top-0', 'left-0', 'right-0')
  })
})
