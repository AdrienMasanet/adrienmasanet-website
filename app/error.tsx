"use client";

import scssThemeVariables from "../styles/javascript_variables.module.scss";

export default function LoadingMainPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: scssThemeVariables.scssThemeClWhite,
        display: "flex",
      }}
    >
      <div
        style={{
          color: scssThemeVariables.scssThemeClDarkblue,
          margin: "auto",
          fontSize: "3em",
        }}
      >
        Erreur
      </div>
    </div>
  );
}
