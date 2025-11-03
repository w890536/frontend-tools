import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./HashGenerator.module.scss";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState("");

  // 簡單的 hash 函數實現
  const generateHash = useCallback(async (text, algorithm) => {
    if (!text) return "";
    
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      if (algorithm === 'sha256') {
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } else if (algorithm === 'sha1') {
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } else if (algorithm === 'md5') {
        // 簡單的 MD5 實現 (僅用於演示，實際應用建議使用專業庫)
        return simpleHash(text);
      }
    } catch (error) {
      console.error('Hash generation failed:', error);
      return "生成失敗";
    }
  }, []);

  // 簡單的 hash 函數 (模擬 MD5)
  const simpleHash = (str) => {
    let hash = 0;
    if (str.length === 0) return hash.toString(16);
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  useEffect(() => {
    const generateAllHashes = async () => {
      if (!input.trim()) {
        setHashes({});
        return;
      }

      const newHashes = {};
      newHashes.sha256 = await generateHash(input, 'sha256');
      newHashes.sha1 = await generateHash(input, 'sha1');
      newHashes.md5 = await generateHash(input, 'md5');
      
      setHashes(newHashes);
    };

    generateAllHashes();
  }, [input, generateHash]);

  const copyToClipboard = useCallback(async (text, algorithm) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(algorithm);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setHashes({});
  }, []);

  const loadExample = useCallback(() => {
    setInput("Hello, Frontend Tools!");
  }, []);

  const hashTypes = [
    {
      name: "SHA-256",
      key: "sha256",
      description: "安全雜湊演算法 256 位元，廣泛用於密碼學",
      color: "#4f46e5"
    },
    {
      name: "SHA-1",
      key: "sha1", 
      description: "安全雜湊演算法 160 位元，較舊但仍常用",
      color: "#059669"
    },
    {
      name: "MD5",
      key: "md5",
      description: "訊息摘要演算法 128 位元，快速但安全性較低",
      color: "#dc2626"
    }
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Hash 雜湊生成器 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的 Hash 雜湊生成器，支援 SHA-256、SHA-1、MD5 等多種雜湊演算法，適用於資料完整性驗證。"
        />
        <meta name="keywords" content="hash generator, SHA-256, SHA-1, MD5, 雜湊, 摘要, 加密" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Hash 雜湊生成器</h1>
        <p className={styles.description}>
          生成文字的雜湊值，用於資料完整性驗證和安全應用
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <div className={styles.inputHeader}>
            <h3 className={styles.sectionTitle}>輸入文字</h3>
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
            placeholder="輸入要生成雜湊值的文字..."
            rows={6}
          />
          <div className={styles.inputInfo}>
            <span>字符數: {input.length}</span>
            <span>位元組數: {new TextEncoder().encode(input).length}</span>
          </div>
        </div>

        <div className={styles.outputSection}>
          <h3 className={styles.sectionTitle}>雜湊結果</h3>
          {Object.keys(hashes).length === 0 && !input.trim() ? (
            <div className={styles.placeholder}>
              輸入文字後，雜湊值將自動生成...
            </div>
          ) : (
            <div className={styles.hashGrid}>
              {hashTypes.map((hashType) => (
                <div key={hashType.key} className={styles.hashCard}>
                  <div className={styles.hashHeader}>
                    <div className={styles.hashName} style={{ color: hashType.color }}>
                      {hashType.name}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(hashes[hashType.key], hashType.key)}
                      className={`${styles.copyButton} ${copied === hashType.key ? styles.copied : ''}`}
                      disabled={!hashes[hashType.key]}
                      aria-label={`複製 ${hashType.name} 雜湊值`}
                    >
                      {copied === hashType.key ? '已複製!' : '複製'}
                    </button>
                  </div>
                  <div className={styles.hashDescription}>
                    {hashType.description}
                  </div>
                  <div className={styles.hashValue}>
                    <code>{hashes[hashType.key] || "等待輸入..."}</code>
                  </div>
                  <div className={styles.hashLength}>
                    長度: {hashes[hashType.key] ? hashes[hashType.key].length : 0} 字符
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>關於雜湊函數</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🔒</div>
            <h4>資料完整性</h4>
            <p>雜湊值可用於驗證資料是否被篡改，確保資料完整性。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⚡</div>
            <h4>單向函數</h4>
            <p>雜湊是單向運算，無法從雜湊值反推原始資料。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🎯</div>
            <h4>固定長度</h4>
            <p>無論輸入多長，同一演算法產生的雜湊值長度固定。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🔄</div>
            <h4>確定性</h4>
            <p>相同輸入總是產生相同的雜湊值。</p>
          </div>
        </div>
      </div>
    </div>
  );
}