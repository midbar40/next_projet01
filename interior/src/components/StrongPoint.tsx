import styles from '../styles/StrongPoint.module.css';
const StrongPoint: React.FC = () => {
    return (
        <div className={styles.container}>
          <h2>집돌이즘의 차별화 포인트</h2>
          <div className={styles.points}><span>01</span><p>선택적 인테리어 시공, 합리적인 가격</p></div>
          <div className={styles.points}><span>02</span><p>전문자격 인증과 10년이상의 경력보유</p></div>
          <div className={styles.points}><span>03</span><p>대전에 소재지가 있는 전문 지역업체</p></div>
          <div className={styles.points}><span>04</span><p>아파트, 빌라, 주택, 상가 모든 타입의 인테리어 경력 보유</p></div>
        </div>
    );
};

export default StrongPoint;
