export function copyText(textToCopy,copied) {
 let dummy = document.createElement('input')
  let url = textToCopy
  document.body.appendChild(dummy);
  dummy.value = url
  dummy.select();
  dummy.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(dummy);

 let tooltip = document.getElementById(copied);
  tooltip.innerHTML = "Copied: " + url;
}

export function outFunc() {
 let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}