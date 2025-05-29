import { convertStatsToChartData, TeamStats } from "../../common/functions";
import type * as Highcharts from 'highcharts';


describe('convertStatsToChartData', () => {
  const sampleInput: TeamStats = {
    'Mumbai Indians': { wins: 8, losses: 6, played: 14 },
    'Chennai Super Kings': { wins: 9, losses: 5, played: 14 },
  };

  it('should return correct categories', () => {
    const result = convertStatsToChartData(sampleInput);
    expect(result.categories).toEqual(['Mumbai Indians', 'Chennai Super Kings']);
  });

  it('should return correct wins data', () => {
    const result = convertStatsToChartData(sampleInput);
    const winsSeries = result.series[0] as Highcharts.SeriesColumnOptions;
    expect(winsSeries.name).toBe('Wins');
    expect(winsSeries.data).toEqual([sampleInput['Mumbai Indians'].wins, sampleInput['Chennai Super Kings'].wins]);
    expect(winsSeries.color).toBe('#28a745');
  });

  it('should return correct losses data', () => {
    const result = convertStatsToChartData(sampleInput);
    const lossesSeries = result.series[1] as Highcharts.SeriesColumnOptions;
    expect(lossesSeries.name).toBe('Losses');
    expect(lossesSeries.data).toEqual([sampleInput['Mumbai Indians'].losses, sampleInput['Chennai Super Kings'].losses]);
    expect(lossesSeries.color).toBe('#dc3545');
  });

  it('should return correct total matches data', () => {
    const result = convertStatsToChartData(sampleInput);
    const playedSeries = result.series[2] as Highcharts.SeriesColumnOptions;
    expect(playedSeries.name).toBe('Total Matches');
    expect(playedSeries.data).toEqual([sampleInput['Mumbai Indians'].played, sampleInput['Chennai Super Kings'].played]);
    expect(playedSeries.color).toBe('#007bff');
  });
});
