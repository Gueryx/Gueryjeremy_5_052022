async function kanapData() {
    let productList = await fetch("http://localhost:3000/api/products");
    return productList.json();
}

async function products() {
    await kanapData()
        .then((productList) => {
            for (let i = 0; i < productList.length; i++) {

                const article = document.createElement('a');

                article.href = `product.html?id=${productList[i]._id}`;

                article.innerHTML = `
                <article>
                    <img src="${productList[i].imageUrl}" alt="${productList[i].name}"/>
                    <h3 class="productName">${productList[i].name}</h3>
                    <p class="productDescription">${productList[i].description}</p>
                </article>
                `;

                document.getElementById("items").appendChild(article);

            }
        });
    console.log("ajout des produits dynamiquement");
}

kanapData();
products();