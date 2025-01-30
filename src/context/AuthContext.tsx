'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContextType, UserSession } from '@/types/context/contextTypes';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Provider que gerencia a autenticação da aplicação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const router = useRouter();

  //Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const username = Cookies.get('username');
    const userId = Cookies.get('userId');

    //Se o token existir, mantém o usuário logado
    if (authToken && username && userId) {
      try {
        setUserSession({
          userId: Number(userId),
          username: username,
          authToken: authToken,
        });
      } catch (error) {
        console.error('Erro ao verificar autenticação no AuthProvider:', error);
        logout();
      }
    }
  }, []);

  //Função para realizar o login
  const login = (token: string, username: string, id_user: number) => {
    Cookies.set('authToken', token, { expires: 60 * 60}); // 1 hour
    Cookies.set('username', username, { expires: 60 * 60}); 
    Cookies.set('userId', String(id_user), { expires: 60 * 60});

    //Atualiza o estado global com os dados do usuário
    setUserSession({
      userId: Number(id_user),
      username: username,
      authToken: token,
    });
  };

  //Função de logout que limpa os cookies e reseta a sessão
  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('username');
    Cookies.remove('userId');

    setUserSession(null);
    router.push('/auth/login');
  };

  //Provedor do contexto que disponibiliza o login/logout e o estado do usuário globalmente
  return (
    <AuthContext.Provider value={{ userSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hook para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
