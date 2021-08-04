
import { firebaseDB } from "./FB.js"

const bodyEl = document.getElementById('bodyWrapper')
const searchInput = document.getElementById('search_input')
const searchBtn = document.getElementById('search_btn')







let lastestItem = null
async function getNext() {

    const ref = firebase.firestore().collection('Home').orderBy('eTitle')
        .startAfter (lastestItem)
        .limit(5)


    const data = await ref.get()

    data.docs.forEach((doc) => {
        bodyEl.innerHTML += `
    <div class = 'bodyItem' id='${doc.data().id}' >
    <img class='bodyItem_img' src="${doc.data().thumbnail}" alt="">
    <h3 class='bodyItem_eTitle'>${doc.data().eTitle.toUpperCase()}</h3>
    <p class='bodyItem_vTitle'>${doc.data().vTitle}</p>

    <div class='bodyLeft-item-viewer'> 
    <i class="fas fa-user"></i>
    <p class = 'bodyLeft-item-viewer_count' >0</p>
    <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
    </div>
    </div> 
    `
    })


    lastestItem = data.docs[data.docs.length-1]


}


document.getElementById('page1').addEventListener('click', () => {
  

bodyEl.innerHTML=''
    getNext()
    
    
    console.log(bodyEl.children)



    
    
})



document.getElementById('page2').addEventListener('click', () => {
    
    bodyEl.innerHTML = ''
    getNext()
   
})







document.getElementById('navbarLeft-detail_Home').addEventListener('click', () => {
    // localStorage.removeItem('keyword')
    window.location.assign('home.html')




})








