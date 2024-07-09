import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import RootLayout from '@/app/layout';

const child = <div data-testid="test-child">Child Component</div>
const inputPlaceholder = 'Nunca dejes de buscar'

// Mock the Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));
  
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

describe('Main Layout component', () => {
  it('should render SearchBar and children correctly', async() => {
    render(
      <RootLayout>
        {child}
      </RootLayout>
    );

    //Testing SearchBar is in the document
    const input = screen.getByPlaceholderText(inputPlaceholder);
    expect(input).toBeInTheDocument();

    const childComponent = screen.getByTestId('test-child');
    expect(childComponent).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<RootLayout>{child}</RootLayout>);
    expect(asFragment()).toMatchSnapshot();
  });
});
