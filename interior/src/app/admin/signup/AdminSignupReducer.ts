export type State = {
    id: string;
    pw: string;
    name: string;
    contact: string;
    email: string;
}

export type Action =
    | { type: 'RESET_FORM' }  // 폼 전체 초기화 액션
    | { type: keyof State; value: string | boolean };  // 단일 필드 업데이트 액션


export const initialState: State = {
    id: '',
    pw: '',
    name: '',
    contact: '',
    email: ''
}

export function reducer(state: State, action: Action): State {
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

