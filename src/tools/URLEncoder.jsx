import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./URLEncoder.module.scss";

export default function URLEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const processURL = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("請輸入要轉換的內容");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = encodeURIComponent(input);
        setOutput(encoded);
        setError("");
      } else {
        const decoded = decodeURIComponent(input);
        setOutput(decoded);
        setError("");
      }
    } catch (err) {
      setError(`轉換失敗: ${err.message}`);
      setOutput("");
    }
  }, [input, mode]);

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

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const loadExample = useCallback(() => {
    const examples = {
      encode: "https://example.com/search?q=前端開發 工具&category=技術",
      decode: "https%3A//example.com/search%3Fq%3D%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%20%E5%B7%A5%E5%85%B7%26category%3D%E6%8A%80%E8%A1%93"
    };
    setInput(examples[mode]);
    setError("");
    setOutput("");
  }, [mode]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>URL 編碼解碼工具 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的 URL 編碼解碼工具，處理 URL 中的特殊字符，確保網址的正確傳輸和顯示。"
        />
        <meta name="keywords" content="URL encoder, URL decoder, 網址編碼, 網址解碼, URI編碼" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>URL 編碼解碼工具</h1>
        <p className={styles.description}>
          處理 URL 中的特殊字符，確保網址正確傳輸
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.controls}>
          <div className={styles.modeSelector}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="encode"
                checked={mode === "encode"}
                onChange={(e) => setMode(e.target.value)}
              />
              編碼 (URL → 編碼格式)
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="decode"
                checked={mode === "decode"}
                onChange={(e) => setMode(e.target.value)}
              />
              解碼 (編碼格式 → URL)
            </label>
          </div>
        </div>

        <div className={styles.converterSection}>
          <div className={styles.inputSection}>
            <div className={styles.inputHeader}>
              <h3 className={styles.sectionTitle}>
                {mode === "encode" ? "輸入 URL" : "輸入編碼 URL"}
              </h3>
              <div className={styles.inputActions}>
                <button 
                  onClick={loadExample}
                  className={styles.exampleButton}
                  aria-label="載入範例"
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
              placeholder={mode === "encode" ? "輸入要編碼的 URL..." : "輸入要解碼的編碼 URL..."}
              rows={6}
            />
            <div className={styles.actions}>
              <button 
                onClick={processURL}
                className={styles.convertButton}
                disabled={!input.trim()}
              >
                {mode === "encode" ? "編碼" : "解碼"}
              </button>
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <h3 className={styles.sectionTitle}>
                {mode === "encode" ? "編碼結果" : "解碼結果"}
              </h3>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  aria-label="複製結果"
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
              <textarea
                value={output}
                readOnly
                className={`${styles.textarea} ${styles.output}`}
                rows={6}
              />
            )}
            
            {!output && !error && (
              <div className={styles.placeholder}>
                轉換結果將顯示在這裡...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>URL 編碼說明</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h4>什麼是 URL 編碼？</h4>
            <p>URL 編碼是將 URL 中的特殊字符轉換為 %XX 格式，確保 URL 能正確傳輸。</p>
          </div>
          <div className={styles.infoCard}>
            <h4>常見編碼字符</h4>
            <div className={styles.encodingExamples}>
              <div>空格 → %20</div>
              <div>中文 → %E4%B8%AD%E6%96%87</div>
              <div>& → %26</div>
              <div>? → %3F</div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <h4>使用場景</h4>
            <p>API 請求參數、表單提交、搜索查詢、社交媒體分享連結等。</p>
          </div>
        </div>
      </div>
    </div>
  );
}