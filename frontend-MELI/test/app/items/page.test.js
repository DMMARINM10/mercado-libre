import { useSearchParams } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useSWR from 'swr';
import Items from '@/app/items/page';
import { formatNumber } from '@/helpers/utils';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('swr', () => jest.fn());

describe('Items Page Component', () => {
  beforeEach(() => {
      jest.clearAllMocks();
      useSearchParams.mockReturnValue({
          get: () => 'test-search',
        });
    });
    
    it('renders nothing when search param is empty string', () => {
        useSearchParams.mockReturnValue({
            get: () => '',
        });
        useSWR.mockReturnValue({
            data: null,
            error: null,
            isLoading: null,
        });
        
        render(<Items />);
        
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        expect(screen.queryByTestId('error')).not.toBeInTheDocument();
        expect(screen.queryByTestId('item-page-data')).not.toBeInTheDocument();
  });

  it('renders Loader when loading', () => {
    useSWR.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<Items />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders Error when there is an error', () => {
    useSWR.mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<Items />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('renders items when data is available', () => {
    const mockData = {
          categories: ['cat1', 'cat2'],
          items: [
                      {
                          id: '1',
                          picture: 'http://picture1.jpg',
                          price: { amount: 100 },
                          title: 'item1',
                          seller: 'seller1',
                          free_shipping: true,
                      },
                      {
                          id: '2',
                          picture: 'http://picture2.jpg',
                          price: { amount: 200 },
                          title: 'item2',
                          seller: 'seller2',
                          free_shipping: false,
                      },
                ],
            }
    useSWR.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<Items />);

    const dataContainer = screen.getByTestId('items-page-data');
    expect(dataContainer).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    useSWR.mockReturnValue({
        data: {
          categories: ['cat1', 'cat2'],
          items: [
                      {
                          id: '1',
                          picture: 'http://picture1.jpg',
                          price: { amount: 100 },
                          title: 'item1',
                          seller: 'seller1',
                          free_shipping: true,
                      },
                      {
                          id: '2',
                          picture: 'http://picture2.jpg',
                          price: { amount: 200 },
                          title: 'item2',
                          seller: 'seller2',
                          free_shipping: false,
                      },
                  ],
              },
        error: null,
        isLoading: false,
      });
    const { asFragment } = render(<Items />);
    expect(asFragment()).toMatchSnapshot();
  });
});
