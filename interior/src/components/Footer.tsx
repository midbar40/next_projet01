import styles from '../styles/Footer.module.css';
const Footer: React.FC = () => {
  return (
    <div>
      {/* '집도리즘' 집돌'IS 집돌IS 도 좋은듯 */}
      <span>집돌이즘</span>
      <span>집돌이</span>
      <span>123-45-78945</span>
      <span className={styles.lastSpan}>대전광역시 유성구 원신흥로 000 000호(000동 00, 000오피스텔)</span>
      <div>
        <p>©2024 집돌이즘 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Footer;
