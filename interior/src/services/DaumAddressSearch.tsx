'use client';

import { useRef, useState } from 'react';
import styles from '../styles/DaumAddressSearch.module.css'
import { useFormDispatch, useForms } from '@/components/forms/FormContext'

// React.FC는 전체 컴포넌트를 타입으로 지정할 때 사용하며, export default function 문법과는 함께 사용되지 않습니다.
export default function DaumAddressSearch() {
    const dispatch = useFormDispatch()
    const state = useForms()
    const addressRef = useRef<HTMLInputElement | null>(null);
    const detailAddressRef = useRef<HTMLInputElement | null>(null);

    const handlePostcode = () => {
        new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
                let addr = ''; // 주소 변수
                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }
                // 주소 상태 업데이트
                dispatch({ type: 'juso', value: addr });

                // 상세주소로 커서 이동
                if (detailAddressRef.current) {
                    detailAddressRef.current.focus();
                }

            }
        }).open();
    };

    return (
        <div>
            <input type="button" onClick={handlePostcode} value="주소 검색" className={styles.button} /><br />
            <input type="text" name='juso' ref={addressRef} placeholder="주소" id="sample6_address" className={styles.juso}
                value={state?.juso || ''}
                onChange={(e) => {
                    const value = e.target.value;
                    dispatch({ type: 'juso', value: value});
                }} /><br />
            <input type="text" name='detailJuso' ref={detailAddressRef} placeholder="상세주소" id="sample6_detailAddress" className={styles.detailJuso}
                value={state?.detailJuso || ''}
                onChange={(e) => {
                    const value = e.target.value;
                    dispatch({ type: 'detailJuso', value: value});
                }}
            />
        </div>
    );
}
