// 상태의 타입 정의
export type State = {
    juso: string,
    detailJuso: string,
    homeType: string,
    py: string,
    schedule: string,
    contact: string,
    callTime: string,
    qna: string,
    agree: boolean,
};

// 액션 타입 정의
export type Action =
    | { type: 'RESET_FORM' }  // 폼 전체 초기화 액션
    | { type: keyof State; value: string | boolean };  // 단일 필드 업데이트 액션

export const initialState : State = {
    juso: '',
    detailJuso: '',
    homeType: '',
    py:'',
    schedule: '',
    contact: '',
    callTime: '',
    qna: '',
    agree: false,
}

// 리듀서 함수
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