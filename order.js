document.addEventListener("DOMContentLoaded", () => {
    const order = {
        soup: null,
        main: null,
        drink: null
    };

    const categoryNames = {
        soup: "Суп",
        main: "Главное блюдо",
        drink: "Напиток"
    };

    const emptyMessages = {
        soup: "Блюдо не выбрано",
        main: "Блюдо не выбрано",
        drink: "Напиток не выбран"
    };

    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");
    const totalPriceEl = document.getElementById("total-price");

    const inputSoup = document.getElementById("input-soup");
    const inputMain = document.getElementById("input-main");
    const inputDrink = document.getElementById("input-drink");
    const inputTotal = document.getElementById("input-total");

    const resetBtn = document.querySelector(".reset-btn");

    const cards = document.querySelectorAll(".dish-card");

    cards.forEach(card => {
        const button = card.querySelector("button");
        button.addEventListener("click", () => {
            const keyword = card.getAttribute("data-dish");
            const category = card.getAttribute("data-category");

            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;

            if (order[category] && order[category].keyword === keyword) {
                order[category] = null;
                card.classList.remove("selected");
            } else {
                document.querySelectorAll(`.dish-card[data-category="${category}"]`)
                    .forEach(c => c.classList.remove("selected"));

                order[category] = dish;
                card.classList.add("selected");
            }

            updateOrderSummary();
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            order.soup = null;
            order.main = null;
            order.drink = null;

            document.querySelectorAll(".dish-card.selected")
                .forEach(c => c.classList.remove("selected"));

            updateOrderSummary();
        });
    }

    function updateOrderSummary() {
        const chosen = Object.values(order).filter(Boolean);

        if (chosen.length === 0) {
            orderSummary.innerHTML = '<p class="empty-message">Ничего не выбрано</p>';
            orderTotal.hidden = true;
            inputSoup.value = "";
            inputMain.value = "";
            inputDrink.value = "";
            inputTotal.value = "";
            return;
        }

        orderTotal.hidden = false;

        let html = "";
        let total = 0;

        ["soup", "main", "drink"].forEach(cat => {
            if (order[cat]) {
                html += `<div class="order-item">
                    <span class="order-item-category">${categoryNames[cat]}:</span>
                    <span class="order-item-name">${order[cat].name}</span>
                    <span class="order-item-price">${order[cat].price}₽</span>
                </div>`;
                total += order[cat].price;
            } else {
                html += `<div class="order-item">
                    <span class="order-item-category">${categoryNames[cat]}:</span>
                    <span class="order-item-empty">${emptyMessages[cat]}</span>
                </div>`;
            }
        });

        orderSummary.innerHTML = html;
        totalPriceEl.textContent = total;

        inputSoup.value = order.soup ? order.soup.keyword : "";
        inputMain.value = order.main ? order.main.keyword : "";
        inputDrink.value = order.drink ? order.drink.keyword : "";
        inputTotal.value = total;
    }
});