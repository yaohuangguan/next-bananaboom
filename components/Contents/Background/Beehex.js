import "./Background.scss";
import { useEffect } from "react";
export const getBeeHexImg = () => {
  useEffect(() => {
    const hoverImg = () => {
      const image = document.querySelectorAll(".image")[0];
      const zoom = document.querySelectorAll(".zoomMagnify")[0];
      const zoomImage = document.querySelectorAll(".zoom-image")[0];
      let clearSrc;
      let zoomLevel = 1;
      const images = [
        {
          thumb: "https://i.ibb.co/P5PjXwf/IMG-2938.jpg",
          hires: "https://i.ibb.co/P5PjXwf/IMG-2938.jpg"
        }
      ];
      image.getElementsByTagName("a")[0].setAttribute("href", images[0].hires);
      image.getElementsByTagName("img")[0].setAttribute("src", images[0].thumb);
      image.getElementsByTagName("img")[0].setAttribute("alt", 'BeeHex Team');

      const preloadImage = url => {
        let img = new Image();
        img.src = url;
      };

      preloadImage(images[0].hires);

      const enterImage = function(e) {
        zoom.classList.add("show", "loading");
        clearTimeout(clearSrc);
        zoom.style.display = "block";
        zoomImage.style.display = "block";
        let posX,
          posY,
          touch = false;

        if (e.touches) {
          posX = e.touches[0].clientX;
          posY = e.touches[0].clientY;
          touch = true;
        } else {
          posX = e.clientX;
          posY = e.clientY;
        }

        touch
          ? (zoom.style.top = `${posY - zoom.offsetHeight / 2}px`)
          : (zoom.style.top = `${posY - zoom.offsetHeight / 2}px`);
        zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

        let originalImage = this.getElementsByTagName("a")[0].getAttribute(
          "href"
        );

        zoomImage.setAttribute("src", originalImage);

        // remove the loading class
        zoomImage.onload = function() {
          setTimeout(() => {
            zoom.classList.remove("loading");
          }, 500);
        };
      };

      const leaveImage = function() {
        // remove scaling to prevent non-transition
        zoom.style.transform = null;
        zoomLevel = 1;
        zoomImage.style.display = "none";
        zoom.classList.remove("show");
        clearSrc = setTimeout(() => {
          zoomImage.setAttribute("src", "");
        }, 250);
      };

      const move = function(e) {
        // e.preventDefault();

        let posX,
          posY,
          touch = false;

        if (e.touches) {
          posX = e.touches[0].clientX;
          posY = e.touches[0].clientY;
          touch = true;
        } else {
          posX = e.clientX;
          posY = e.clientY;
        }

        // move the zoom a little bit up on mobile (because of your fat fingers :<)
        touch
          ? (zoom.style.top = `${posY - zoom.offsetHeight}px`)
          : (zoom.style.top = `${posY - zoom.offsetHeight * 2}px`);
        zoom.style.left = `${posX - zoom.offsetWidth}px`;

        let percX = (posX - this.offsetLeft) / this.offsetWidth,
          percY = (posY - this.offsetTop) / this.offsetHeight;

        let zoomLeft = -percX * zoomImage.offsetWidth + zoom.offsetWidth,
          zoomTop = -percY * zoomImage.offsetHeight + zoom.offsetHeight * 3;

        zoomImage.style.left = `${zoomLeft}px`;
        zoomImage.style.top = `${zoomTop}px`;
      };

      image.addEventListener("mouseover", enterImage, {
        passive: true
      });
      image.addEventListener("touchstart", enterImage, {
        passive: true
      });

      image.addEventListener("mouseout", leaveImage, {
        passive: true
      });
      image.addEventListener("touchend", leaveImage, {
        passive: true
      });

      image.addEventListener("mousemove", move, {
        passive: true
      });
      image.addEventListener("touchmove", move, {
        passive: true
      });

      image.addEventListener(
        "wheel",
        e => {
          // e.preventDefault();
          e.deltaY > 0 ? zoomLevel-- : zoomLevel++;

          if (zoomLevel < 1) zoomLevel = 1;
          if (zoomLevel > 5) zoomLevel = 5;

          zoom.style.transform = `scale(${zoomLevel})`;
        },
        {
          passive: true
        }
      );
    };
    hoverImg();
  }, []);
  return (
    <div className="image-wrap">
      <div className="image">
        <a href="" target="_blank">
          <img src="" alt="" />
        </a>
      </div>

      <div className="zoomMagnify">
        <img className="zoom-image" src="" alt="" />
      </div>
    </div>
  );
};
