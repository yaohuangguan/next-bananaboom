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
  const jumbo = Array.from(document.querySelectorAll(".jumbo"));
  jumbo.forEach(
    el => (
      el.classList.add("animated", "zoomIn"),
      el.addEventListener("animationend", () => {
        el.classList.remove("animated", "zoomIn");
      })
    )
  );
  // jumbo.classList.add("animated", "fadeInDownBig");
  // jumbo.addEventListener("animationend", () => {
  //   jumbo.classList.remove("animated", "fadeInDownBig");
  // });
};

export default Animation;
