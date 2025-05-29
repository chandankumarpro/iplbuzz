import { api } from "./axios";

export const fetchPlayerSearch = async (playerName: string) => {
  const response = await api.get('/stats/v1/player/search', { params: { plrN: playerName } });
  return response.data;
};

export const fetchPlayerStats = async (playerId: number) => {
  const response = await api.get(`/stats/v1/player/${playerId}`);
  return response.data;
};