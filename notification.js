document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".order-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const selected = [];
        
        const soup = document.getElementById("input-soup").value;
        const main = document.getElementById("input-main").value;
        const salad = document.getElementById("input-salad").value;
        const drink = document.getElementById("input-drink").value;
        const dessert = document.getElementById("input-dessert").value;

        if (soup) selected.push("soup");
        if (main) selected.push("main");
        if (salad) selected.push("salad");
        if (drink) selected.push("drink");
        if (dessert) selected.push("dessert");

        // Если ничего не выбрано
        if (selected.length === 0) {
            showNotification("Ничего не выбрано. Выберите блюда для заказа", "images/notif-empty.png");
            return;
        }

        // Убираем десерт из проверки, так как он разрешен к любому комбо
        const mainSelected = selected.filter(cat => cat !== "dessert");
        let isValid = false;

        // Проверяем совпадение с комбо
        if (typeof lunchCombos !== 'undefined') {
            for (let combo of lunchCombos) {
                const isMatch = combo.categories.length === mainSelected.length &&
                                combo.categories.every(cat => mainSelected.includes(cat));
                if (isMatch) {
                    isValid = true;
                    break;
                }
            }
        }

        if (isValid) {
            form.submit(); 
            return;
        }

        if (!selected.includes("drink")) {
            showNotification("Выберите напиток", "images/notif-drink.png");
        } else if (selected.includes("soup") && !selected.includes("main") && !selected.includes("salad")) {
            showNotification("Выберите главное блюдо/салат/стартер", "images/notif-main.png");
        } else if (selected.includes("salad") && !selected.includes("soup") && !selected.includes("main")) {
            showNotification("Выберите суп или главное блюдо", "images/notif-soup.png");
        } else {
            showNotification("Выберите главное блюдо", "images/notif-main.png");
        }
    });

    function showNotification(message, imageSrc) {
        const old = document.querySelector(".notification-overlay");
        if (old) old.remove();

        const overlay = document.createElement("div");
        overlay.classList.add("notification-overlay");

        const box = document.createElement("div");
        box.classList.add("notification-box");

        box.innerHTML = `
            <img src="${imageSrc}" alt="Уведомление" onerror="this.style.display='none'">
            <p>${message}</p>
            <button class="notification-btn" type="button">Окей</button>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        box.querySelector(".notification-btn").addEventListener("click", () => {
            overlay.remove();
        });
    }
});