import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumb from '@/components/Breadcrumbs';

describe('Breadcrumb', () => {
  const props = {
    breadcrumb: ['Category 1', 'Category 2', 'Category 3']
  };

  it('should render the breadcrumb with correct categories and icons', () => {
    render(<Breadcrumb {...props} />);

    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(props.breadcrumb.length);
    
    breadcrumbItems.forEach((item, index) => {
        const textContent = item.textContent.trim();
        expect(textContent).toBe(props.breadcrumb[index]);
    });

    const icons = screen.queryAllByTestId('ArrowForwardIosIcon');
    expect(icons).toHaveLength(props.breadcrumb.length - 1);
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Breadcrumb {...props}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});
