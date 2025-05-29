import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Home from '../../../pages/Home/Home';
import { useDataContext } from '../../../contexts/DataContextProvider';
import { convertStatsToChartData, getTeamStats } from '../../../common/functions';

jest.mock('../../../contexts/DataContextProvider');
jest.mock('../../../common/functions');
jest.mock('highcharts/modules/accessibility', () => jest.fn());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('highcharts-react-official', () => () => <div>Mocked Chart</div>);
jest.mock('Highcharts', () => () => <div>Mocked Chart</div>);

const mockUseDataContext = useDataContext as jest.Mock;
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders team cards when data is available', () => {
    const mockStats = {
      "Mumbai Indians": { played: 10, wins: 6, losses: 4 },
    };

    mockUseDataContext.mockReturnValue({
      data: [{ dummy: 'match-data' }],
    });

    (getTeamStats as jest.Mock).mockReturnValue(mockStats);
    (convertStatsToChartData as jest.Mock).mockReturnValue({
      categories: ['Mumbai Indians'],
      series: [],
    });

    render(<Home />);

    expect(screen.getByText('Mumbai Indians')).toBeInTheDocument();
    expect(screen.getByText('Total played: 10')).toBeInTheDocument();
  });

  test('navigates when a team card is clicked', () => {
    const mockStats = {
      "Chennai Super Kings": { played: 12, wins: 8, losses: 4 },
    };

    mockUseDataContext.mockReturnValue({
      data: [{ dummy: 'match-data' }],
    });

    (getTeamStats as jest.Mock).mockReturnValue(mockStats);
    (convertStatsToChartData as jest.Mock).mockReturnValue({
      categories: ['Chennai Super Kings'],
      series: [],
    });

    render(<Home />);
    fireEvent.click(screen.getByText('Chennai Super Kings'));

    expect(mockNavigate).toHaveBeenCalledWith('/teams/Chennai%20Super%20Kings');
  });

  test('does not render chart if data is empty', () => {
    mockUseDataContext.mockReturnValue({ data: [] });

    render(<Home />);

    expect(screen.queryByText('Team Performance Overview')).not.toBeInTheDocument();
  });
});
