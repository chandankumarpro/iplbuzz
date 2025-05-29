import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlayerProfileCard.scss';
import { playerData } from '../../../data/playerData';
import { fetchPlayerSearch, fetchPlayerStats } from '../../../api/playerApi';
import PlayerBarChart from './PlayerBarChart';

interface PlayerStats {
  image: string;
  name: string;
  DoB: string;
  height: string;
  role: string;
  bat: string;
  bowl: string;
  birthPlace: string;
  teams: string;
  bio: string;
  rankings: {
    bat: {
      testRank: string;
      testBestRank: string;
      odiRank: string;
      odiBestRank: string;
      t20Rank: string;
      t20BestRank: string;
    };
    bowl: {
      t20BestRank: string;
    };
    all: {
      t20BestRank: string;
    };
  };
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return value === index ? <div className="tab-panel">{children}</div> : null;
};

const PlayerProfileCard: React.FC = () => {
  const { name: searchTerm } = useParams<{ name: string }>();
  const [tab, setTab] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>(playerData);

  const handleTabChange = (newValue: number) => setTab(newValue);

  const fetchData = useCallback(async () => {
    if (!searchTerm) return;

    try {
      const playerRes: any = await fetchPlayerSearch(searchTerm);
      const id = playerRes?.player?.[0]?.id;

      if (id) {
        const statsRes: any = await fetchPlayerStats(id);
        console.log("statsRes", statsRes);
        if (!statsRes || Object.keys(statsRes).length === 0) {
          setPlayerStats(playerData);
        } else {
          setPlayerStats(statsRes);
        }
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    //fetchData();
  }, [fetchData]);

  const renderPlayerBasicStats = () => (
    <div className="player-basic">
      <div className="avatar">
        <img
          src={playerStats.image}
          alt={playerStats.name}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="fallback">{playerStats.name?.[0]?.toUpperCase()}</span>
      </div>

      <div className="details">
        <h2>{searchTerm}</h2>
        <p className="subtitle">{searchTerm?.split(" ").slice(-1)[0]}</p>
        <p>
          <strong>Born:</strong> {playerStats.DoB}
        </p>
        <p>
          <strong>Height:</strong> {playerStats.height}
        </p>
        <p>
          <strong>Role:</strong> {playerStats.role}
        </p>
        <p>
          <strong>Batting Style:</strong> {playerStats.bat}
        </p>
        <p>
          <strong>Bowling Style:</strong> {playerStats.bowl}
        </p>
        <p>
          <strong>Birthplace:</strong> {playerStats.birthPlace}
        </p>
        <div className="teams">
          {playerStats.teams.split(", ").map((team) => (
            <span key={team} className="chip">
              {team}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <section className="tabs" aria-labelledby='Player statistics'>
      <button
        type='button'
        className={tab === 0 ? 'active' : ''}
        onClick={() => handleTabChange(0)}
        aria-label='Player Profile'
      >
        Profile
      </button>
      <button
        type='button'
        className={tab === 1 ? 'active' : ''}
        onClick={() => handleTabChange(1)}
        aria-label='Player Rankings'
      >
        Rankings
      </button>
    </section>
  );

  const renderProfileTab = () => (
    <TabPanel value={tab} index={0}>
      <div className="bio" dangerouslySetInnerHTML={{ __html: playerStats.bio }} />
    </TabPanel>
  );

  const renderRankingTab = () => (
    <TabPanel value={tab} index={1}>
      <section className="ranking-grid" aria-labelledby='Player ranking details'>
        <section className="ranking-item" aria-labelledby='Player rankings'>
          <h3>Batting Rankings</h3>
          <p>Test Rank: {playerStats.rankings.bat.testRank} (Best: {playerStats.rankings.bat.testBestRank})</p>
          <p>ODI Rank: {playerStats.rankings.bat.odiRank} (Best: {playerStats.rankings.bat.odiBestRank})</p>
          <p>T20 Rank: {playerStats.rankings.bat.t20Rank} (Best: {playerStats.rankings.bat.t20BestRank})</p>

          <h3>Bowling Rankings</h3>
          <p>T20 Best Rank: {playerStats.rankings.bowl.t20BestRank}</p>

          <h3>All-round Rankings</h3>
          <p>T20 Best Rank: {playerStats.rankings.all.t20BestRank}</p>
        </ section>
        <section className="ranking-item" aria-label='Player rankings chart'>
          <PlayerBarChart playerData={playerStats} name={searchTerm || ''} />
        </section>
      </section>
    </TabPanel>
  );

  return (
    <div className="player-card">
      {renderPlayerBasicStats()}
      {renderTabs()}
      {renderProfileTab()}
      {renderRankingTab()}
    </div>
  );
};

export default PlayerProfileCard;
