/*With this code I create a JSON file to create the home page */ 
/*let beginningcocktail;
const cocktailarr = [];

const randomCocktail = async () => {
  const respuesta = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  const data = await respuesta.json();
  beginningcocktail = data.drinks;
  //console.log(data.drinks);
  return beginningcocktail;
};

for (i = 0; i <100 ; i++) {
  // console.log(randomCocktail())
  randomCocktail().then((cocktail) => cocktailarr.push(cocktail[0]));
}

//const JsonArray = JSON.stringify(cocktailarr)
console.log(JSON.stringify(cocktailarr))*/

let cocktails
let cocktails2
let modalWrap = null
let cocktailData
let cocktailVodka
let cocktailWhisky
let cocktailTequila
let cocktailRandom

fetch("js/cocktails.json")
  .then(response => response.json())
  .then((data) => {
    cocktails = data.drinks;
    console.log(cocktails)
    createCard(cocktails)
});

let createCard = (cocktailsCard) => {
  document.querySelector('#card-container').innerHTML = ''
  
  for(let i in cocktailsCard){

    let col = document.createElement('div')
    col.classList.add('col', 'col-lg-3')

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-id', cocktailsCard[i].idDrink)

    card.innerHTML = `<div class="card-image">
                        <div class="card">
                          <img src="${cocktailsCard[i].strDrinkThumb}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${cocktailsCard[i].strDrink}</h5>
                          </div>
                        </div>
                      </div>`

    
    col.append(card)
    document.querySelector("#card-container").append(col)
    card.addEventListener("click", () => getData(card.dataset.id))

    /*this is another way to create the cards

    let img = document.createElement('img')
    img.src = cocktails[i].strDrinkThumb
    img.classList.add('card-img-top')

    card.append(img)

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let h5 = document.createElement('h5')
    h5.classList.add('card-title')
    h5.innerText = cocktails[i].strDrink

    cardBody.append(h5)

    let a = document.createElement('a')
    a.setAttribute('href','#')
    a.classList.add('btn','btn-primary')
    a.innerText = 'Ver perfil'

    cardBody.append(a)

    card.append(cardBody)

    col.append(card)

    document.querySelector('#card-container').append(col)*/

    /*
    <div class="col col-lg-3">
        <div class="card">
            <img src="https://www.thecocktaildb.com/images/media/drink/09yd5f1493069852.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Apple Slammer</h5>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
        </div>

    </div> */
  }

}

const searchCocktail = async event => {
  event.preventDefault()
  const {value} = event.target.cocktails
  console.log(value)
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value.toLowerCase()}`)
  const data =  await response.json()
  cocktails2 = data.drinks
  console.log(data.drinks)
  createCard(cocktails2)
  document.getElementById('cocktail-input').value = ''
}

const searchVodka = async () => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka`)
  const data =  await response.json()
  cocktailVodka = data.drinks
  createCard(cocktailVodka)
}

const searchWhisky = async () => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=whiskey`)
  const data =  await response.json()
  cocktailWhisky = data.drinks
  createCard(cocktailWhisky)
}

const searchTequila = async () => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=tequila`)
  const data =  await response.json()
  cocktailTequila = data.drinks
  createCard(cocktailTequila)
}
const searchRandom = async () => {
  const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  const data = await response.json();
  cocktailRandom = data.drinks
  createCard(cocktailRandom)
}

document.querySelector('#btn-home').addEventListener('click', () => createCard(cocktails))
document.querySelector('#btn-vodka').addEventListener('click', () => searchVodka())
document.querySelector('#btn-whisky').addEventListener('click', () => searchWhisky())
document.querySelector('#btn-tequila').addEventListener('click', () => searchTequila())
document.querySelector('#btn-random').addEventListener('click', () => searchRandom())



const getData = async (id) =>{
  
  if (id !== undefined) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json();
        cocktailData =  Object.values(data.drinks[0])
        
        let ingredientArray=[]
        for(let i=17; i<32; i++){
          if(cocktailData[i] ){
            ingredientArray.push(cocktailData[i])
          }
        }
        let measureArray=[]
        for(let i=32; i<47; i++){
          if(cocktailData[i] ){
            measureArray.push(cocktailData[i])
          }
        }
        const cocktailName = data.drinks[0].strDrink
        const instructions = data.drinks[0].strInstructions

        showModal(cocktailName,ingredientArray,measureArray,instructions)
      }
}


const showModal = (name,ingredientArray,measureArray,instructions) => {

  if(modalWrap !== null){
    modalWrap.remove()
  }
    let ingredients = {}
    for(let i = 0; i<15; i++){
      ingredients['i' + i] =  ingredientArray[i] == undefined ? '' : ingredientArray[i]
    }

    let measures = {}
    for(let i = 0; i<15; i++){
      measures['m' + i] =  measureArray[i] == undefined ? '' : measureArray[i]
    } 

  modalWrap = document.createElement('div')
  modalWrap.innerHTML =`
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel">${name}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3> Ingredients </h3>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">ingredient</th>
                <th scope="col">amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">${ingredients.i0}</th>
                <td>${measures.m0}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i1}</th>
                <td>${measures.m1}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i2}</th>
                <td>${measures.m2}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i3}</th>
                <td>${measures.m3}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i4}</th>
                <td>${measures.m4}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i5}</th>
                <td>${measures.m5}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i6}</th>
                <td>${measures.m6}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i7}</th>
                <td>${measures.m7}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i8}</th>
                <td>${measures.m8}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i9}</th>
                <td>${measures.m9}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i10}</th>
                <td>${measures.m10}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i11}</th>
                <td>${measures.m11}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i12}</th>
                <td>${measures.m12}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i13}</th>
                <td>${measures.m13}</td>
              </tr>
              <tr>
                <th scope="row">${ingredients.i14}</th>
                <td>${measures.m14}</td>
              </tr>
            <tbody>
          </table>
           
          
          <h3>Preparation</h3>
          <p id='cocktail-instructions'>${instructions}</p>
        </div>
       
      </div>
    </div>
  </div>
`
document.body.append(modalWrap)

let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'))
modal.show()
}


