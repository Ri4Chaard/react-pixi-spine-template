import axios, { type AxiosInstance } from 'axios';

export interface HeroData {
  id: string;
  name: string;
  stats: Record<string, any>;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

export interface Score {
  userId: string;
  score: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// Герой
export const apiFetchHero = async (): Promise<HeroData> => {
  const { data } = await apiClient.get<HeroData>('/hero');
  return data;
};

// Аутентификация
export const apiLogin = async (
  creds: AuthCredentials
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', creds);
  return data;
};

// Профиль
export const apiFetchProfile = async () => {
  const { data } = await apiClient.get('/user/profile');
  return data;
};

// Таблица лидеров
export const apiFetchLeaderboard = async (): Promise<Score[]> => {
  const { data } = await apiClient.get<Score[]>('/leaderboard');
  return data;
};
