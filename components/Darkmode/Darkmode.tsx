import { useState, useEffect } from "react";
import "./darkmode.scss";
const Darkmode = ({
  light,
  dark,
  handleTheme,
}: {
  light: () => {};
  dark: () => {};
  handleTheme: () => {};
}) => {
  const [theme, setTheme]: any = useState("");
  function handleThemeBeforeServer() {
    if (typeof window !== "undefined") {
      let theme = handleTheme();
      return setTheme(theme);
    }
  }
  useEffect(() => {
    handleThemeBeforeServer();

    return () => {};
  }, []);
  const handleLight = () => {
    light();
    setTheme("day");
  };
  const handleDark = () => {
    dark();
    setTheme("night");
  };
  return (
    <div className="darkmode-container">
      <div className="toggle">
        <i
          className="fas fa-sun fa-lg"
          style={{
            color: `${theme === "night" ? "#333" : "rgb(255, 191, 0)"}`,
            display: `${theme === "night" ? "none" : "block"}`,
          }}
          onClick={handleDark}
        ></i>
        <i
          className="fas fa-moon fa-lg"
          style={{
            color: `${theme === "night" ? "#fff" : "#333"}`,
            display: `${theme === "night" ? "block" : "none"}`,
          }}
          onClick={handleLight}
        ></i>
      </div>
    </div>
  );
};

export default Darkmode;
