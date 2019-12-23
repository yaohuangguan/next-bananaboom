import { useEffect } from "react";
import "./Header.scss";
export default () => {
  
  return (
    <div class="toggle-wrap">
      <form class="toggle">
        <input type="radio" id="choice1" name="choice" value="creative" />
        <label for="choice1">Speed</label>

        <input type="radio" id="choice2" name="choice" value="productive" />
        <label for="choice2">Quality</label>

        <div id="flap">
          <span class="content">productive</span>
        </div>
      </form>
    </div>
  );
};
