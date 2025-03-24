'use client'
import { createContext, useReducer, useContext, ReactNode } from 'react';

// 상태의 타입 정의
export type State = {
    juso: string;
    detailJuso: string;
    homeType: string;
    py: string;
    schedule: string;
    contact: string;
    callTime: string;
    qna: string;
    agree: boolean;
};

// 액션 타입 정의
export type Action =
    | { type: 'RESET_FORM' }  // 폼 전체 초기화 액션
    | { type: keyof State; value: string | boolean };  // 단일 필드 업데이트 액션

// 초기 상태 정의
export const initialState: State = {
    juso: '',
    detailJuso: '',
    homeType: '',
    py: '',
    schedule: '',
    contact: '',
    callTime: '',
    qna: '',
    agree: false,
};

// 리듀서 함수 정의
function stateReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'RESET_FORM':
            return initialState;  // 폼 초기화
        default:
            return {
                ...state,
                [action.type]: action.value,  // 필드 업데이트
            };
    }
}

// Context 생성
export const FormContext = createContext<State | undefined>(undefined);
export const FormDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export function useForms() {
    const context = useContext(FormContext)
    if (context === undefined) {
        throw new Error('useFormDispatch must be used within a FormProvider');
    }
    return context;
}

export function useFormDispatch() {
    const context = useContext(FormDispatchContext);
    if (context === undefined) {
        throw new Error('useFormDispatch must be used within a FormProvider');
    }
    return context;
}

interface FormProviderProps {
    children: ReactNode;
}

// Provider 컴포넌트
export function FormProvider({ children }: FormProviderProps) {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    return (
        <FormContext.Provider value={state}>
            <FormDispatchContext.Provider value={dispatch}>
                {children}
            </FormDispatchContext.Provider>
        </FormContext.Provider>
    );
}
