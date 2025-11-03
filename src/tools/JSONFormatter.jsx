import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./JSONFormatter.module.scss";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (window.adsbygoogle) window.adsbygoogle.push({});
  }, [output]);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setOutput("Invalid JSON");
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>JSON Formatter - Frontend Tools</title>
        <meta
          name="description"
          content="線上 JSON 格式化工具，美化和驗證 JSON 資料，提升程式碼可讀性。"
        />
      </Helmet>
      <h2>JSON Formatter</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste JSON here"
      />
      <button onClick={formatJSON}>Format</button>
      <pre>{output}</pre>

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
