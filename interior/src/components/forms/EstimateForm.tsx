'use client'
import { TypeCheckForm, Py, Region, Schedule, Contact, CallTime, Qna, Agree, Request } from "@/components/index";
import styles from '@/styles/EstimateForm.module.css'
import { useState } from "react";
import { State, useFormDispatch, useForms } from '@/components/forms/FormContext'
import { useReCaptcha } from "next-recaptcha-v3";

const EstimateForm = () => {
    const state = useForms()
    const dispatch = useFormDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const { executeRecaptcha } = useReCaptcha();


    // 폼 전체를 초기화하는 함수
    const resetForm = () => {
        dispatch({ type: 'RESET_FORM' });
    }

    // DB에 Form전송
    const sendEstimateForm = async (state: {}) => {
        const token = await executeRecaptcha("reservation");
        try {
            const response = await fetch('/api/db/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ state, token })
            })
            const result = await response.json()
        } catch (error) {
            console.error("서버전송Error", error)
        }
    }
    // 폼검증 함수
    const verifyFormValue = (formValue: State) => {
        const regex = /^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;
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
        } else if (!regex.test(formValue.contact)) {
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
    const sendSmsToUser = async (textContent: string, contact: string) => {
        try {
            const response = await fetch('/api/twilio/sendTextMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ textContent, contact })
            })
            const result = await response.json()
            if (result.success) console.log('문자전송성공')
            else console.log('문자전송실패')
        } catch (error) {
            console.log('트윌로 문자요청 error', error)
        }
    }

    const sendEmailToAdmin = async (state: {}) => {
        try {
            const response = await fetch('/api/nodemailer/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ state })
            })
            const result = await response.json()
            if (result.success) console.log('메일전송성공')
            else console.log('메일전송실패')
        } catch (error) {
            console.log('nodemailer Error', error)
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // 유저에게 메세지 전송
        const textContent = `
        [집돌이즘] 상담이 접수 되었습니다.
        `
        if (verifyFormValue(state)) {
            sendEstimateForm(state)
            alert('상담이 접수되었습니다')
            resetForm()
            sendSmsToUser(textContent, state.contact)
        }
        // 관리자에게 nodemailer로 이메일전송
            sendEmailToAdmin(state)
        // 페이지 새로고침
    }
    return (
        <div className={styles.estimate_container}>
            <div className={styles.form_container}>
                <h3>문의내용 확인 후 1:1상담이 진행됩니다</h3>
                <form onSubmit={handleSubmit}>
                    <Region />
                    <TypeCheckForm />
                    <Py />
                    <Schedule />
                    <Contact />
                    <CallTime />
                    <Qna />
                    <Agree />
                    <Request />
                    {errorMessage !== '' && <p style={{ color: 'red', margin: '1rem 0' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default EstimateForm;
