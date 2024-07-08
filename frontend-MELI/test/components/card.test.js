import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/components/Card';
import { formatNumber } from '@/helpers/utils';
import shippingIcon from '@/assets/shipping-icon.png';

// Mock next/link and next/image
jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />;
});

describe('Card component', () => {
  const props = {
    id: '1',
    picture: 'http://random-url.jpg',
    amount: 1000,
    freeShipping: true,
    title: 'Test Title',
    seller: 'Test Seller'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the card with correct data', () => {
    render(<Card {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/items/${props.id}`);

    const image = screen.getByAltText(`picture-item-${props.id}`);
    expect(image).toBeInTheDocument();

    const price = screen.getByText(`$ ${formatNumber(props.amount)}`);
    expect(price).toBeInTheDocument();

    const shippingImage = screen.getByAltText('free shipping icon');
    expect(shippingImage).toBeInTheDocument();

    const title = screen.getByText(props.title);
    expect(title).toBeInTheDocument();

    const seller = screen.getByText(props.seller);
    expect(seller).toBeInTheDocument();
  });

  it('should not render the free shipping icon if freeShipping is false', () => {
    const modifiedProps = { ...props, freeShipping: false };
    render(<Card {...modifiedProps} />);

    const shippingImage = screen.queryByAltText('free shipping icon');
    expect(shippingImage).not.toBeInTheDocument();
  });


  it('should match the snapshot', () => {
    const { asFragment } = render(<Card {...props}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});
