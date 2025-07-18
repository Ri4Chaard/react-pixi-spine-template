// src/pages/PreloaderPage.tsx
import React from "react";

interface Props {
  progress: number; // из useAssetsLoader
}

const PreloaderPage: React.FC<Props> = ({ progress }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <h2>Загрузка: {progress}%</h2>
    <div
      style={{
        width: 300,
        height: 10,
        background: "#ccc",
        marginTop: 20,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "#4caf50",
          transition: "width 0.2s",
        }}
      />
    </div>
  </div>
);

export default PreloaderPage;
