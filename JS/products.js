let urlParam = new URL(document.location).searchParams; //J'appelle l'API uniquement avec le nounours qui m'interesse
let productId = urlParam.get("id"); //Il faut stocker l'id dans une variable
let product = null;

fetch("http://localhost:3000/api/teddies/" + productId)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data);
    product = data;

    let colors = "";

    for (const color of data.colors) {
      colors += `<option>${color}</option> `; //sélection de couleurs
    }

    let container = `
    <div class='col'>
        <div class="card" id="change-card">
        <img src=${data.imageUrl} id="topi" class="card-img-top">
        <div class="card-body"></div>
            <h3 class="card-title" >${data.name}</h3>
            <p class="description">${data.description}</p>
            <p class="card-text">${data.price / 100 + " €"}</p>
            <h4>Choisissez votre couleur</h4>
            <select class="color">${colors}</select>
        </div>
    </div>
        `;

    document.getElementById("product").innerHTML = container;

    console.log(container);
  })

  .catch(function (error) {
    window.alert("Pensez bien à lancer le serveur local (port 3000).");
  });

//Ajout panier
function ajouterAuPanier() {
  if (product == null) {
    return;
  }
  let basket = GetBasket();

  let indexInBasket = basket.findIndex((item) => item._id === productId);

  //index ==-1 signifie non trouvé
  if (indexInBasket < 0) {
    // si non présent dans le panier
    product.quantity = 1;

    basket.push(product);
  } // produit déja présent, modifier quantité
  else {
    basket[indexInBasket].quantity += 1;
  }

  SaveBasket(basket);
  window.alert("Votre article a été ajouté au panier.");
}

//------------Gestion du local storage

function GetBasket() {
  let basketFromStorage = localStorage.getItem("basket");
  if (basketFromStorage === null) {
    return [];
  } else {
    return JSON.parse(basketFromStorage);
  }
}
function SaveBasket(basketToSave) {
  let basketString = JSON.stringify(basketToSave);
  localStorage.setItem("basket", basketString);
}
