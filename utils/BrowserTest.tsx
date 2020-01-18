import React from "react";

class BrowserTest extends React.Component {
  componentDidMount() {
    var version = detectIE();
    if (version && version < 11) {
      document.getElementById("browser-not-supported").innerHTML =
        "<h4>" + "您的浏览器不支持，建议使用Chrome或Firefox浏览器" + "</h4>";
    } else {
      console.log("用户没有使用ie，挂载正常");
    }

    function detectIE() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }
      var trident = ua.indexOf("Trident/");
      if (trident > 0) {
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }
      var edge = ua.indexOf("Edge/");
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
      }
      return false;
    }
  }
  render() {
    return (
      <div
        id="browser-not-supported"
        style={{ width: "100%", textAlign: "center" }}
      ></div>
    );
  }
}

export default BrowserTest;
