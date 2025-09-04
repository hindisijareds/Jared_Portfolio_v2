// assets/js/easteregg.js
(function () {
  // debug log to verify file loaded
  console.log("[easteregg] script loaded");

  const konami = [
    "arrowup", "arrowup",
    "arrowdown", "arrowdown",
    "arrowleft", "arrowright",
    "arrowleft", "arrowright",
    "b", "a"
  ];

  let pos = 0;
  let active = false; // prevent retrigger while active

  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toString().toLowerCase();
    // debug each key (uncomment if you want lots of logs)
    // console.log("[easteregg] key:", key, "pos:", pos);

    // quick test trigger
    if (key === "l") {
      console.log("[easteregg] quick-trigger (L)");
      trigger();
      return;
    }

    // step-by-step match (robust)
    if (key === konami[pos]) {
      pos++;
      if (pos === konami.length) {
        console.log("[easteregg] konami matched");
        trigger();
        pos = 0;
      }
    } else {
      // if mismatch, reset but if this key matches first code key then set pos = 1
      pos = (key === konami[0]) ? 1 : 0;
    }
  });

  function trigger() {
    if (active) {
      console.log("[easteregg] already active, ignoring");
      return;
    }
    active = true;
    showOverlayMessage()
      .then(() => {
        active = false;
      })
      .catch(() => {
        active = false;
      });
  }

  function showOverlayMessage() {
    return new Promise((resolve) => {
      // Create style (once)
      const style = document.createElement("style");
      style.id = "easteregg-styles";
      style.textContent = `
        @keyframes ee-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ee-fade-out { from { opacity: 1 } to { opacity: 0 } }
        @keyframes ee-pulse { 0%{ transform: scale(1)} 50%{ transform: scale(1.08)} 100%{ transform: scale(1)} }

        .ee-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          animation: ee-fade-in 300ms ease forwards;
        }
        .ee-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          pointer-events: none;
          transform-origin: center;
        }
        .ee-arm {
          font-size: 8rem;
          animation: ee-pulse 1.4s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(255,77,77,0.9));
        }
        .ee-text {
          font-size: 3rem;
          font-weight: 700;
          color: #ff4d4d;
          text-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,77,77,0.85);
          pointer-events: none;
        }

        /* responsive scale down for small screens */
        @media (max-width: 480px) {
          .ee-arm { font-size: 5rem; }
          .ee-text { font-size: 1.4rem; }
        }
      `;
      // avoid adding duplicate styles
      if (!document.getElementById("easteregg-styles")) {
        document.head.appendChild(style);
      }

      // overlay
      const overlay = document.createElement("div");
      overlay.className = "ee-overlay";

      // content container
      const box = document.createElement("div");
      box.className = "ee-box";

      const arm = document.createElement("div");
      arm.className = "ee-arm";
      arm.textContent = "👻";

      const text = document.createElement("div");
      text.className = "ee-text ee-arm";
      text.textContent = "I Love You";

      box.appendChild(arm);
      box.appendChild(text);
      overlay.appendChild(box);
      document.body.appendChild(overlay);

      // remove after 5s with fade-out
      setTimeout(() => {
        overlay.style.animation = "ee-fade-out 400ms ease forwards";
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 450);
      }, 5000);
    });
  }
})();
