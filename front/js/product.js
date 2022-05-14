const id = window.location.search.split("?id=").join("");
/*
il fallait supprimer ?id= pour qu'il puisse récuper id propre au produit
visualiser l'id du produit en question 
*/
console.log(id);

let productData = [];

const fetchId = async() => {
    /*async va chercher la reponse avant de passer à la suite */
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json()) /*reponse en .json*/
        .then((promise) => {
            console.log(promise);
        });
    /*récuper les données sous un tableau - méthode fetch*/
};

fetchId();