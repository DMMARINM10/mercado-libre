import { render } from '@testing-library/react';
import Error from '@/components/Error';

describe('Error component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});