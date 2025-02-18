document.addEventListener("DOMContentLoaded", () => {
  const step = 20; // Rotation step threshold
  let accumulatedRotation = 0;
  let isDragging = false;
  let lastAngle = null;
  let activeIndex = -1; // Track which div is currently highlighted

  const wheel = document.getElementById("wheel");
  

  function getAngle(x, y, centerX, centerY) {
      return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  }

  function handleRotationChange(deltaAngle) {
      accumulatedRotation += deltaAngle;

      if (Math.abs(accumulatedRotation) >= step) {
          const steps = Math.floor(accumulatedRotation / step);
          accumulatedRotation %= step; // Keep the remainder for smooth tracking

          console.log(`STEP: ${steps > 0 ? "Clockwise" : "Counterclockwise"} (${steps} steps)`);

          if (steps > 0 && activeIndex < debugDivs.length - 1) {
              // Move forward → highlight next div
              activeIndex++;
              debugDivs[activeIndex].style.backgroundColor = "red";
          } else if (steps < 0 && activeIndex >= 0) {
              // Move backward → remove highlight from last div
              debugDivs[activeIndex].style.backgroundColor = "blue";
              activeIndex--;
          }
      }
  }

  function handleStart(x, y) {
      const rect = wheel.getBoundingClientRect();
      lastAngle = getAngle(x, y, rect.left + rect.width / 2, rect.top + rect.height / 2);
      isDragging = true;
  }

  function handleMove(x, y) {
      if (!isDragging) return;

      const rect = wheel.getBoundingClientRect();
      const angle = getAngle(x, y, rect.left + rect.width / 2, rect.top + rect.height / 2);

      if (lastAngle !== null) {
          let deltaAngle = angle - lastAngle;

          // Handle wrap-around (crossing -180° or 180°)
          if (deltaAngle > 180) deltaAngle -= 360;
          if (deltaAngle < -180) deltaAngle += 360;

          handleRotationChange(deltaAngle);
      }

      lastAngle = angle;
  }

  function handleEnd() {
      isDragging = false;
      lastAngle = null;
  }

  // Mouse events
  wheel.addEventListener("mousedown", (e) => handleStart(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
  window.addEventListener("mouseup", handleEnd);

  // Touch events (for mobile support)
  wheel.addEventListener("touchstart", (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY));
  window.addEventListener("touchmove", (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY));
  window.addEventListener("touchend", handleEnd);
});
