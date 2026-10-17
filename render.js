document.addEventListener("DOMContentLoaded", () => {
    const categories = ["soup", "main", "drink"];

    categories.forEach(category => {
        const grid = document.querySelector(`.dishes-grid[data-category="${category}"]`);
        if (!grid) return;

        const categoryDishes = dishes
            .filter(dish => dish.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));

        categoryDishes.forEach(dish => {
            const card = document.createElement("div");
            card.classList.add("dish-card");
            card.setAttribute("data-dish", dish.keyword);
            card.setAttribute("data-category", dish.category);
            card.setAttribute("data-price", dish.price);

            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="dish-price">${dish.price}₽</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
                <button type="button">Добавить</button>
            `;

            grid.appendChild(card);
        });
    });
});