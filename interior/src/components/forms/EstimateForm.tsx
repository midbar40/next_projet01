'use client'
import { TypeCheckForm, Py, Region, Schedule, Contact, CallTime, Qna, Agree, Request } from "@/components/index";
import styles from '@/styles/EstimateForm.module.css'
import { reducer, initialState, State } from '@/components/forms/EstimateFormReducer'
import { useReducer, useState } from "react";

const EstimateForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorMessage, setErrorMessage] = useState('')
    const handelInputValueChange = (type: keyof State, value: string | boolean) => {
        dispatch({ type, value })
    }
    // 폼 전체를 초기화하는 함수
    const resetForm = () => {
        dispatch({ type: 'RESET_FORM' });
    }

    const sendEstimateForm = async (state: {}) => {
        console.log('sendEstimateForm', state)
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ state })
            })
            const result = await response.json()
            console.log('sendEstimateForm result', result)


        } catch (error) {
            console.error("서버전송Error", error)
        }
    }
    // 폼검증 함수
    const verifyFormValue = (formValue: State) => {
        const regex = /^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;

        console.log('formValue', formValue)
        if (
            formValue.juso === '' ||
            formValue.detailJuso === '' ||
            formValue.schedule === '' ||
            formValue.contact === '' ||
            formValue.qna === ''
        ) {
            setErrorMessage('빈칸을 모두 입력해주세요')
            return false;
        }
        else if (
            formValue.homeType === '' ||
            formValue.py === '' ||
            formValue.callTime === ''
        ) {
            setErrorMessage('건물유형, 평형, 연락시간을 모두 선택주세요')
            return false;
        } else if(regex.test(formValue.contact)){
            setErrorMessage('핸드폰 번호를 올바르게 입력해주세요')
            return false;
        }
        else if (!formValue.agree) {
            setErrorMessage('개인정보동의에 체크해주세요')
            return false;
        } else {
            setErrorMessage('')
            return true;
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('무슨차이?', state)
        // form 검증, 서버전송
        if (verifyFormValue(state)) {
            sendEstimateForm(state)
            alert('상담이 접수되었습니다')
            resetForm()
            console.log('state 제출', state)
        }
        // 유저에게 메세지 전송
        // 관리자에게 nodemailer로 이메일전송
        // 페이지 새로고침
    }
    return (
        <div className={styles.estimate_container}>
            <div className={styles.form_container}>
                <h3>문의내용 확인 후 1:1상담이 진행됩니다</h3>
                <form onSubmit={handleSubmit}>
                    <Region onChange={handelInputValueChange} />
                    <TypeCheckForm onChange={handelInputValueChange} />
                    <Py onChange={handelInputValueChange} />
                    <Schedule onChange={handelInputValueChange} />
                    <Contact onChange={handelInputValueChange} />
                    <CallTime onChange={handelInputValueChange} />
                    <Qna onChange={handelInputValueChange} />
                    <Agree onChange={handelInputValueChange} />
                    <Request />
                    {errorMessage !== '' && <p style={{ color: 'red', margin: '1rem 0' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default EstimateForm;