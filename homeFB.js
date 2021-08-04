import { firebaseDB } from "./FB.js"




const div1 = document.getElementById('bodyLeft-div1-container')
const div2 = document.getElementById('bodyLeft-div2-container')
const div3 = document.getElementById('bodyLeft-div3-container')







async function demo() {
    const result = await firebase.firestore().collection('Home').get()



    result.docs.forEach((element) => {  
    
        // Hiển thị element
        if (element.data().location == 'div1') {
            div1.innerHTML += `
            <div class='bodyLeft-item' >
            <img class = 'bodyLeft-item_img' id = ${element.id} src="${element.data().thumbnail}" alt="">
            <h3 class='bodyLeft-item_eTitle'>${element.data().eTitle.toUpperCase()}</h3>
            <p class='bodyLeft-item_vTitle'>${element.data().vTitle}</p>

            <div class='bodyLeft-item-viewer'> 
            <i class="fas fa-user"></i>
            <p class = 'bodyLeft-item-viewer_count' >0</p>
            <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
            </div>
    
            </div> 
          
         
            `
         
        } else if (element.data().location == 'div2') {
            div2.innerHTML += `
            <div class='bodyLeft-item' >
            <img class = 'bodyLeft-item_img' id = ${element.id} src="${element.data().thumbnail}" alt="">
            <h3 class='bodyLeft-item_eTitle'>${element.data().eTitle.toUpperCase()}</h3>
            <p class='bodyLeft-item_vTitle'>${element.data().vTitle}</p>

            <div class='bodyLeft-item-viewer'> 
            <i class="fas fa-user"></i>
            <p class = 'bodyLeft-item-viewer_count' >0</p>
            <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
            </div>
    
            </div> 
          
        
        `
        } else {
            div3.innerHTML += `
            <div class='bodyLeft-item' >
            <img class = 'bodyLeft-item_img' id = ${element.id} src="${element.data().thumbnail}" alt="">
            <h3 class='bodyLeft-item_eTitle'>${element.data().eTitle.toUpperCase()}</h3>
            <p class='bodyLeft-item_vTitle'>${element.data().vTitle}</p>

            <div class='bodyLeft-item-viewer'> 
            <i class="fas fa-user"></i>
            <p class = 'bodyLeft-item-viewer_count' >0</p>
            <p class = 'bodyLeft-item-viewer_content'>Lượt xem</p>
            </div>
    
            </div> 
          
        `
        }

    })


    // Click

    div1.querySelectorAll('.bodyLeft-item_img').forEach(function (value) {
        value.addEventListener('click', () => {
            localStorage.setItem('id', value.id)
            // console.log(value.id)
            window.location.assign('detail.html')
        })

    })


    div2.querySelectorAll('.bodyLeft-item_img').forEach(function (value) {
        value.addEventListener('click', () => {
            localStorage.setItem('id', value.id)
            console.log(value.id)
            window.location.assign('detail.html')

        })

    })

    div3.querySelectorAll('.bodyLeft-item_img').forEach(function (value) {
        value.addEventListener('click', () => {
            localStorage.setItem('id', value.id)
            // console.log(value.id)
            window.location.assign('detail.html')

        })

    })


}
demo()




// SEARCH
const searchInput = document.getElementById('search_input')
const btnSearch = document.getElementById('search_btn')



btnSearch.addEventListener('click', () => {
    if (searchInput.value !== '') {
        localStorage.setItem('keyword', searchInput.value)
        window.location.assign('searchTerm.html')
    }
})


document.getElementById('navbarLeft-detail_Home').addEventListener('click', () => {
    window.location.assign('home.html')
})

document.getElementById('navbarLeft-detail_Search').addEventListener('click', () => {
    //  localStorage.setItem('keyword',searchInput.value)
    window.location.assign('search.html')
})



