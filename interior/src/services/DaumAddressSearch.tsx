'use client';

import { useRef, useEffect } from 'react';
import styles from '../styles/DaumAddressSearch.module.css'
import { State } from '../components/forms/EstimateFormReducer'


interface DaumAddressSearchProps {
    onChange: (type: keyof State, value: string | boolean) => void;
}
// React.FC는 전체 컴포넌트를 타입으로 지정할 때 사용하며, export default function 문법과는 함께 사용되지 않습니다.
export default function DaumAddressSearch({ onChange } : DaumAddressSearchProps) {
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

                //  주소 정보를 해당 필드에 넣는다.

                if (addressRef.current) {
                    addressRef.current.value = addr;
                        const type = addressRef.current.name as keyof State
                        const value = addressRef.current.value as string
                        console.log('type:', type, 'value:', value);
                        onChange(type, value)
                }

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
            <input type="text" name='juso' ref={addressRef} placeholder="주소" id="sample6_address" className={styles.juso} /><br />
            <input type="text" name='detailJuso' ref={detailAddressRef} placeholder="상세주소" id="sample6_detailAddress" className={styles.detailJuso}
            onBlur={() => {
                    // 사용자가 상세주소 입력 후, 포커스가 빠져나갈 때 상태를 업데이트
                    if (detailAddressRef.current) {
                        const type = detailAddressRef.current.name as keyof State;
                        onChange(type, detailAddressRef.current.value);
                    }
                }} />
        </div>
    );
}
