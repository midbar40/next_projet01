'use client';

import { useRef, useState } from 'react';
import styles from '../styles/DaumAddressSearch.module.css'
import { State } from '../components/forms/EstimateFormReducer'


interface DaumAddressSearchProps {
    onChange: (type: keyof State, value: string | boolean) => void;
}
// React.FC는 전체 컴포넌트를 타입으로 지정할 때 사용하며, export default function 문법과는 함께 사용되지 않습니다.
export default function DaumAddressSearch({ onChange }: DaumAddressSearchProps) {
    const addressRef = useRef<HTMLInputElement | null>(null);
    const detailAddressRef = useRef<HTMLInputElement | null>(null);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');


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

                // 주소 상태 업데이트
                setAddress(addr);
                onChange('juso', addr);

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
               value={address}
               onChange={(e) => {
                    const value = e.target.value;
                    setAddress(value);
                    onChange('juso', value.trim());
                }} /><br />
            <input type="text" name='detailJuso' ref={detailAddressRef} placeholder="상세주소" id="sample6_detailAddress" className={styles.detailJuso}
                value={detailAddress}
                onChange={(e) => {
                    const value = e.target.value;
                    setDetailAddress(value);
                    onChange('detailJuso', value.trim());
                }}
            />
        </div>
    );
}
