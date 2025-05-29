import { Match, TeamStat } from "./interfaces";

export type TeamStats = Record<string, TeamStat>;

export const getTeamStats = (matches: Match[]): TeamStats => {
  const stats: TeamStats = {};

  matches.forEach((match) => {
    const [team1, team2] = match.Teams.split(' vs ').map((team) => team.trim());
    const winner = match.Match_Winner?.trim();

    [team1, team2].forEach(team => {
      if (!stats[team]) {
        stats[team] = { wins: 0, losses: 0, played: 0 };
      }
      stats[team].played += 1;
    });

    if (winner && stats[winner]) {
      stats[winner].wins += 1;

      const loser = winner === team1 ? team2 : team1;
      if (stats[loser]) {
        stats[loser].losses += 1;
      }
    }
  });

  return stats;
};

export const convertStatsToChartData = (teamStats: TeamStats): {
  categories: string[];
  series: Highcharts.SeriesOptionsType[];
} => {
  const categories = Object.keys(teamStats);

  const wins = categories.map(team => teamStats[team].wins);
  const losses = categories.map(team => teamStats[team].losses);
  const played = categories.map(team => teamStats[team].played);

  return {
    categories,
    series: [
      {
        name: 'Wins',
        type: 'column',
        data: wins,
        color: '#28a745'
      },
      {
        name: 'Losses',
        type: 'column',
        data: losses,
        color: '#dc3545'
      },
      {
        name: 'Total Matches',
        type: 'column',
        data: played,
        color: '#007bff'
      }
    ]
  };
};

interface YearStats {
  played: number;
  wins: number;
  losses: number;
}

export interface TeamYearlyStats {
  year: string;
  played: number;
  wins: number;
  losses: number;
}

export interface TeamDateStats {
  team: string;
  data: TeamYearlyStats[];
}

export const summarizeTeamStats = (matches: Match[]): TeamDateStats[] => {
  const teamStats: Record<string, Record<string, YearStats>> = {};

  matches.forEach((match:any) => {
    const [team1, team2] = match.Teams.split(" vs ");
    const year = match.Date.split("-")[0];
    const winner = match.Match_Winner;

    [team1, team2].forEach((team) => {
      const isWinner = team === winner;

      if (!teamStats[team]) {
        teamStats[team] = {};
      }
      if (!teamStats[team][year]) {
        teamStats[team][year] = { played: 0, wins: 0, losses: 0 };
      }

      teamStats[team][year].played += 1;
      if (isWinner) {
        teamStats[team][year].wins += 1;
      } else {
        teamStats[team][year].losses += 1;
      }
    });
  });

  const result: TeamDateStats[] = Object.entries(teamStats).map(([team, yearsObj]) => ({
    team,
    data: Object.entries(yearsObj).map(([year, stats]) => ({
      year,
      ...stats,
    })),
  }));

  return result;
};

