'use client';

import { useRef, useEffect } from 'react';
import styles from '../styles/DaumAddressSearch.module.css'

export default function DaumAddressSearch() {
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
            <input type="button" onClick={handlePostcode} value="주소 검색" className={styles.button}/><br />
            <input type="text" ref={addressRef} placeholder="주소" id="sample6_address" className={styles.juso}/><br />
            <input type="text" ref={detailAddressRef} placeholder="상세주소" id="sample6_detailAddress" className={styles.detailJuso}/>
        </div>
    );
}
