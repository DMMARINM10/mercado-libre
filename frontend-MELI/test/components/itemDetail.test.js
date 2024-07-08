import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetail from '@/components/ItemDetail';
import { itemCondition } from '@/data/items';
import { formatNumber } from '@/helpers/utils';

// Mock next/image
jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />;
});

describe('ItemDetail component', () => {
  const props = {
    id: '1',
    picture: 'http://random-url.jpg',
    description: 'Test description',
    condition: 'new',
    soldQuantity: 10,
    title: 'Test title',
    price: 1000
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the item detail with correct data', () => {
    render(<ItemDetail {...props} />);

    const image = screen.getByAltText(`picture-item-${props.id}`);
    expect(image).toBeInTheDocument();

    const description = screen.getByText(props.description);
    expect(description).toBeInTheDocument();

    const price = screen.getByText(`$ ${formatNumber(props.price)}`);
    expect(price).toBeInTheDocument();
    
    const conditionQuantity = screen.getByText(`${itemCondition(props.condition)} - ${props.soldQuantity} vendidos`);
    expect(conditionQuantity).toBeInTheDocument();

    const title = screen.getByText(props.title);
    expect(title).toBeInTheDocument();

    const buyButton = screen.getByText('Comprar');
    expect(buyButton).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<ItemDetail {...props}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});
