import React from "react";
import Meteor from "../Meteor/meteor";
import Music from "../MusicPlayer/Music";
const Wrapper = ({ project }) => {
  function wrap() {
    switch (project) {
      case "music":
        return <Music></Music>;
      case "meteor":
        return <Meteor></Meteor>;
      default:
        return;
    }
  }
  return <>{wrap()}</>;
};

export default Wrapper;
