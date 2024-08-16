'use client'
import { TypeCheckForm, Py, Region, Schedule, Contact, CallTime, Qna, Agree, Request } from "@/components/index";
import styles from '@/styles/EstimateForm.module.css'
import { reducer, initialState,  State } from '@/components/forms/EstimateFormReducer'
import { useReducer } from "react";

const EstimateForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handelInputValueChange = (type : keyof State, value: string | boolean) => {
        dispatch({type, value})
    }
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log('state 제출',state)
        // 여기에 서버로 state를 fetch해서 서버에 저장시켜야한다
        // 카톡 연동해서 전송, 알림 alert
        // 페이지 새로고침
    }
    return (
        <div className={styles.estimate_container}>
            <div className={styles.form_container}>
                <h3>문의내용 확인 후 1:1상담이 진행됩니다</h3>
                <form onSubmit={handleSubmit}>
                    <Region onChange={handelInputValueChange}/>
                    <TypeCheckForm onChange={handelInputValueChange}/>
                    <Py onChange={handelInputValueChange}/>
                    <Schedule onChange={handelInputValueChange}/>
                    <Contact onChange={handelInputValueChange}/>
                    <CallTime onChange={handelInputValueChange}/>
                    <Qna onChange={handelInputValueChange}/>
                    <Agree onChange={handelInputValueChange}/>
                    <Request />
                </form>
            </div>
        </div>
    )
}

export default EstimateForm;