import { TypeCheckForm, Py, Region, Schedule, Contact, CallTime, Qna, Agree, Request } from "@/components/index";
import styles from '../../styles/EstimateForm.module.css'

const EstimateForm = () => {
    return (
        <div className={styles.estimate_container}>
            <div>
                <p>상담을 남겨주시면 내용을 확인해서 연락드립니다</p>
            </div>
            <div className={styles.form_container}>
                <form action="">
                    <Region />
                    <TypeCheckForm />
                    <Py />
                    <Schedule />
                    <Contact />
                    <CallTime />
                    <Qna />
                    <Agree />
                    <Request />
                </form>
            </div>
        </div>
    )
}

export default EstimateForm