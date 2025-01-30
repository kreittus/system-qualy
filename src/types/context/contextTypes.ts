export interface UserSession {
  userId: number;
  username: string;
  authToken: string;
}

export interface AuthContextType {
  userSession: UserSession | null;
  login: (token: string, username: string, id_user: number) => void;  
  logout: () => void;
}
