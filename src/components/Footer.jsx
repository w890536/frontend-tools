import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>© 2025 Frontend Tools. All rights reserved.</p>
          <div className={styles.links}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a 
              href="mailto:contact@frontend-tools.com" 
              className={styles.link}
              aria-label="聯絡我們"
            >
              聯絡我們
            </a>
          </div>
        </div>
        <p className={styles.description}>
          免費的前端開發工具集，幫助開發者提高工作效率
        </p>
      </div>
    </footer>
  );
}