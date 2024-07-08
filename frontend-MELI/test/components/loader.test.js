import { render } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});