export interface DataRow {
  [key: string]: string | number | null | undefined;
}

export interface Match extends DataRow {
  Teams: string;
  Match_Winner?: string;
  Date?: string
}

export interface DataContextType {
  data: Match[];
}

export interface TeamStat {
  wins: number;
  losses: number;
  played: number;
}

export interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
}
