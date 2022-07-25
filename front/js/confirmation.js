// Récupération de id via l'URL
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Pour l'affichage de l'id --> création d'un inner.HTML via id de l'élément "orderId", pour afficher le numéro de commande 
const toDisplayId = document.getElementById('orderId');
toDisplayId.innerHTML = id;

localStorage.clear();