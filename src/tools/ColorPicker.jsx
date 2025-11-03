import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./ColorPicker.module.scss";

export default function ColorPicker() {
  const [color, setColor] = useState("#00ff00");

  useEffect(() => {
    if (window.adsbygoogle) window.adsbygoogle.push({});
  }, [color]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Color Picker - Frontend Tools</title>
        <meta
          name="description"
          content="線上顏色選擇器，快速選擇和預覽顏色，取得 HEX 色碼。"
        />
      </Helmet>
      <h2>Color Picker</h2>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <p>Selected color: {color}</p>

      {/* 廣告位置 */}
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-XXXXXXXXXXXX"
           data-ad-slot="YYYYYYYYYY"
           data-ad-format="auto"></ins>
    </div>
  );
}