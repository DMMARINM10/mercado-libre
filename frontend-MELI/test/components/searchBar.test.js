import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const inputPlaceholder = 'Nunca dejes de buscar'
const logoAltText = 'Mercado Libre Logo'

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SearchBar component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    usePathname.mockReturnValue('/items');
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('test search'),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search bar with initial input value', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(inputPlaceholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test search');
  });

  it('should update the input value when typed into', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(inputPlaceholder);
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(input).toHaveValue('new search');
  });

  it('should navigate to /items with the search query when the search button is clicked', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(inputPlaceholder);
    fireEvent.change(input, { target: { value: 'new search' } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith('/items?search=new search');
  });

  it('should navigate to /items with the search query when Enter key is pressed', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(inputPlaceholder);
    fireEvent.change(input, { target: { value: 'new search' } });
    fireEvent.keyDown(input, { code: 'Enter' });
    expect(mockRouter.push).toHaveBeenCalledWith('/items?search=new search');
  });

  it('should reset input value when pathname is not /items', () => {
    usePathname.mockReturnValue('/other-path');
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(inputPlaceholder);
    expect(input).toHaveValue('');
  });

  it('should navigate to home page when logo is clicked', () => {
      render(<SearchBar />);
      const logo = screen.getByAltText(logoAltText);
      fireEvent.click(logo);
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });

  it('should match the snapshot', () => {
    const { asFragment } = render(<SearchBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
