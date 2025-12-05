let total = 0;

// Carrega produtos do arquivo JSON
fetch("products.json")
    .then(res => res.json())
    .then(data => renderCategories(data));

// Renderizar categorias minimizáveis
function renderCategories(data) {
    const container = document.getElementById("categories");

    Object.keys(data).forEach(categoryName => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const header = document.createElement("div");
        header.classList.add("category-header");
        header.textContent = categoryName;

        const productList = document.createElement("div");
        productList.classList.add("product-list");

        // Ao clicar no header → expandir/fechar
        header.addEventListener("click", () => {
            productList.style.display =
                productList.style.display === "none" ? "block" : "none";
        });

        // Listar produtos
        data[categoryName].forEach(product => {
            const prod = document.createElement("div");
            prod.classList.add("product");
            prod.textContent = `${product.name} — R$ ${product.price.toFixed(2)}`;

            prod.addEventListener("click", () => addToTotal(product.price));

            productList.appendChild(prod);
        });

        // Montagem final
        categoryDiv.appendChild(header);
        categoryDiv.appendChild(productList);
        container.appendChild(categoryDiv);
    });
}

// Somar ao total
function addToTotal(price) {
    total += price;
    document.getElementById("total").textContent = total.toFixed(2);
}

// Botão de limpar
document.getElementById("clear").addEventListener("click", () => {
    total = 0;
    document.getElementById("total").textContent = "0.00";
});
