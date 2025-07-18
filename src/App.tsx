import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SecondPage from "./pages/SecondPage";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAssetsLoader } from "./hooks/useAssetsLoader";
import PreloaderPage from "./pages/PreloaderPage";

const assets = [
  "/assets/spine/enemy/Enemy.json",
  "/assets/spine/enemy/Enemy.atlas",
  "/assets/sfx/btn_click.mp3",
];

const App: React.FC = () => {
  // 1) Загружаем всё пачкой
  const { loaded, progress } = useAssetsLoader(assets);

  // 2) Пока не загружено — показываем прелоадер
  if (!loaded) {
    return <PreloaderPage progress={progress} />;
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
          <Link to="/" style={{ marginRight: 10 }}>
            Главная
          </Link>
          <Link to="/second">Вторая</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
