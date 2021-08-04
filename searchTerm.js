
import { firebaseDB } from "./FB.js"

const bodyEl = document.getElementById('bodyWrapper')
const searchInput = document.getElementById('search_input')
const searchBtn = document.getElementById('search_btn')

// Display search result from Home.html
const keywordSelected = localStorage.getItem('keyword')
// console.log(keywordSelected)


async function getDataBySearch() {
    const result = await firebase.firestore().collection('Home').get()
    for (let i = 0; i < result.docs.length; i++) {
        // console.log(result.docs[i].data().eTitle)
        if (result.docs[i].data().eTitle.toLowerCase().includes(keywordSelected.toLowerCase())
            || result.docs[i].data().vTitle.toLowerCase().includes(keywordSelected.toLowerCase())
        ) {
            bodyEl.innerHTML += `
            <div class = 'bodyItem' id='${result.docs[i].id}' >
            <img class='bodyItem_img' src="${result.docs[i].data().thumbnail}" alt="">
            <h3 class='bodyItem_eTitle'>${result.docs[i].data().eTitle.toUpperCase()}</h3>
            <p class='bodyItem_vTitle'>${result.docs[i].data().vTitle}</p>

            <div class='bodyLeft-item-viewer'> 
            <i class="fas fa-user"></i>
            <p class = 'bodyLeft-item-viewer_count' >0</p>
            <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
            </div>
            </div> 
            `
        }
    }


    // Display search result from itseft

    searchBtn.addEventListener('click', () => {
        bodyEl.innerHTML = ''
        for (let i = 0; i < result.docs.length; i++) {

            if (result.docs[i].data().eTitle.toLowerCase().includes(searchInput.value.toLowerCase())
                || result.docs[i].data().vTitle.toLowerCase().includes(searchInput.value.toLowerCase())
            ) {
                bodyEl.innerHTML += `
                <div class = 'bodyItem' id='${result.docs[i].id}' >
                <img class='bodyItem_img' src="${result.docs[i].data().thumbnail}" alt="">
                <h3 class='bodyItem_eTitle'>${result.docs[i].data().eTitle.toUpperCase()}</h3>
                <p class='bodyItem_vTitle'>${result.docs[i].data().vTitle}</p>
    
                <div class='bodyLeft-item-viewer'> 
                <i class="fas fa-user"></i>
                <p class = 'bodyLeft-item-viewer_count' >0</p>
                <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
                </div>
                </div>  
            `
            }
        }
    })


       // Click item form the Search result
        const x = bodyEl.querySelectorAll('.bodyItem')
        console.log(x.length)

        x.forEach((value) => {

            value.addEventListener('click', () => {
                localStorage.setItem('id', value.id)
                window.location.assign('detail.html')

            })
        })

}
getDataBySearch()




document.getElementById('navbarLeft-detail_Home').addEventListener('click', () => {
    // localStorage.removeItem('keyword')
    window.location.assign('home.html')
})




document.getElementById('navbarLeft-detail_Search').addEventListener('click', () => {
    // localStorage.removeItem('keyword')
    window.location.assign('search.html')
})