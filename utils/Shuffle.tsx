//Durstenfeld shuffle algorithm, a computer-optimized version of Fisher-Yates
//algorithm works by picking one random element for each original array element, and then //excluding it from the next draw. swapping the picked element with the current element, ///and then picking the next random element from the remainder.
//note: shuffle function is not pure function, it mutates original array
//in order to avoid memory duplication
const shuffle = (array) => {
  let currentIndex = array.length
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
   let temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array
}
export default shuffle