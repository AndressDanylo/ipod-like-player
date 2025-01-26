document.addEventListener("DOMContentLoaded", () => {
    // TODO add mobile support
    const wheel = document.getElementById("wheel");

    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;

    function getAngle(x, y, centerX, centerY) {
        const dx = x - centerX;
        const dy = y - centerY;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    };

    wheel.addEventListener("mousedown", (event) => {
        isDragging = true;
        const rect = wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        startAngle = getAngle(event.clientX, event.clientY, centerX, centerY);
    });
    
    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        const rect = wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = getAngle(event.clientX, event.clientY, centerX, centerY);

        const deltaAngle = angle - startAngle;
        currentAngle += deltaAngle;
        startAngle = angle;

        // TODO Update UI
        console.log(`Angle: ${Math.round(currentAngle)}`);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });
  });
  