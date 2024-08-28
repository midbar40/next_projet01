export type State = {
    id: string;
    pw: string;
    name: string;
    contact: string;
    email: string;
}

export type Action = {
    type: keyof State;
    value: string;
}

export const initialState: State = {
    id: '',
    pw: '',
    name: '',
    contact: '',
    email: ''
}

export function reducer(state: State, action: Action): State {
    return {
        ...state,
        [action.type]: action.value
    }
}

