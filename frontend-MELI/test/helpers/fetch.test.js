import { fetcher, getItem } from "@/helpers/fetch";

const resolvedData = { data: 'Test' }

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(resolvedData),
  })
);

afterEach(() => {
  fetch.mockClear();
});

describe('fetcher function', () => {
  const url = 'https://random-url.com'
  it('should return data when response is ok', async () => {
    const data = await fetcher(url);
    expect(data).toEqual(resolvedData);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('should throw an error when response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(fetcher(url)).rejects.toThrow();
  });
});

describe('getItem function', () => {
  const id = 1;
  it('should return data and error false when response is ok', async () => {
    const data = await getItem(id);
    expect(data).toEqual({
      data: resolvedData,
      error: false,
    });
    expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  });

  it('should return error true when response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const data = await getItem(id);
    expect(data).toEqual({
      error: true,
      data: null,
    });
  });

  it('should return error true and data null when fetch fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
    
    const data = await getItem(id);
    expect(data).toEqual({
      error: true,
      data: null,
    });
  });
});
