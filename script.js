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
const paginatorButtonPage = document.querySelector('.paginator-button-page')
const paginatorButtonStart = document.querySelector('.paginator-button-start')
const paginatorButtonPrevious = document.querySelector('.paginator-button-previous')
const paginatorButtonNext = document.querySelector('.paginator-button-next')
const paginatorButtonEnd = document.querySelector('.paginator-button-end')
let pets = []
let currentCard = 0
let pages = 1
let currentPage = 1
// paginatorButtonPage.innerText = currentPage
let ourPetsArr = []

function drawPaginatorsCards(){
  let newArr = []
  for(let i = 0;i < 8;i++){
    newArr.push(pets)
  }
  console.log('newArr',newArr)
  pages = Math.floor(newArr.length / amountCardsToDrawAtPage())
  ourPetsArr = newArr.flat()
}

drawPaginatorsCards()
// function handlePage(step){
//   page += step
// }

// paginatorButtonStart.addEventListener('click',() => {
//   currentPage = 1
// })
// paginatorButtonPrevious.addEventListener('click',() => {
//   currentPage > 0 ? currentPage -= 1 : 0
// })
// paginatorButtonNext.addEventListener('click',() => {
//   currentPage  < ourPetsArr.length ? currentPage += 1 : 0
//   console.log('pages',pages)
//   console.log('currentPage',currentPage)
//   console.log('ourPetsArr.length',ourPetsArr.length)
// })
// paginatorButtonEnd.addEventListener('click',() => {
//   currentPage = ourPetsArr.length -1
// })

// ourFriendList.style.transform = "translate(0px)";

// async function fetchPets(){
//   let response = await fetchPets('./pets.json')
//   let data = await response.json()
//   console.log('data',data)
//   pets = data
// }

function elemWidthPxToNum(elem,prop = 'width'){
  return Number(window.getComputedStyle(elem)[prop].match(/-?\d+/g)[0])
}

function shuffle (arr){
  for(let i = arr.length - 1;i > 0;i--){
    let random = Math.floor(Math.random() * (i + 1))
    let temp = arr[i]
    arr[i] = arr[random]
    arr[random] = temp
  }
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
function fetchPets(){
  fetch('./pets.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('data',data)
    // shuffle(data)
    pets = data
  });
}

function drawPetCard(parent,data,index) {
  let li = document.createElement('li')
  let img = document.createElement('img')
  let h3 = document.createElement('h3')
  let button = document.createElement('button')
  li.classList.add('our-friends-card')
  li.dataset.petId = index
  img.classList.add('our-friends-card-image')
  h3.classList.add('our-friends-card-title')
  button.classList.add('our-friends-card-button')
  img.src = data.img
  h3.innerText = data.name
  button.innerText = "Learn more"
  li.append(img,h3,button)
  parent.append(li)
  // li.addEventListener('click',cardHandler)
}

function insertPopup(e){
  let li = e.target.closest('li')
  id = li.dataset.petId
  popup.classList.add('popup-show')
  document.body.classList.add('body-scroll-disable')
  popupItem.innerHTML = ''
  drawPopupCard(popupItem,pets[id])
  console.log('pets[id]',pets[id])
    console.log('e.target',e.target)
    console.log("e.target.closest('li')",e.target.closest('li'))
    console.log("carouselWrapper.contains(li)",carouselWrapper.contains(li))
}

carouselWrapper.addEventListener('click',insertPopup)

// ourPetsPaginator.addEventListener('click',insertPopup)

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
// function cardHandler(e){
//   console.log('e.target',e.target)
//   console.log("e.target.closest('li')",e.target.closest('li'))
// }
// function drawPetsList(parent,childrensCount,data){
//   let ul = document.createElement('ul')
//   let li = document.createElement('li')
//   let img = document.createElement('img')
//   let h3 = document.createElement('h3')
//   let button = document.createElement('button')
//   ul.classList.add('our-friends-list')
//   li.classList.add('our-friends-card')
//   img.classList.add('our-friends-card-image')
//   h3.classList.add('our-friends-card-title')
//   button.classList.add('our-friends-card-button')
//   img.src = data.img
//   h3.innerText = data.name
//   button.innerText = "Learn more"
//   ul.append(li)
//   li.append(img,h3,button)
//   parent.append(ul)
// }
fetchPets()

// window.addEventListener("onload",() => {
//   if(pets.length > 0){
//     pets.forEach(pet => {
//       drawPetCard(ourFriendList,pet)
//     })
//   }
// })

window.addEventListener("load", () => {
  console.log("load",pets)
  console.log("ourFriendList.children",ourFriendList.children)
  console.log("amountCardToDraw()",amountCardToDraw())
  // pets.forEach(pet => {
  //   drawPetCard(ourFriendList,pet)
  // })

  // shuffle(pets)
  
  // for(let i = 0;i < ourFriendList.children.length;i++){
  //   ourFriendList.children[i].remove()
  // }

  // for(let i = carouselWrapper.children.length - 1; i >= 0 ;i--){
  //   console.log('i',i)
  //   console.log('carouselWrapper.children[i]',carouselWrapper.children[i])
  //   carouselWrapper.children[i].remove()
  // }
  
  //   let cardStatus = ['previous-slider','current-slider','next-slider']
  // for(let i = 0;i < 3;i++){
  //   let ul = drawCountedCards()
  //   ul.classList.add(cardStatus[i])
  // }

  // drawCountedCards()

  updatePetsDraw(true)

});


function updatePetsDraw(isShufle = false) {
  for(let i = carouselWrapper.children.length - 1; i >= 0 ;i--){
    console.log('i',i)
    console.log('carouselWrapper.children[i]',carouselWrapper.children[i])
    carouselWrapper.children[i].remove()
  }
  
    let cardStatus = ['previous-slider','current-slider','next-slider']
  for(let i = 0;i < 3;i++){
    let ul = drawCountedCards('append',isShufle)
    ul.classList.add(cardStatus[i])
  }
}

addEventListener("resize", (event) => {
  amountCardToDraw()
  amountCardsToDrawAtPage()
  if(window.innerWidth === 741){
    updatePetsDraw()
    drawPaginatorsCards()
  }else if(window.innerWidth === 1079){
    updatePetsDraw()
    drawPaginatorsCards()
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
  let ul = document.createElement('ul')
  ul.classList.add('our-friends-list')
  carouselWrapper[insertion](ul)
  // ul.style.transform = 'translate(0px)'
  
  // isShufle ? shuffle(pets) : 0
  let numbers = shuffleNumbers(pets.length,3)
  for(let i = 0;i < numbers.length;i++){
    // ul.classList.add(cardStatus[i])
    // let random = Math.floor(Math.random() * pets.length)
    // console.log('random',random)
    console.log('numbers[i]',numbers[i])
    drawPetCard(ul,pets[numbers[i]],numbers[i])
  }
  return ul
}

cardButtonLeft.addEventListener("click",previousSlides)
cardButtonRight.addEventListener("click",nextSlides)

function widthToMoveChildsOf (parent,count = parent.length) {
  let sum = 0
  let children = Array.from(parent.children).slice(0,count)
  for(let i = 0;i < children.length;i++){
      sum += Number(window.getComputedStyle(children[i]).width.match(/-?\d+/g)[0]) + Number(window.getComputedStyle(children[i]).marginRight.match(/-?\d+/g)[0]) 
  }
  console.log('sum',sum)
  return sum
}

function nextSlides(params) {
  let carouselWrapper = document.querySelector('.carousel-wrapper')
  let ourFriendList = document.querySelector('.our-friends-list')
  let currentSlider = document.querySelector('.current-slider')
  let childrens = Array.from(carouselWrapper).slice()
  if(carouselWrapper.children[1] === currentSlider){
    carouselWrapper.firstElementChild.remove()
    drawCountedCards('append')
    // carouselWrapper.children[1].classList.remove('current-slider')
    // carouselWrapper.children[1].classList.add('next-slider')
    // carouselWrapper.children[0].classList.remove('previous-slider')
    // carouselWrapper.children[0].classList.add('current-slider')
    carouselWrapper.firstElementChild.classList.remove('current-slider')
    carouselWrapper.firstElementChild.classList.add('previous-slider')
    carouselWrapper.children[1].classList.remove('next-slider')
    carouselWrapper.children[1].classList.add('current-slider')
    carouselWrapper.lastElementChild.classList.add('next-slider')
  }
  
  let owidth = ourFriendCarousel.offsetWidth
  let cwidth = ourFriendList.clientWidth
  let gwidth = window.getComputedStyle(ourFriendList).width

  // ourFriendList.style.transform = "translate("+(-owidth)+"px)";
  // console.log('ourFriendList.style.transform',ourFriendList.style.transform)
  // let elementTranslate = Number(ourFriendList.style.transform.match(/-?\d+/g)[0])
  // console.log('translate',elementTranslate)
  // ourFriendList.style.transform = "translate("+(elementTranslate - (elemWidthPxToNum(ourFriendCarousel) - elemWidthPxToNum(ourFriendCarousel,'paddingLeft') - elemWidthPxToNum(ourFriendCarousel,'paddingRight')))+"px)";


  // ourFriendList.style.transform = "translate("+ (elementTranslate - cwidth)  +"px)"

  // ourFriendList.style.cssText = `{-webkit-transform: translate(100px, 100px)}`
  // ourFriendList.insertRule("{-webkit-transform: translate(100px, 100px)}")
  console.log('owidth',owidth,cwidth,gwidth)


}

function previousSlides(params) {
  let carouselWrapper = document.querySelector('.carousel-wrapper')
  let ourFriendList = document.querySelector('.our-friends-list')
  let currentSlider = document.querySelector('.current-slider')
  let childrens = Array.from(carouselWrapper).slice()
  if(carouselWrapper.children[1] === currentSlider){
    carouselWrapper.lastElementChild.remove()
    drawCountedCards('prepend')
    // carouselWrapper.children[1].classList.remove('current-slider')
    // carouselWrapper.children[1].classList.add('next-slider')
    // carouselWrapper.children[0].classList.remove('previous-slider')
    // carouselWrapper.children[0].classList.add('current-slider')
    carouselWrapper.firstElementChild.classList.add('previous-slider')
    carouselWrapper.children[1].classList.remove('previous-slider')
    carouselWrapper.children[1].classList.add('current-slider')
    carouselWrapper.lastElementChild.classList.remove('current-slider')
    carouselWrapper.lastElementChild.classList.add('next-slider')
  }
  let owidth = ourFriendCarousel.offsetWidth
  let cwidth = ourFriendList.clientWidth
  let gwidth = window.getComputedStyle(ourFriendList).width

  // ourFriendList.style.transform = "translate("+owidth+"px)";
  // let elementTranslate = Number(ourFriendList.style.transform.match(/-?\d+/g)[0])
  // console.log('translate',elementTranslate)
  // ourFriendList.style.transform = "translate("+ (elementTranslate + (elemWidthPxToNum(ourFriendCarousel) - elemWidthPxToNum(ourFriendCarousel,'paddingLeft') - elemWidthPxToNum(ourFriendCarousel,'paddingRight')))+"px)";


  // ourFriendList.style.transform = "translate("+ (elementTranslate + cwidth)  +"px)"
  
  // ourFriendList.style.cssText = `{-webkit-transform: translate(100px, 100px)}`
  // ourFriendList.insertRule("{-webkit-transform: translate(100px, 100px)}")
  console.log('owidth',owidth,cwidth,gwidth)
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





console.log("Scores : 100/100 \n")
console.log(`Task: shelter-part2.
Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14
блок <header>: +2
блок Not only: +2
блок About: +2
блок Our Friends: +2
блок Help: +2
блок In addition: +2
блок <footer>: +2
Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14
блок <header>: +2
блок Not only: +2
блок About: +2
блок Our Friends: +2
блок Help: +2
блок In addition: +2
блок <footer>: +2
Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14
блок <header>: +2
блок Not only: +2
блок About: +2
блок Our Friends: +2
блок Help: +2
блок In addition: +2
блок <footer>: +2
Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6
блок <header>: +2
блок Our Friends: +2
блок <footer>: +2
Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6
блок <header>: +2
блок Our Friends: +2
блок <footer>: +2
Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6
блок <header>: +2
блок Our Friends: +2
блок <footer>: +2
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20
нет полосы прокрутки при ширине страницы Main от 1280рх до 768рх: +5
нет полосы прокрутки при ширине страницы Main от 768рх до 320рх: +5
нет полосы прокрутки при ширине страницы Pets от 1280рх до 768рх: +5
нет полосы прокрутки при ширине страницы Pets от 768рх до 320рх: +5
Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8
на странице Main: +4
на странице Pets: +4
При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4
Открытие меню при клике на иконку бургер-меню на текущем этапе не проверяется
Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8`)