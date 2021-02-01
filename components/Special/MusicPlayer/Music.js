import React, { useEffect } from "react";
import "./music.css";
import Image from "../../../public/image"
// tslint:disable

const Music = () => {
  useEffect(() => {
    const musicContainer = document.getElementById("music-container");
    const playBtn = document.getElementById("play");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const audio = document.getElementById("audio");
    const progress = document.getElementById("progress");
    const buffer = document.getElementById("buffer");
    const progressContainer = document.getElementById("progress-container");
    const title = document.getElementById("title");
    const cover = document.getElementById("cover");

    // Song titles
    const songs = ["simmer", "titanic", "sayyouwontletgo", "heroes"];

    // Keep track of song
    let songIndex = 0;

    // Initially load song details into DOM
    loadSong(songs[songIndex]);

    // Update song details
    function loadSong(song) {
      if (song == "simmer") {
        title.innerText = "Simmer - Hayley Williams";
      } else if (song == "titanic") {
        title.innerText = "Hymn to the sea - Titanic";
      } else if (song == "sayyouwontletgo") {
        title.innerText = "Say you won't let go";
      } else if (song == "heroes") {
        title.innerText = "Heroes";
      }
      audio.src = `/music/${song}.mp3`;
      cover.src = `/${song}.jpg`;
    }

    // Play song
    function playSong() {
      musicContainer.classList.add("play");
      playBtn.querySelector("i.fas").classList.remove("fa-play");
      playBtn.querySelector("i.fas").classList.add("fa-pause");

      audio.play();
    }

    // Pause song
    function pauseSong() {
      musicContainer.classList.remove("play");
      playBtn.querySelector("i.fas").classList.add("fa-play");
      playBtn.querySelector("i.fas").classList.remove("fa-pause");

      audio.pause();
    }

    // Previous song
    function prevSong() {
      songIndex--;

      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }

      loadSong(songs[songIndex]);

      playSong();
    }

    // Next song
    function nextSong() {
      songIndex++;

      if (songIndex > songs.length - 1) {
        songIndex = 0;
      }

      loadSong(songs[songIndex]);

      playSong();
    }

    // Update progress bar
    const updateProgress = (e) => {
      const { duration, currentTime, buffered } = e.srcElement;
      if (duration || currentTime) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
      }
    };

    // Set progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;

      audio.currentTime = (clickX / width) * duration;
    }

    // Event listeners
    playBtn.addEventListener("click", () => {
      const isPlaying = musicContainer.classList.contains("play");

      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });

    // Change song
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", nextSong);

    // Time/song update
    audio.addEventListener("timeupdate", updateProgress);

    // Click on progress bar
    progressContainer.addEventListener("click", setProgress);

    // Song ends
    audio.addEventListener("ended", nextSong);
    return () => {
      prevBtn.removeEventListener("click", prevSong);
      nextBtn.removeEventListener("click", nextSong);

      // Time/song update
      audio.removeEventListener("timeupdate", updateProgress);

      // Click on progress bar
      progressContainer.removeEventListener("click", setProgress);

      // Song ends
      audio.removeEventListener("ended", nextSong);
    };
  }, []);
  return (
    <div className="music-container" id="music-container">
      <div className="music-info">
        <h4 id="title"></h4>
        <div className="progress-container" id="progress-container">
          <div className="progress" id="progress">
            <div className="buffer" id="buffer"></div>
          </div>
        </div>
      </div>

      <audio src="/music/simmer.mp3" id="audio"></audio>

      <div className="img-container">
        <Image src="/simmer.jpg" alt="music-cover" id="cover" />
      </div>
      <div className="navigation">
        <button id="prev" className="action-btn">
          <i className="fas fa-backward"></i>
        </button>
        <button id="play" className="action-btn action-btn-big">
          <i className="fas fa-play"></i>
        </button>
        <button id="next" className="action-btn">
          <i className="fas fa-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default Music;
