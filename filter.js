document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-kind");
            const section = button.closest("section");
            const cards = section.querySelectorAll(".dish-card");
            const isActive = button.classList.contains("active");

            section.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));

            if (isActive) {
                cards.forEach(card => card.style.display = "");
                return;
            }

            button.classList.add("active");

            cards.forEach(card => {
                const kind = card.getAttribute("data-kind");
                if (kind === filter) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});