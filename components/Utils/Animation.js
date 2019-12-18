/* eslint-disable no-sequences */
const Animation = () => {
  const logo = document.getElementById("logo");
  logo.classList.add("animated", "fadeInDown");
  logo.addEventListener("mouseover", () => {
    logo.classList.add("animated", "jackInTheBox");
  });
  logo.addEventListener("animationend", () => {
    logo.classList.remove("animated", "jackInTheBox");
    logo.classList.remove("animated", "fadeInDown");
  });
  const me = document.getElementById("me");
  me.classList.add("animated", "fadeIn");
  me.addEventListener("animationend", () => {
    me.classList.remove("animated", "fadeIn");
  });
  const content = document.getElementById("content");
  content.classList.add("animated", "fadeInLeft");
  content.addEventListener("animationend", () => {
    content.classList.remove("animated", "fadeInLeft");
  });
  const jumbo = Array.from(document.querySelectorAll(".jumbo"));
  jumbo.forEach(
    el => (
      el.classList.add("animated", "fadeInDown"),
      el.addEventListener("animationend", () => {
        el.classList.remove("animated", "fadeInDown");
      })
    )
  );
  // jumbo.classList.add("animated", "fadeInDownBig");
  // jumbo.addEventListener("animationend", () => {
  //   jumbo.classList.remove("animated", "fadeInDownBig");
  // });
};

export default Animation;
