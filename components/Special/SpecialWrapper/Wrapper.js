import React from "react";
import dynamic from "next/dynamic";
const Meteor = dynamic(() => import("../Meteor/Meteor"));
const Music = dynamic(() => import("../MusicPlayer/Music"));

const Wrapper = ({ project }) => {
  console.log(project);
  function wrap() {
    switch (project) {
      case "music":
        return <Music></Music>;
      case "meteor":
        return <Meteor></Meteor>;
      default:
        return 'Something wrong' ;
    }
  }
  return <>{wrap()}</>;
};

export default Wrapper;
