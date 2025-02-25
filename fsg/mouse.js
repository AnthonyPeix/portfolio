document.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    
    // Position du clic
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    
    document.getElementById("ripple-container").appendChild(ripple);

    // Supprimer après l'animation
    setTimeout(() => ripple.remove(), 600);
});

