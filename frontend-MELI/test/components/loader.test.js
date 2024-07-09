import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '@/components/Loader';

describe('Loader component', () => {
  it('data-testid loader is in the document', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});