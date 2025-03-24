import { createContext, ReactNode, useState, Dispatch, SetStateAction, useContext, useEffect  } from 'react';
import { useRouter } from 'next/navigation'

// AuthContext 타입 정의
interface AuthContextType {
  authentication: boolean;
  setAuthentication: Dispatch<SetStateAction<boolean>>;
}

// createContext로 객체 생성 (undefined 초기화)
// 네임스페이스가 아니라 그냥 '객체'로 취급
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authentication, setAuthentication] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch('/api/auth/admin/check-auth', {
        credentials: 'include',
      })
      const result = await response.json()
      if (result.isLoggedIn) {
        setAuthentication(true)
        router.push('/admin/dashboard')

      } else {
        setAuthentication(false)
        router.push('/admin/login')
      }
    }

    checkLoginStatus()
  }, [router, authentication])
  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

