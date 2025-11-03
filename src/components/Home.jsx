import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./Home.module.scss";

export default function Home() {
  const tools = [
    {
      title: "CSS 漸層生成器",
      description: "快速生成美麗的 CSS 漸層背景，支援多種漸層方向和顏色組合",
      path: "/gradient",
      icon: "🎨",
      features: ["線性漸層", "徑向漸層", "即時預覽", "一鍵複製"]
    },
    {
      title: "顏色選擇器",
      description: "專業的顏色選擇工具，支援多種顏色格式轉換",
      path: "/color-picker",
      icon: "🌈",
      features: ["HEX", "RGB", "HSL", "調色盤"]
    },
    {
      title: "JSON 格式化工具",
      description: "美化和驗證 JSON 資料，提升程式碼可讀性",
      path: "/json-formatter",
      icon: "📝",
      features: ["格式化", "壓縮", "驗證", "語法高亮"]
    },
    {
      title: "Base64 轉換器",
      description: "安全地編碼和解碼 Base64 格式的資料",
      path: "/base64-converter",
      icon: "🔐",
      features: ["編碼", "解碼", "文字轉換", "資料安全"]
    },
    {
      title: "URL 編碼工具",
      description: "處理 URL 中的特殊字符，確保網址正確傳輸",
      path: "/url-encoder",
      icon: "🔗",
      features: ["URL 編碼", "URL 解碼", "特殊字符", "網址處理"]
    },
    {
      title: "Hash 雜湊生成器",
      description: "生成文字的雜湊值，用於資料完整性驗證",
      path: "/hash-generator",
      icon: "🔒",
      features: ["SHA-256", "SHA-1", "MD5", "資料驗證"]
    },
    {
      title: "文字計數器",
      description: "統計文字的各種數據，包括字符數、單字數、閱讀時間",
      path: "/text-counter",
      icon: "📊",
      features: ["字符統計", "單字計數", "閱讀時間", "詳細分析"]
    }
  ];

  return (
    <div className={styles.home}>
      <Helmet>
        <title>Frontend Tools - 前端開發工具集</title>
        <meta
          name="description"
          content="免費線上前端開發工具集，包含 CSS 漸層生成器、顏色選擇器、JSON 格式化工具等實用功能。"
        />
      </Helmet>
      
      <section className={styles.hero}>
        <h1 className={styles.title}>Frontend Tools</h1>
        <p className={styles.subtitle}>
          免費的前端開發工具集，幫助開發者提高工作效率
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>實用工具</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>免費使用</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>0</span>
            <span className={styles.statLabel}>註冊需求</span>
          </div>
        </div>
      </section>

      <section className={styles.tools}>
        <h2 className={styles.sectionTitle}>選擇您需要的工具</h2>
        <div className={styles.toolGrid}>
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.path} 
              className={styles.toolCard}
              aria-label={`前往 ${tool.title}`}
            >
              <div className={styles.toolIcon}>{tool.icon}</div>
              <h3 className={styles.toolTitle}>{tool.title}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>
              <ul className={styles.toolFeatures}>
                {tool.features.map((feature, idx) => (
                  <li key={idx} className={styles.toolFeature}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <div className={styles.toolAction}>
                開始使用 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>為什麼選擇 Frontend Tools？</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>快速高效</h3>
            <p className={styles.featureDescription}>
              無需安裝，開啟瀏覽器即可使用，節省您的寶貴時間
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>隱私安全</h3>
            <p className={styles.featureDescription}>
              所有處理都在本地進行，不會上傳您的資料到伺服器
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📱</div>
            <h3 className={styles.featureTitle}>響應式設計</h3>
            <p className={styles.featureDescription}>
              完美支援桌面、平板和手機，隨時隨地都能使用
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}