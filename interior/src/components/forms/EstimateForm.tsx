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
    const sendEstimateForm = async(state : {}) => {
        console.log('sendEstimateForm', state)
        try {
            const response = await fetch('/api/db',{
                method : 'POST',
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify({state})
            })
            const result = await response.json()
        console.log('sendEstimateForm result', result)

            
        } catch (error) {
            console.error("서버전송Error", error)
        }
    }
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log('state 제출',state)
        // 여기에 서버로 state를 fetch해서 서버에 저장시켜야한다
        sendEstimateForm(state)
        // 유저에게 메세지 전송
        // 관리자에게 nodemailer로 이메일전송
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