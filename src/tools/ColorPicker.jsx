import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./ColorPicker.module.scss";

export default function ColorPicker() {
  const [color, setColor] = useState("#4f46e5");
  const [copied, setCopied] = useState("");

  // 顏色格式轉換函數
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = useCallback(async (text, format) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  const colorFormats = [
    {
      label: "HEX",
      value: color.toUpperCase(),
      description: "十六進制顏色代碼"
    },
    {
      label: "RGB",
      value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "",
      description: "紅綠藍顏色模式"
    },
    {
      label: "HSL",
      value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "",
      description: "色相飽和度亮度"
    }
  ];

  const presetColors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd",
    "#98d8c8", "#f7dc6f", "#bb8fce", "#85c1e9", "#f8c471", "#82e0aa",
    "#f1948a", "#85c1e9", "#f4d03f", "#a569bd", "#5dade2", "#58d68d"
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>顏色選擇器 - Frontend Tools</title>
        <meta
          name="description"
          content="專業的線上顏色選擇器，支援 HEX、RGB、HSL 格式轉換，提供預設色彩和即時預覽功能。"
        />
        <meta name="keywords" content="color picker, 顏色選擇器, HEX, RGB, HSL, 色彩工具" />
      </Helmet>
      
      <div className={styles.header}>
        <h1 className={styles.title}>顏色選擇器</h1>
        <p className={styles.description}>
          選擇顏色並獲取多種格式的色彩代碼
        </p>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.pickerSection}>
          <div className={styles.colorPickerWrapper}>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={styles.colorPicker}
              aria-label="選擇顏色"
            />
            <div className={styles.colorPreview} style={{ backgroundColor: color }}>
              <span className={styles.colorValue}>{color.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className={styles.formatsSection}>
          <h3 className={styles.sectionTitle}>顏色格式</h3>
          <div className={styles.formatGrid}>
            {colorFormats.map((format) => (
              <div key={format.label} className={styles.formatCard}>
                <div className={styles.formatHeader}>
                  <span className={styles.formatLabel}>{format.label}</span>
                  <span className={styles.formatDescription}>{format.description}</span>
                </div>
                <div className={styles.formatValue}>
                  <code className={styles.colorCode}>{format.value}</code>
                  <button
                    onClick={() => copyToClipboard(format.value, format.label)}
                    className={`${styles.copyButton} ${copied === format.label ? styles.copied : ''}`}
                    aria-label={`複製 ${format.label} 格式`}
                  >
                    {copied === format.label ? '已複製!' : '複製'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.presetsSection}>
          <h3 className={styles.sectionTitle}>預設顏色</h3>
          <div className={styles.presetGrid}>
            {presetColors.map((presetColor, index) => (
              <button
                key={index}
                className={`${styles.presetColor} ${color === presetColor ? styles.active : ''}`}
                style={{ backgroundColor: presetColor }}
                onClick={() => setColor(presetColor)}
                aria-label={`選擇顏色 ${presetColor}`}
                title={presetColor}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.sectionTitle}>顏色資訊</h3>
          <div className={styles.colorInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>亮度:</span>
              <span className={styles.infoValue}>
                {hsl ? `${hsl.l}%` : 'N/A'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>飽和度:</span>
              <span className={styles.infoValue}>
                {hsl ? `${hsl.s}%` : 'N/A'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>色相:</span>
              <span className={styles.infoValue}>
                {hsl ? `${hsl.h}°` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}