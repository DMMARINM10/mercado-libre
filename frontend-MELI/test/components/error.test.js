import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '@/components/Error';

describe('Error component', () => {
  it('data-testid error is in the document', () => {
    render(<Error />)
    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});