import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SecondPage from "./pages/SecondPage";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAssetsLoader } from "./hooks/useAssetsLoader";
import PreloaderPage from "./pages/PreloaderPage";
import { EngineProvider } from "./context/EngineProvider";

const assets = [
  "/assets/spine/enemy/Enemy.json",
  "/assets/spine/enemy/Enemy.atlas",
];

const App: React.FC = () => {
  // 1) Load everything in a bundle
  const { loaded, progress } = useAssetsLoader(assets);

  // 2) Until it's uploaded - show preloader
  if (!loaded) {
    return <PreloaderPage progress={progress} />;
  }
  return (
    <EngineProvider options={{ width: 800, height: 600, fps: 60 }}>
      <Provider store={store}>
        <BrowserRouter>
          <nav style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
            <Link to="/" style={{ marginRight: 10 }}>
              Main
            </Link>
            <Link to="/second">Second</Link>
          </nav>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/second" element={<SecondPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </EngineProvider>
  );
};
export default App;
