import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Base64Converter.module.scss";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // encode or decode
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const processBase64 = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("請輸入要轉換的內容");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        setError("");
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
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

  const swapInputOutput = useCallback(() => {
    if (output) {
      setInput(output);
      setOutput("");
      setMode(mode === "encode" ? "decode" : "encode");
      setError("");
    }
  }, [output, mode]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Base64 編碼解碼工具 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的 Base64 編碼解碼工具，支援文字和 URL 安全的 Base64 轉換，適用於資料傳輸和儲存。"
        />
        <meta name="keywords" content="Base64, 編碼, 解碼, encoder, decoder, 資料轉換" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Base64 編碼解碼工具</h1>
        <p className={styles.description}>
          安全地編碼和解碼 Base64 格式的資料
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
              編碼 (文字 → Base64)
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="decode"
                checked={mode === "decode"}
                onChange={(e) => setMode(e.target.value)}
              />
              解碼 (Base64 → 文字)
            </label>
          </div>
        </div>

        <div className={styles.converterSection}>
          <div className={styles.inputSection}>
            <div className={styles.inputHeader}>
              <h3 className={styles.sectionTitle}>
                {mode === "encode" ? "輸入文字" : "輸入 Base64"}
              </h3>
              <div className={styles.inputActions}>
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
              placeholder={mode === "encode" ? "輸入要編碼的文字..." : "輸入要解碼的 Base64 字串..."}
              rows={8}
            />
            <div className={styles.actions}>
              <button 
                onClick={processBase64}
                className={styles.convertButton}
                disabled={!input.trim()}
              >
                {mode === "encode" ? "編碼" : "解碼"}
              </button>
              {output && (
                <button 
                  onClick={swapInputOutput}
                  className={styles.swapButton}
                  aria-label="交換輸入輸出"
                >
                  ⇄ 交換
                </button>
              )}
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <h3 className={styles.sectionTitle}>
                {mode === "encode" ? "Base64 結果" : "解碼結果"}
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
                rows={8}
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
        <h3 className={styles.infoTitle}>關於 Base64</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h4>什麼是 Base64？</h4>
            <p>Base64 是一種編碼方式，將二進制資料轉換為 ASCII 字符，常用於資料傳輸和儲存。</p>
          </div>
          <div className={styles.infoCard}>
            <h4>使用場景</h4>
            <p>電子郵件附件、網頁資料 URI、API 資料傳輸、配置文件等。</p>
          </div>
          <div className={styles.infoCard}>
            <h4>安全性</h4>
            <p>Base64 是編碼而非加密，不提供安全保護，僅用於資料格式轉換。</p>
          </div>
        </div>
      </div>
    </div>
  );
}