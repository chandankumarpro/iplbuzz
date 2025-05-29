import React from "react";
import Highcharts from "highcharts";
import 'highcharts/modules/accessibility';
import HighchartsReact from "highcharts-react-official";

interface PlayerRankings {
  bat: {
    testBestRank: string;
    odiBestRank: string;
    t20BestRank: string;
  };
  bowl: {
    t20BestRank: string;
  };
  all: {
    t20BestRank: string;
  };
}

interface PlayerData {
  rankings: PlayerRankings;
}

interface PlayerBarChartProps {
  playerData: PlayerData;
  name: string;
}

const PlayerBarChart: React.FC<PlayerBarChartProps> = ({ playerData, name }) => {
  const extractPlayerChartData = (player: PlayerData) => {
    return {
      name: name,
      bestRanks: [
        parseInt(player.rankings.bat.testBestRank),
        parseInt(player.rankings.bat.odiBestRank),
        parseInt(player.rankings.bat.t20BestRank),
        parseInt(player.rankings.bowl.t20BestRank),
        parseInt(player.rankings.all.t20BestRank),
      ],
    };
  };

  const { bestRanks } = extractPlayerChartData(playerData);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: `${name} - Best Career Rankings`,
    },
    accessibility: {
      enabled: true,
      description: `${name} - Best Career Rankings`
    },
    xAxis: {
      categories: [
        "Test Bat",
        "ODI Bat",
        "T20 Bat",
        "T20 Bowl",
        "T20 All-round",
      ],
      title: { text: null },
      accessibility: {
        description: `categories`
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Ranking Position",
        align: "high",
      },
       accessibility: {
        description: `Ranking Position`
      }
    },
    tooltip: {
      valueSuffix: " rank",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: { enabled: false },
    series: [
      {
        name: "Best Rank",
        type: "column",
        data: bestRanks,
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PlayerBarChart;
