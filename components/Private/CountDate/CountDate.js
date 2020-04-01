import React, { useEffect } from "react";
import "./countdate.scss";
const Surprise = () => {
  const handleClick = () =>
    alert(
      "哈哈哈，竟然被你发现了！我隐藏在这个地方，透明的看不到的啊！既然被你发现了，那就告诉你，我爱你哦！"
    );
  return (
    <div onClick={handleClick} className="p-5" style={{ opacity: 0 }}>
      HAHAHAHAHAHHAHHAHAHAHHAHA
    </div>
  );
};
const CountDate = ({ fromDate, isPrivate, fromWhat }) => {
  useEffect(() => {
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const countdown = document.getElementById("countdown");
    const year = document.getElementById("year");

    const fromTime = new Date(fromDate);

    function updateCountdown() {
      const currentTime = new Date();
      const diff = currentTime - fromTime;

      const d = Math.floor(diff / 1000 / 60 / 60 / 24);
      const h = Math.floor(diff / 1000 / 60 / 60) % 24;
      const m = Math.floor(diff / 1000 / 60) % 60;
      const s = Math.floor(diff / 1000) % 60;
      const y = Math.floor(d / 365);

      // Add values to DOM
      year.innerHTML = y;
      days.innerHTML = d;

      hours.innerHTML = h < 10 ? "0" + h : h;
      minutes.innerHTML = m < 10 ? "0" + m : m;
      seconds.innerHTML = s < 10 ? "0" + s : s;
    }

    // Show spinner before countdown
    let timeOut = setTimeout(() => {
      countdown.style.display = "flex";
    }, 1000);

    // Run every second
    let interval = setInterval(updateCountdown, 1000);
    return () => {
      clearTimeout(timeOut);
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div
        id="countdown"
        className={`z-depth-2 countdown ${
          isPrivate ? "countdown-private" : ""
        }`}
      >
        <Surprise />
        <div>{fromWhat}</div>
        <div className="time" style={{ color: "#FF69B4" }}>
          <h2 id="year">❤</h2>
          <small>年</small>
        </div>
        <div className="time">
          <h2 id="days">❤</h2>
          <small>天</small>
        </div>
        <div className="time">
          <h2 id="hours">❤</h2>
          <small>小时</small>
        </div>
        <div className="time">
          <h2 id="minutes">❤</h2>
          <small>分</small>
        </div>
        <div className="time">
          <h2 id="seconds">❤</h2>
          <small>秒</small>
        </div>
      </div>
    </>
  );
};

export default CountDate;
