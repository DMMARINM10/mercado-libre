import Home from '@/app/page';
import { render } from '@testing-library/react';

describe('Home Page component', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});