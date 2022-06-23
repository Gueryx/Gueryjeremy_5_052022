async function kanapData() {
    let productList = await fetch("http://localhost:3000/api/products");
    return productList.json();
}

async function products() {
    await kanapData()
        .then((productList) => {
            for (let i = 0; i < productList.length; i++) {

                const parent = document.createElement('a');

                parent.href = `product.html?id=${productList[i]._id}`;

                parent.innerHTML = `
                <article>
                    <img src="${productList[i].imageUrl}" alt="${productList[i].altTxt}"/>
                    <h3 class="productName">${productList[i].name}</h3>
                    <p class="productDescription">${productList[i].description}</p>
                </article>
                `;

                document.getElementById("items").appendChild(parent);

            }
        });
    console.log("ajout des produits dynamiquement");
}

kanapData();
products();