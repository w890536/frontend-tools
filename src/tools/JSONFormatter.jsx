import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./JSONFormatter.module.scss";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("請輸入 JSON 資料");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError(`JSON 格式錯誤: ${err.message}`);
      setOutput("");
    }
  }, [input]);

  const minifyJSON = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("請輸入 JSON 資料");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setError(`JSON 格式錯誤: ${err.message}`);
      setOutput("");
    }
  }, [input]);

  const validateJSON = useCallback(() => {
    if (!input.trim()) {
      setError("請輸入 JSON 資料");
      return;
    }

    try {
      JSON.parse(input);
      setError("");
      setOutput("✅ JSON 格式正確！");
    } catch (err) {
      setError(`❌ JSON 格式錯誤: ${err.message}`);
      setOutput("");
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [output]);

  const sampleJSON = `{
  "name": "Frontend Tools",
  "version": "1.0.0",
  "description": "免費的前端開發工具集",
  "tools": [
    {
      "name": "CSS 漸層生成器",
      "path": "/gradient",
      "features": ["線性漸層", "徑向漸層", "即時預覽"]
    },
    {
      "name": "顏色選擇器",
      "path": "/color-picker",
      "features": ["HEX", "RGB", "HSL"]
    },
    {
      "name": "JSON 格式化工具",
      "path": "/json-formatter",
      "features": ["格式化", "壓縮", "驗證"]
    }
  ],
  "author": "Frontend Tools Team",
  "license": "MIT"
}`;

  const loadSample = useCallback(() => {
    setInput(sampleJSON);
    setError("");
    setOutput("");
  }, [sampleJSON]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>JSON 格式化工具 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的 JSON 格式化工具，支援美化、壓縮、驗證 JSON 資料，提升程式碼可讀性和開發效率。"
        />
        <meta name="keywords" content="JSON formatter, JSON 格式化, JSON 驗證, JSON 美化, JSON 壓縮" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>JSON 格式化工具</h1>
        <p className={styles.description}>
          美化、壓縮和驗證您的 JSON 資料
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <div className={styles.inputHeader}>
            <h3 className={styles.sectionTitle}>輸入 JSON</h3>
            <div className={styles.inputActions}>
              <button 
                onClick={loadSample}
                className={styles.sampleButton}
                aria-label="載入範例 JSON"
              >
                載入範例
              </button>
              <button 
                onClick={clearAll}
                className={styles.clearButton}
                aria-label="清除所有內容"
              >
                清除
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.textarea}
            placeholder="在此貼上或輸入您的 JSON 資料..."
            rows={12}
            aria-label="JSON 輸入區域"
          />
          <div className={styles.actions}>
            <button 
              onClick={formatJSON}
              className={`${styles.actionButton} ${styles.format}`}
              disabled={!input.trim()}
            >
              格式化
            </button>
            <button 
              onClick={minifyJSON}
              className={`${styles.actionButton} ${styles.minify}`}
              disabled={!input.trim()}
            >
              壓縮
            </button>
            <button 
              onClick={validateJSON}
              className={`${styles.actionButton} ${styles.validate}`}
              disabled={!input.trim()}
            >
              驗證
            </button>
          </div>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <h3 className={styles.sectionTitle}>輸出結果</h3>
            {output && (
              <button 
                onClick={copyToClipboard}
                className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                aria-label="複製輸出結果"
              >
                {copied ? '已複製!' : '複製'}
              </button>
            )}
          </div>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          {output && (
            <pre className={styles.output}>
              <code>{output}</code>
            </pre>
          )}
          
          {!output && !error && (
            <div className={styles.placeholder}>
              輸出結果將顯示在這裡...
            </div>
          )}
        </div>
      </div>

      <div className={styles.features}>
        <h3 className={styles.featuresTitle}>功能特色</h3>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎨</div>
            <h4 className={styles.featureTitle}>美化格式</h4>
            <p className={styles.featureDescription}>
              將壓縮的 JSON 轉換為易讀的格式，包含適當的縮排和換行
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📦</div>
            <h4 className={styles.featureTitle}>壓縮優化</h4>
            <p className={styles.featureDescription}>
              移除不必要的空白字符，減少 JSON 檔案大小
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✅</div>
            <h4 className={styles.featureTitle}>格式驗證</h4>
            <p className={styles.featureDescription}>
              檢查 JSON 語法是否正確，並提供詳細的錯誤訊息
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
