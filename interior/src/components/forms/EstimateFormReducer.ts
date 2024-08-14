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
export type Action = {
    type: keyof State;
    value: string | boolean;
};

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
    return {
        ...state,
        [action.type]: action.value
    };
}