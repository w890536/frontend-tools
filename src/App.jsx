import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GradientGenerator from "./tools/GradientGenerator";
import ColorPicker from "./tools/ColorPicker";
import JSONFormatter from "./tools/JSONFormatter";
import Base64Converter from "./tools/Base64Converter";
import URLEncoder from "./tools/URLEncoder";
import HashGenerator from "./tools/HashGenerator";
import TextCounter from "./tools/TextCounter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <main className={styles.main} role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gradient" element={<GradientGenerator />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/base64-converter" element={<Base64Converter />} />
            <Route path="/url-encoder" element={<URLEncoder />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/text-counter" element={<TextCounter />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;