import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛠️</span>
          Frontend Tools
        </Link>
        <nav className={styles.nav} role="navigation" aria-label="主要導航">
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            首頁
          </Link>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>
              工具 ▼
            </button>
            <div className={styles.dropdownContent}>
              <Link 
                to="/gradient" 
                className={`${styles.dropdownLink} ${location.pathname === '/gradient' ? styles.active : ''}`}
              >
                漸層生成器
              </Link>
              <Link 
                to="/color-picker" 
                className={`${styles.dropdownLink} ${location.pathname === '/color-picker' ? styles.active : ''}`}
              >
                顏色選擇器
              </Link>
              <Link 
                to="/json-formatter" 
                className={`${styles.dropdownLink} ${location.pathname === '/json-formatter' ? styles.active : ''}`}
              >
                JSON 格式化
              </Link>
              <Link 
                to="/base64-converter" 
                className={`${styles.dropdownLink} ${location.pathname === '/base64-converter' ? styles.active : ''}`}
              >
                Base64 轉換
              </Link>
              <Link 
                to="/url-encoder" 
                className={`${styles.dropdownLink} ${location.pathname === '/url-encoder' ? styles.active : ''}`}
              >
                URL 編碼
              </Link>
              <Link 
                to="/hash-generator" 
                className={`${styles.dropdownLink} ${location.pathname === '/hash-generator' ? styles.active : ''}`}
              >
                Hash 生成器
              </Link>
              <Link 
                to="/text-counter" 
                className={`${styles.dropdownLink} ${location.pathname === '/text-counter' ? styles.active : ''}`}
              >
                文字計數器
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}