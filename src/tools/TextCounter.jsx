import { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./TextCounter.module.scss";

export default function TextCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const bytes = new TextEncoder().encode(text).length;
    
    // 計算平均值
    const avgWordsPerSentence = sentences > 0 ? (words / sentences).toFixed(1) : 0;
    const avgCharsPerWord = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;
    
    // 估算閱讀時間 (假設每分鐘 200 字)
    const readingTime = Math.ceil(words / 200);
    
    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      bytes,
      avgWordsPerSentence,
      avgCharsPerWord,
      readingTime
    };
  }, [text]);

  const clearText = useCallback(() => {
    setText("");
  }, []);

  const loadSample = useCallback(() => {
    const sampleText = `Frontend Tools 是一個免費的線上工具集，專為前端開發者設計。

我們提供多種實用工具，包括：
- CSS 漸層生成器
- 顏色選擇器  
- JSON 格式化工具
- Base64 編碼解碼
- URL 編碼解碼
- Hash 雜湊生成器

這些工具都經過精心設計，具有直觀的用戶界面和強大的功能。無論您是初學者還是經驗豐富的開發者，都能從中受益。

我們致力於提供最好的開發體驗，所有工具都是免費使用，無需註冊。立即開始使用，提升您的開發效率！`;
    setText(sampleText);
  }, []);

  const copyStats = useCallback(async () => {
    const statsText = `文字統計結果：
字符數: ${stats.characters}
字符數(不含空格): ${stats.charactersNoSpaces}
單字數: ${stats.words}
句子數: ${stats.sentences}
段落數: ${stats.paragraphs}
行數: ${stats.lines}
位元組數: ${stats.bytes}
平均每句單字數: ${stats.avgWordsPerSentence}
平均每字字符數: ${stats.avgCharsPerWord}
預估閱讀時間: ${stats.readingTime} 分鐘`;

    try {
      await navigator.clipboard.writeText(statsText);
      alert('統計結果已複製到剪貼簿！');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [stats]);

  const statItems = [
    { label: "字符數", value: stats.characters, icon: "📝", color: "#4f46e5" },
    { label: "字符數 (不含空格)", value: stats.charactersNoSpaces, icon: "✂️", color: "#059669" },
    { label: "單字數", value: stats.words, icon: "📖", color: "#dc2626" },
    { label: "句子數", value: stats.sentences, icon: "💬", color: "#7c3aed" },
    { label: "段落數", value: stats.paragraphs, icon: "📄", color: "#ea580c" },
    { label: "行數", value: stats.lines, icon: "📏", color: "#0891b2" },
    { label: "位元組數", value: stats.bytes, icon: "💾", color: "#be185d" },
    { label: "預估閱讀時間", value: `${stats.readingTime} 分鐘`, icon: "⏱️", color: "#16a34a" }
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>文字計數器 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的文字計數器工具，統計字符數、單字數、句子數、段落數等，並提供閱讀時間估算。"
        />
        <meta name="keywords" content="文字計數器, 字數統計, word counter, character counter, 閱讀時間" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>文字計數器</h1>
        <p className={styles.description}>
          統計文字的各種數據，包括字符數、單字數、閱讀時間等
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <div className={styles.inputHeader}>
            <h3 className={styles.sectionTitle}>輸入文字</h3>
            <div className={styles.inputActions}>
              <button 
                onClick={loadSample}
                className={styles.sampleButton}
                aria-label="載入範例文字"
              >
                載入範例
              </button>
              <button 
                onClick={clearText}
                className={styles.clearButton}
                aria-label="清除文字"
              >
                清除
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
            placeholder="在此輸入或貼上您要統計的文字..."
            rows={12}
          />
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsHeader}>
            <h3 className={styles.sectionTitle}>統計結果</h3>
            <button 
              onClick={copyStats}
              className={styles.copyButton}
              disabled={!text.trim()}
              aria-label="複製統計結果"
            >
              複製統計
            </button>
          </div>
          
          <div className={styles.statsGrid}>
            {statItems.map((item, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue} style={{ color: item.color }}>
                    {item.value}
                  </div>
                  <div className={styles.statLabel}>
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {stats.words > 0 && (
            <div className={styles.additionalStats}>
              <h4 className={styles.additionalTitle}>詳細分析</h4>
              <div className={styles.additionalGrid}>
                <div className={styles.additionalItem}>
                  <span className={styles.additionalLabel}>平均每句單字數:</span>
                  <span className={styles.additionalValue}>{stats.avgWordsPerSentence}</span>
                </div>
                <div className={styles.additionalItem}>
                  <span className={styles.additionalLabel}>平均每字字符數:</span>
                  <span className={styles.additionalValue}>{stats.avgCharsPerWord}</span>
                </div>
                <div className={styles.additionalItem}>
                  <span className={styles.additionalLabel}>文字密度:</span>
                  <span className={styles.additionalValue}>
                    {((stats.charactersNoSpaces / stats.characters) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>使用說明</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📊</div>
            <h4>即時統計</h4>
            <p>輸入文字時即時更新統計數據，無需額外操作。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🎯</div>
            <h4>多項指標</h4>
            <p>提供字符數、單字數、句子數等多種統計指標。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⏰</div>
            <h4>閱讀時間</h4>
            <p>根據平均閱讀速度估算文章的閱讀時間。</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📋</div>
            <h4>一鍵複製</h4>
            <p>可以一鍵複製所有統計結果到剪貼簿。</p>
          </div>
        </div>
      </div>
    </div>
  );
}