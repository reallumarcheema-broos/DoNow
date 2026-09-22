/* SpeedMeter — shared theme switch, used by every page. */
(function(){
  "use strict";
  var TKEY = "speedmeter.theme";
  function applyTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    var m = document.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute("content", t === "light" ? "#f5f7fc" : "#080b14");
    try{ localStorage.setItem(TKEY, t); }catch(e){}
  }
  var saved = null;
  try{ saved = localStorage.getItem(TKEY); }catch(e){}
  if(!saved) saved = (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  applyTheme(saved);

  document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("theme");
    if(btn) btn.addEventListener("click", function(){
      applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
    var y = document.getElementById("year");
    if(y) y.textContent = new Date().getFullYear();
  });
})();
