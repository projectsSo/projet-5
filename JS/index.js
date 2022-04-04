/// --------- Utilisation de fetch avec la méthode GET pour récupérer les données de l'API ---------

const url = "http://localhost:3000/api/teddies";

fetch(url)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data);

    //afficher sur la page html
    let listOfTeddies = "";
    data.forEach(
      (produits) =>
        (listOfTeddies += `
      <div class="nounours">
        <div class="card">
          <img src=${produits.imageUrl} class="card-img-top">
          <div class="card-body"></div>
           <h3 class="card-title" >${
             produits.name
           }</h3><a class="more" href="products.html?id=${
          produits._id
        }">Afficher plus</a>
            <p class="card-text">${produits.price / 100 + " €"}</p>
          </div>
      </div>
      `)
    );

    document.getElementById("allProducts").innerHTML = listOfTeddies;
  })

  .catch(function (error) {
    console.log("Pensez bien à lancer le serveur local (port 3000).");
  });
