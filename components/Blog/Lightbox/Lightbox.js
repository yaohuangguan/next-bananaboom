import React from "react";
import axios from "isomorphic-unfetch";
import { useState, useEffect } from "react";
const Lightbox = () => {
  const [pictures, setPictures] = useState("");
  useEffect(() => {
    async function getPictures(){
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=21",
        {
          mode: "cors"
        }
      );
      const data = await response.json();
      setPictures(data);
    }
    getPictures()

  }, []);

  return (
    <div className="grid px-4">
      <h4 className="text-center">Some Inspirations..</h4>
      {pictures
        ? pictures.map(picture => (
            <div className="mdb-lightbox no-margin flex" key={picture.id}>
              <img
                src={picture.download_url}
                className="img-fluid"
                alt="lightbox"
              />
              <p>{picture.author}</p>
            </div>
          ))
        : `Something wrong happened during the render process. try again.`}
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 1rem;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .flex {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Lightbox;
