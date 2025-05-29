import { api } from "../../api/axios";
import { fetchPlayerSearch, fetchPlayerStats } from "../../api/playerApi";


jest.mock('../../api/axios');

const mockedApi = api as jest.Mocked<typeof api>;

describe('player Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchPlayerSearch should call correct API and return data', async () => {
    const mockData = { players: ['Virat Kohli'] };
    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchPlayerSearch('Virat Kohli');

    expect(mockedApi.get).toHaveBeenCalledWith('/stats/v1/player/search', {
      params: { plrN: 'Virat Kohli' },
    });

    expect(result).toEqual(mockData);
  });

  test('fetchPlayerStats should call correct API and return data', async () => {
    const mockData = { id: 7, name: 'Virat Kohli' };
    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchPlayerStats(7);

    expect(mockedApi.get).toHaveBeenCalledWith('/stats/v1/player/7');
    expect(result).toEqual(mockData);
  });
});
