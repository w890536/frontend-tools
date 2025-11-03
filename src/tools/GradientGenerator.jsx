import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./GradientGenerator.module.scss";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [direction, setDirection] = useState("to right");
  const [gradientType, setGradientType] = useState("linear");
  const [copied, setCopied] = useState(false);

  const gradient = gradientType === "linear" 
    ? `linear-gradient(${direction}, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`background: ${gradient};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [gradient]);

  const directions = [
    { value: "to right", label: "向右" },
    { value: "to left", label: "向左" },
    { value: "to bottom", label: "向下" },
    { value: "to top", label: "向上" },
    { value: "45deg", label: "45°" },
    { value: "135deg", label: "135°" },
  ];

  const presetGradients = [
    { name: "日落", colors: ["#ff7e5f", "#feb47b"] },
    { name: "海洋", colors: ["#2196f3", "#21cbf3"] },
    { name: "森林", colors: ["#11998e", "#38ef7d"] },
    { name: "紫羅蘭", colors: ["#667eea", "#764ba2"] },
    { name: "火焰", colors: ["#f12711", "#f5af19"] },
    { name: "薄荷", colors: ["#00b4db", "#0083b0"] },
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>CSS 漸層生成器 - Frontend Tools</title>
        <meta
          name="description"
          content="免費的 CSS 漸層生成器，支援線性和徑向漸層，多種方向選擇，即時預覽效果，一鍵複製 CSS 代碼。"
        />
        <meta name="keywords" content="CSS gradient, 漸層生成器, linear gradient, radial gradient, CSS工具" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>CSS 漸層生成器</h1>
        <p className={styles.description}>
          創建美麗的 CSS 漸層背景，支援線性和徑向漸層
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.label}>漸層類型</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="linear"
                checked={gradientType === "linear"}
                onChange={(e) => setGradientType(e.target.value)}
              />
              線性漸層
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="radial"
                checked={gradientType === "radial"}
                onChange={(e) => setGradientType(e.target.value)}
              />
              徑向漸層
            </label>
          </div>
        </div>

        {gradientType === "linear" && (
          <div className={styles.controlGroup}>
            <label className={styles.label}>方向</label>
            <select 
              value={direction} 
              onChange={(e) => setDirection(e.target.value)}
              className={styles.select}
            >
              {directions.map(dir => (
                <option key={dir.value} value={dir.value}>
                  {dir.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.controlGroup}>
          <label className={styles.label}>顏色選擇</label>
          <div className={styles.colorInputs}>
            <div className={styles.colorInput}>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className={styles.colorPicker}
                aria-label="第一個顏色"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className={styles.colorText}
                placeholder="#667eea"
              />
            </div>
            <div className={styles.colorInput}>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className={styles.colorPicker}
                aria-label="第二個顏色"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className={styles.colorText}
                placeholder="#764ba2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.preview} style={{ background: gradient }}>
        <div className={styles.previewText}>預覽效果</div>
      </div>

      <div className={styles.output}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>CSS 代碼</span>
          <button 
            onClick={copyToClipboard}
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            aria-label="複製 CSS 代碼"
          >
            {copied ? '已複製!' : '複製'}
          </button>
        </div>
        <code className={styles.code}>
          background: {gradient};
        </code>
      </div>

      <div className={styles.presets}>
        <h3 className={styles.presetsTitle}>預設漸層</h3>
        <div className={styles.presetGrid}>
          {presetGradients.map((preset, index) => (
            <button
              key={index}
              className={styles.presetButton}
              style={{ 
                background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})` 
              }}
              onClick={() => {
                setColor1(preset.colors[0]);
                setColor2(preset.colors[1]);
              }}
              aria-label={`套用 ${preset.name} 漸層`}
            >
              <span className={styles.presetName}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
