/* ============================================================
   SpeedMeter — Google AdSense loader.

   SET YOUR PUBLISHER ID BELOW. It is the only change needed;
   every page reads this one file.

     PUB_ID = "ca-pub-1234567890123456";

   Until a real ID is set, no ad code loads and the slots stay
   invisible — so the site looks clean while you wait for review.

   Each slot in the HTML looks like:
     <div class="ad-slot" data-ad-slot="1234567890"></div>
   where data-ad-slot is the unit ID from your AdSense dashboard.
   Slots with no matching unit can stay as they are; set
   AUTO_ONLY = true to ignore them and use Auto ads instead.
   ============================================================ */
(function(){
  "use strict";

  var PUB_ID    = "ca-pub-XXXXXXXXXXXXXXXX";   /* <-- replace this */
  var AUTO_ONLY = false;                        /* true = Auto ads only */

  if(!/^ca-pub-\d{16}$/.test(PUB_ID)) return;   /* not configured yet */

  var loader = document.createElement("script");
  loader.async = true;
  loader.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + PUB_ID;
  loader.crossOrigin = "anonymous";
  document.head.appendChild(loader);

  if(AUTO_ONLY) return;

  document.addEventListener("DOMContentLoaded", function(){
    var slots = document.querySelectorAll(".ad-slot[data-ad-slot]"), i;
    for(i = 0; i < slots.length; i++){
      (function(slot){
        var unit = slot.getAttribute("data-ad-slot");
        if(!unit || !/^\d+$/.test(unit)) return;

        var label = document.createElement("span");
        label.className = "ad-label";
        label.textContent = "Advertisement";

        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", PUB_ID);
        ins.setAttribute("data-ad-slot", unit);
        ins.setAttribute("data-ad-format", slot.getAttribute("data-ad-format") || "auto");
        ins.setAttribute("data-full-width-responsive", "true");

        slot.appendChild(label);
        slot.appendChild(ins);
        try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
      })(slots[i]);
    }
  });
})();
