import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GradientGenerator from "./tools/GradientGenerator";
import ColorPicker from "./tools/ColorPicker";
import JSONFormatter from "./tools/JSONFormatter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={
            <div>
              <Helmet>
                <title>Frontend Tools - 前端開發工具集</title>
                <meta
                  name="description"
                  content="免費線上前端開發工具集，包含 CSS 漸層生成器、顏色選擇器、JSON 格式化工具等實用功能。"
                />
              </Helmet>
              <h1>Welcome to Frontend Tools</h1>
            </div>
          } />
          <Route path="/gradient" element={<GradientGenerator />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/json-formatter" element={<JSONFormatter />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;