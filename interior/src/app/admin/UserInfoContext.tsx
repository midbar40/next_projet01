import { createContext, ReactNode, useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'

interface User {
    contact: string;
    address: string;
    type: string;
    py: string;
    schedule: string;
    callTime: string;
    qna: string;
    created_at: string;
}

// UserInfoContextType 타입 정의
interface UserInfoContextType {
    userInfo: User[];
    setUserInfo: Dispatch<SetStateAction<User[]>>;
}

interface DataLoadContextType {
    dataLoaded : boolean;
    setDataLoaded : Dispatch<SetStateAction<boolean>>;
}

// User 정보와 데이터 로드 상태에 대한 컨텍스트 생성
export const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);
export const DataLoadContext = createContext<DataLoadContextType | undefined>(undefined);

interface UserInfoProviderProps {
    children: ReactNode;
}

// UserInfoProvider와 DataLoadProvider를 분리하여 정의
export const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false); // 서버 데이터가 로드되었는지 여부

    const router = useRouter();
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch('/api/db/reservation');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const serverData = await response.json();
                setUserInfo(serverData.result.rows); // 서버 데이터에서 사용자 정보 추출
                setDataLoaded(true); // 데이터 로드 완료
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getUserData();
    }, [router]);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            <DataLoadContext.Provider value={{ dataLoaded, setDataLoaded }}>
                {children}
            </DataLoadContext.Provider>
        </UserInfoContext.Provider>
    );
};

// UserInfo와 DataLoad를 가져오는 커스텀 훅을 정의
export function useUserInfo() {
    const context = useContext(UserInfoContext);
    if (context === undefined) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
}

export function useDataLoaded() {
    const context = useContext(DataLoadContext);
    if (context === undefined) {
        throw new Error('useDataLoaded must be used within a DataLoadProvider');
    }
    return context;
}
