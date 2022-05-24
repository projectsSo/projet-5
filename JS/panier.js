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
//--------------Fin gestion local storage

function afficherPanier() {
  let totalPanier = 0;

  //itérer sur le panier
  let basket = GetBasket();
  for (const product of basket) {
    totalPanier = totalPanier + product.quantity * product.price; //somme du panier

    let htmlgenerate = `
    <tr>
        <td>
        <img src=${product.imageUrl} class="card-img-top">
        </td>
        <td><h3 class="card-title" >${product.name}</h3></td>
        <td><p class="card-text"><span class="infoMobile">Qté: </span>${
          product.quantity
        }</p></td>
        <td><p class="card-text">${product.price / 100 + "€"}</p></td>
        <td><p class="card-text">${
          (product.quantity * product.price) / 100 + "€"
        }</p></td>
        <td><input type="button" value="X" onclick="btnSupprimerDuPanier('${
          product._id
        }')"></td>
    </tr>
        `;

    document.getElementById("corpsPanier").innerHTML += htmlgenerate;

    //afficher le total du panier
    const total = document.getElementById("totalPanier");
    total.innerHTML = `
    <div class='row'>
        <p class="card-text">Total de votre commande: <strong>${
          totalPanier / 100 + "€"
        }</strong></p>
    </div>
    `;
  }
}
afficherPanier(); //call function

const idform = document.querySelector(".commande");

//récupérer le conteneur
function recup(event) {
  var comm = event.target;
}

// Récupération et html
let Total;

const votrePanier = document.querySelector(".etatPanier");
const votrePanierTitre = document.createElement("h2");

const corpsPanier = document.getElementById("corpsPanier");

const totalPanier = document.getElementById("totalPanier");
//console.log(ajoutPanier);

//supprimer un article du panier
function btnSupprimerDuPanier(idToRemove) {
  //localStorage.removeItem(id);
  let basket = GetBasket();

  // supression , on garde tout les éléments sauf celui qui a l'id que l'on souhaite supprimer
  basket = basket.filter((item) => item._id != idToRemove);

  SaveBasket(basket);
  afficherPanier();

  window.alert("L'article a été supprimé de votre panier.");
}

//récupérer les infos du formulaire
function validationClick(e) {
  e.preventDefault(); // Dans un boutton submit, lorsque j'appuie dessus, évite que ça recharge la page
  var nom = document.getElementById("nom");
  var prenom = document.getElementById("prénom").value;
  var email = document.getElementById("email").value;
  var adresse = document.getElementById("adresse").value;
  var ville = document.getElementById("ville").value;

  //vérification si le champ nom est remplis: exemple si on n'utilise pas required
  if (nom.value == "") {
    document.getElementById("erreurnom").innerHTML =
      "Veuillez entrez un nom valide";
    nom.focus();
    return false;
  } else {
    document.getElementById("erreurnom").innerHTML = "";

    /**********Contrôle du formulaire client*******/
    let textAlert = (value) => {
      return `${value}: Chiffre et symbole ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
    };

    let regExNomPrenomVille = (value) => {
      return /^[A-Za-z\s]{1,20}$/.test(value);
    };

    let regExEmail = (value) => {
      return /^[^]+@[^]+\.[A-Za-z]{2,3}$/.test(value);
    };

    let regExAdresse = (value) => {
      return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    };

    {
      //contrôle validité du nom
      let contNom = document.getElementById("nom").value;
      if (regExNomPrenomVille(contNom)) {
      } else {
        alert(textAlert("Nom"));
        return false;
      }
    }

    {
      //contrôle validité du prénom
      let contPrenom = document.getElementById("prénom").value;
      if (regExNomPrenomVille(contPrenom)) {
      } else {
        alert(textAlert("Prénom"));
        return false;
      }
    }

    {
      //contrôle validité de la ville
      let contVille = document.getElementById("ville").value;
      if (regExNomPrenomVille(contVille)) {
      } else {
        alert(textAlert("Ville"));
        return false;
      }
    }

    {
      //contrôle validité d'email
      let contEmail = document.getElementById("email").value;
      if (regExEmail(contEmail)) {
      } else {
        alert("L'email n'est pas valide");
        return false;
      }
    }

    {
      //contrôle validité de l'adresse
      let contAdresse = document.getElementById("adresse").value;
      if (regExAdresse(contAdresse)) {
      } else {
        alert(
          "L'adresse doit contenir que des lettres sans ponctuation et des chiffres"
        );
        return false;
      }
    }
  }

  //Création de la liste
  let productList = [];
  let basket = GetBasket();
  for (const item of basket) {
    productList.push(item._id);
  }

  //alerte si le client valide un panier vide
  if (productList.length == 0) {
    alert("Votre panier est vide");
    return; //empêche l'exécution de la suite de la fonction
  }

  //Affiche le total du prix dans confirmation.js
  let totalPrice = 0;

  basket.forEach(function (produit) {
    totalPrice += (produit.quantity * produit.price) / 100;
    for (const produit of basket) {
      totalPrice = totalPrice + (produit.quantity * produit.price) / 100;
    }
  });

  //var contact = new newUser(nom.value, prenom, adresse, email, ville);
  let contact = {
    firstName: prenom,
    lastName: nom.value,
    address: adresse,
    email: email,
    city: ville,
  };
  //envoyer en post au serveur
  var promise01 = fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify({ contact: contact, products: productList }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  promise01.then(async (response) => {
    try {
      const contenu = await response.json();
      console.log("variableContenu", contenu);

      localStorage.setItem("variableContenu", contenu);

      window.location = `confirmation.html?orderId=${contenu.orderId}&totalprice=${totalPrice}`;

      //Vider le panier
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  });
}
