const burger = document.querySelector('.burger')
const navigation = document.querySelector('.navigation')
const cardButtonLeft = document.querySelector('.card-button-left')
const cardButtonRight = document.querySelector('.card-button-right')
const ourFriendList = document.querySelector('.our-friends-list')
const ourFriendCards = document.querySelectorAll('.our-friends-card')
const ourFriendCarousel = document.querySelector('.our-friends-carousel')
const carouselWrapper = document.querySelector('.carousel-wrapper')
const popup = document.querySelector('.popup')
const popupItem = document.querySelector('.popup-item')
const ourPetsPaginator = document.querySelector('.our-pets-paginator')
const ourPetsList = document.querySelector('.our-pets-list')
const paginatorButtonPage = document.querySelector('.paginator-button-page')
const paginatorButtonStart = document.querySelector('.paginator-button-start')
const paginatorButtonPrevious = document.querySelector('.paginator-button-previous')
const paginatorButtonNext = document.querySelector('.paginator-button-next')
const paginatorButtonEnd = document.querySelector('.paginator-button-end')
let pets = []
let currentCard = 0
let pages = 6
let currentPage = 1
let cardsAtPage = 8
let currentPagePets = []
paginatorButtonPage.innerText = currentPage
let ourPetsArr = []
let arrsLength = 0
function fetchPets(){
  fetch('./pets.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('data',data)
    // shuffle(data)
    pets = data
  });
}

fetchPets()




function drawPaginatorsCardsLists(){
  // let newArr = []
  let newArr = []
  ourPetsArr = []
  arrsLength = 0
  // currentPage = 1

  for(let i = 0;i < 6;i++){
    newArr.push(...pets)
    arrsLength += pets.length
  }
  console.log('newArr before',newArr)
  pages = Math.floor(arrsLength / amountCardsToDrawAtPage())
  console.log('arrsLength',arrsLength)
  console.log('amountCardsToDrawAtPage()',amountCardsToDrawAtPage())
  console.log('arrsLength / amountCardsToDrawAtPage()',arrsLength / amountCardsToDrawAtPage())
  console.log('pages in drawPaginatorsCardsLists()',pages)
  cardsAtPage = amountCardsToDrawAtPage()
  for(let i = 0;i < pages;i++){
    ourPetsArr.push(newArr.splice(0,cardsAtPage))
    console.log('ourPetsArr in iteration',ourPetsArr)
    // arrsLength += cardsAtPage
  }
  console.log('newArr after',newArr)

  console.log('pages',pages)
  // ourPetsArr = newArr
  console.log('ourPetsArr in drawPaginatorsCardsLists()',ourPetsArr)
    checkButtonsStats()
}

window.addEventListener("load", () => {
  console.log("load",pets)
  console.log("amountCardsToDrawAtPage()",amountCardsToDrawAtPage())
  amountCardsToDrawAtPage()
  drawPaginatorsCardsLists()
  updatePetsDraw(true)
});

// function handlePage(step){
//   page += step
// }

function checkButtonsStats(){
  if(currentPage > pages){
    currentPage = ourPetsArr.length
    paginatorButtonPage.innerText = String(currentPage)
  }
  updatePetsDraw()
  console.log('currentPage in checkButtonsStats()',currentPage)
  if(currentPage === 1){
    paginatorButtonStart.classList.add('button-disabled')
    paginatorButtonPrevious.classList.add('button-disabled')
    paginatorButtonNext.classList.remove('button-disabled')
    paginatorButtonEnd.classList.remove('button-disabled')
  }else if(currentPage > 1 && currentPage < pages){
    paginatorButtonStart.classList.remove('button-disabled')
    paginatorButtonPrevious.classList.remove('button-disabled')
    paginatorButtonNext.classList.remove('button-disabled')
    paginatorButtonEnd.classList.remove('button-disabled')
  }else if (currentPage === pages){
    paginatorButtonStart.classList.remove('button-disabled')
    paginatorButtonPrevious.classList.remove('button-disabled')
    paginatorButtonNext.classList.add('button-disabled')
    paginatorButtonEnd.classList.add('button-disabled')
  }
  // paginatorButtonStart.classList.toggle(currentPage === 1 ? 'button-disabled': 'button-active')
  // paginatorButtonPrevious.classList.toggle(currentPage > 1 ? 'button-active' : 'button-disabled')
  // paginatorButtonNext.classList.toggle(currentPage === pages ? 'button-disabled' : 'button-active')
  // paginatorButtonEnd.classList.toggle(currentPage === pages ? 'button-disabled' : 'button-active')
}

paginatorButtonStart.addEventListener('click',() => {
  currentPage = 1
  checkButtonsStats()
  paginatorButtonPage.innerText = String(currentPage)
})
paginatorButtonPrevious.addEventListener('click',() => {
  currentPage > 1 ? currentPage -= 1 : 0
  checkButtonsStats()
  paginatorButtonPage.innerText = String(currentPage)
  console.log('currentPage',currentPage)
})
paginatorButtonNext.addEventListener('click',() => {
  currentPage  < pages ? currentPage += 1 : 0
  checkButtonsStats()
  paginatorButtonPage.innerText = String(currentPage)
  console.log('pages',pages)
  console.log('currentPage',currentPage)
  console.log('ourPetsArr.length',ourPetsArr.length)
})
paginatorButtonEnd.addEventListener('click',() => {
  currentPage = pages
  checkButtonsStats()
  paginatorButtonPage.innerText = String(currentPage)
})

function elemWidthPxToNum(elem,prop = 'width'){
  return Number(window.getComputedStyle(elem)[prop].match(/-?\d+/g)[0])
}

function shuffle (arr){
  let shuffled = [].concat(arr)
  for(let i = shuffled.length - 1;i > 0;i--){
    let random = Math.floor(Math.random() * (i + 1))
    let temp = shuffled[i]
    shuffled[i] = shuffled[random]
    shuffled[random] = temp
  }
  return shuffled
}

function shuffleNumbers (range,count = range){
  let arr = Array.from(Array(range).keys())
  for(let i = arr.length - 1;i > 0;i--){
    let random = Math.floor(Math.random() * (i + 1))
    let temp = arr[i]
    arr[i] = arr[random]
    arr[random] = temp
  }
  return arr.slice(0,count)
}


function drawPetCard(parent,data,index) {
  let li = document.createElement('li')
  let img = document.createElement('img')
  let h3 = document.createElement('h3')
  let button = document.createElement('button')
  li.classList.add('our-pets-card')
  li.dataset.petId = index
  img.classList.add('our-pets-card-image')
  h3.classList.add('our-pets-card-title')
  button.classList.add('our-pets-card-button')
  img.src = data.img
  h3.innerText = data.name
  button.innerText = "Learn more"
  li.append(img,h3,button)
  parent.append(li)
  // li.addEventListener('click',cardHandler)
}

ourPetsList.addEventListener('click',insertPopup)

function insertPopup(e){
  let li = e.target.closest('li')
  id = li.dataset.petId
  popup.classList.add('popup-show')
  document.body.classList.add('body-scroll-disable')
  popupItem.innerHTML = ''
  drawPopupCard(popupItem,currentPagePets[id])
  console.log('pets[id]',currentPagePets[id])
    console.log('e.target',e.target)
    console.log("e.target.closest('li')",e.target.closest('li'))
    // console.log("carouselWrapper.contains(li)",carouselWrapper.contains(li))
}

popup.addEventListener('click',modalHandler)
function modalHandler(e) {
  let div = e.target.closest('div')
  console.log('div',div)
  console.log('e',e.target)
  console.log("e.target.closest('div')",e.target.closest('div'))
  console.log("popup.contains(div)",popup.contains(div))
  let item = document.querySelector('.popup-item')
  if(e.target.closest('div') != item ){
    // if(popup.closest('div') !== item){
    popup.classList.remove('popup-show')
    document.body.classList.remove('body-scroll-disable')
  }
}
function drawPopupCard(parent,data) {
  let img = document.createElement('img')
  let article = document.createElement('article')
  let h2 = document.createElement('h2')
  let species = document.createElement('p')
  let description = document.createElement('p')
  let specifityEl = document.createElement('ul')
  let specifity = {
    age: data.age,
    inoculations: data.inoculations,
    diseases: data.diseases,
    parasites: data.parasites
  }

  for(let key in specifity){
  let li = document.createElement('li')
  let span = document.createElement('span')
  li.classList.add('popup-pet-spec')
  const capitalized =
  String([key]).charAt(0).toUpperCase()
  + String([key]).slice(1)
  span.innerText = `${capitalized}: `
  li.append(span)
  let val = document.createTextNode(specifity[key])
  li.append(val)
  specifityEl.append(li)
  }
  img.classList.add('popup-item-image')
  article.classList.add('popup-content-text')
  h2.classList.add('popup-pet-name')
  species.classList.add('popup-pet-species')
  description.classList.add('popup-pet-description')
  specifityEl.classList.add('popup-pet-specificity')
  img.src = data.img
  h2.innerText = data.name
  // let breed = document.createTextNode(data.breed)
  species.innerText = `${data.type} - ${data.breed}`
  description.innerText = data.description
  article.append(h2,species,description,specifityEl)
  parent.append(img)
  parent.append(article)
}



function updatePetsDraw(isShufle = false) {
  // ourPetsPaginator.children[0].remove()
  // currentPage = 1
  // currentPage > pages ? currentPage = ourPetsArr.length : currentPage
  let oldList = document.querySelector('.our-pets-list')
  oldList.classList.remove('current-paginator-list')
  let newList = drawCountedCards('prepend',isShufle)
  newList.addEventListener('click',insertPopup)

  setTimeout(() => {

    oldList.classList.remove('current-paginator-list')
    newList.classList.add('current-paginator-list')
        oldList.remove()
  },400)
  setTimeout(() => {
    // oldList.remove()
  }, 500);
}

addEventListener("resize", (event) => {
  amountCardsToDrawAtPage()
  console.log('amountCardsToDrawAtPage()',amountCardsToDrawAtPage())
  // pages = Math.floor(arrsLength / amountCardsToDrawAtPage())
  console.log('pages in resize',pages)
  console.log('arrsLength',arrsLength)
  if(window.innerWidth === 741 || window.innerWidth === 742){
    // updatePetsDraw()
    // drawPaginatorsCardsLists()
    // updatePetsDraw()
    amountCardsToDrawAtPage()
    drawPaginatorsCardsLists()
    updatePetsDraw(true)
  }else if(window.innerWidth === 1079 || window.innerWidth === 1080){
    // updatePetsDraw()
    // drawPaginatorsCardsLists()
    // updatePetsDraw()
    amountCardsToDrawAtPage()
    drawPaginatorsCardsLists()
    updatePetsDraw(true)
  }else if(window.innerWidth === 619 || window.innerWidth === 618){
    // updatePetsDraw()
    // drawPaginatorsCardsLists()
    // updatePetsDraw()
    amountCardsToDrawAtPage()
    drawPaginatorsCardsLists()
    updatePetsDraw(true)
  }
  
});

function amountCardToDraw(){
  let width = window.innerWidth
  return width < 741 ? 1 : width < 1078 ? 2 : width > 1078 ? 3 : 2
} 

function amountCardsToDrawAtPage(){
  let width = window.innerWidth
  return width < 741 ? 3 : width < 1078 ? 6 : width > 1078 ? 8 : 6
} 

function drawCountedCards(insertion = 'append',isShufle = true){
  let count = amountCardToDraw()
  cardsAtPage = amountCardsToDrawAtPage()
  console.log('ourPetsArr in drawCountedCards()',ourPetsArr)
  currentPage > pages ? currentPage = ourPetsArr.length : currentPage
  // paginatorButtonPage.innerText = String(currentPage)
  currentPagePets = shuffle(ourPetsArr[currentPage - 1])
  let ul = document.createElement('ul')
  ul.classList.add('our-pets-list')
  ourPetsPaginator[insertion](ul)
  console.log('currentPagePets',currentPagePets)
  for(let i = 0;i < cardsAtPage;i++){
    drawPetCard(ul,currentPagePets[i],i)

    // ul.classList.add(cardStatus[i])
    // let random = Math.floor(Math.random() * pets.length)
    // console.log('random',random)

  }
  return ul
}

console.log('ourFriendCards',ourFriendCards)
function outBurgerRange(e){
  console.log('burger',burger)
  console.log('e.target',e.target)
  e.stopPropagation()
  if (e.target !== burger) {
    document.body.classList.remove('body-lock')
    burger.classList.remove('burger-active')
    navigation.classList.remove('show-navigation')
  } else {
    return
  }
}

function toggleNavigation(){
  document.body.classList.toggle('body-lock')
  burger.classList.toggle('burger-active')
  navigation.classList.toggle('show-navigation')
}

navigation.addEventListener("click",outBurgerRange)
burger.addEventListener("click",toggleNavigation)