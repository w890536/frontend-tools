import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./GradientGenerator.module.scss";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const gradient = `linear-gradient(to right, ${color1}, ${color2})`;

  useEffect(() => {
    if (window.adsbygoogle) window.adsbygoogle.push({});
  }, [gradient]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>CSS Gradient Generator - Frontend Tools</title>
        <meta
          name="description"
          content="線上 CSS Gradient 生成器，選擇顏色快速生成漸層背景。"
        />
      </Helmet>
      <h2>CSS Gradient Generator</h2>
      <div className={styles.inputs}>
        <input
          type="color"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />
        <input
          type="color"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />
      </div>
      <div className={styles.preview} style={{ background: gradient }} />
      <code className={styles.code}>{`background: ${gradient};`}</code>

      {/* 廣告位置 */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot="YYYYYYYYYY"
        data-ad-format="auto"
      ></ins>
    </div>
  );
}
