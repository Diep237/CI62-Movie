
import { firebaseDB } from "./FB.js"

const thumbnailImg = document.getElementById('body-box-left_img')
const engTitle = document.querySelector('.body-box-center-title h3')
const vieTitle = document.querySelector('.body-box-center-title p')
const description = document.querySelector('.body-box-center-content_description')
const nation = document.querySelector('.body-box-center-content-Info_nation')
const gerne = document.querySelector('.body-box-center-content-Info_gerne')
const director = document.querySelector('.body-box-center-content-Info_director')
const actors = document.querySelector('.body-box-center-content-Info_actors')


const cmtInput = document.getElementById('comment-input')
const wholeCmts = document.getElementById('wholeCmts')

// Click
const idSelected = localStorage.getItem('id')
async function getData() {

    
    const result = await firebase.firestore().collection('Home').doc(idSelected).get()
    const showText = 'Đang cập nhật'

    thumbnailImg.src = result.data().thumbnail
    engTitle.innerText = result.data().eTitle.toUpperCase()
    vieTitle.innerText = result.data().vTitle
    description.innerText = result.data().description != undefined? result.data().description:showText;
    nation.innerText = result.data().nation!= undefined? result.data().nation:showText;
    actors.innerText = result.data().actors != undefined? result.data().actors:showText;
    gerne.innerText = result.data().gerne != undefined? result.data().gerne:showText;
    director.innerText = result.data().director!= undefined? result.data().director:showText;



       
}
getData()



document.getElementById('navbarLeft-detail_Search').addEventListener('click', () => {
    window.location.assign('search.html')

})

document.getElementById('navbarLeft-detail_Home').addEventListener('click', () => {
    window.location.assign('home.html')

})





const loginId = localStorage.getItem('loginId')
// console.log(loginId)



document.querySelector('.comment_btn').addEventListener('click', (e) => {
    // console.log(loginId)
    if (loginId == null) {
        window.alert('Bạn phải đăng nhập để bình luận')
    } else if (loginId != null && cmtInput != '') {

        async function addCmt() {

            const data = await firebase.firestore().collection('Users').doc(loginId).get()

            firebase.firestore().collection('Home').doc(idSelected)
                .collection('viewers').add({
                    userId: loginId,
                    userName: data.data().name,
                    userCmts: cmtInput.value,
                    createAt: firebase.firestore.FieldValue.serverTimestamp()

                }).then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    // add to realtime db

                    firebase.database().ref('cmt').push().set({
                        username: data.data().name,
                        comment: cmtInput.value,
                        viewerId: docRef.id

                    })

                })
        }
        addCmt()
    }
})




// LISTENING FOR INCOMING CMT

firebase.database().ref('cmt').remove()
firebase.database().ref('cmt').on("child_added", (snapshot) => {

    console.log(snapshot.key)

    document.getElementById('RTsec').innerHTML += `
    <div class='userComment' id= 'cmt-${snapshot.key}'>
                <div class='userComment_image'>
                    <img src="https://i.ibb.co/svd6QPK/default-avatar.jpg" alt="">
                </div>

                <div class='userComment_cmt'>
                    <h4>${snapshot.val().username}</h4>
                    <p>${snapshot.val().comment}</p>
                </div>
                

                <div class='ellipsis'>  
                
                    <i id = '${snapshot.val().viewerId}' class="fas fa-ellipsis-v"></i>

                    <div class = 'ellipsis-option'>
                        <div class = 'ellipsis-option_edit'>
                            <i class="fas fa-pen"></i>
                            <p>Chỉnh sửa</p>
                        </div>
                        <div class = 'ellipsis-option_delete' id='${snapshot.key}'>
                            <i class="fas fa-trash"></i>
                            <p>Xóa</p>
                        </div>
                        <div class = 'ellipsis-option_report'>
                            <i class="fas fa-flag"></i>
                            <p>Báo cáo</p>
                        </div>

                    </div>

                  
                </div>
            </div>
    `


    // Show/Hide options
    const ellipsisIcon = document.querySelectorAll('.fas.fa-ellipsis-v')
    const del = document.getElementById('RTsec').querySelectorAll('.ellipsis-option_delete')
    const option = document.querySelectorAll('.ellipsis-option')

    if (loginId != null) {
        for (let i = 0; i < ellipsisIcon.length; i++) {
            ellipsisIcon[i].addEventListener('click', (e) => {

                if (window.getComputedStyle(option[i]).display == 'none') {
                    // console.log('none')
                    e.target.nextElementSibling.style.display = 'block'
                    // console.log(e.target.nextElementSibling) là thẻ option
                } else {
                    // console.log('block')
                    e.target.nextElementSibling.style.display = 'none'
                }
            })
        }
    }



    async function handleCmt() {
        // 1. HIỂN THỊ OPT THEO USER
        const opt = await firebase.firestore().collection('Home').doc(idSelected)
            .collection('viewers').where('userId', '==', `${loginId}`).get()

        for (let i = 0; i < ellipsisIcon.length; i++) {
            console.log(ellipsisIcon.length)
            ellipsisIcon[i].addEventListener('click', (e) => {
      

                if (opt.docs.some((i) => {
                    return i.id == e.target.id
                })) {
                    e.target.nextElementSibling.lastElementChild.style.display = 'none'
                } else {
                    e.target.nextElementSibling.firstElementChild.style.display = 'none'
                    e.target.nextElementSibling.firstElementChild.nextElementSibling.style.display = 'none'
                }
            })
        }




        // 2.XÓA 
        
        const del = document.getElementById('RTsec').querySelectorAll('.ellipsis-option_delete')


        for (let i = 0; i < del.length; i++) {
            del[i].addEventListener('click', (e) => {
                const delId = e.target.parentElement.id
                firebase.database().ref('cmt').child(delId).remove()
            })
        }

        // console.log(document.getElementById(`cmt-${snapshot.key}`))

        firebase.database().ref('cmt').on("child_removed", (snapshot) => {
            document.getElementById(`cmt-${snapshot.key}`).remove()
        })

        
        
        const delFB = document.querySelectorAll('.ellipsis-option_delete')
        
        const cmtRemoved = await firebase.firestore().collection('Home').doc(idSelected)
            .collection('viewers')
        // result = HTML collection (ko thể dùng forEach ...)
        console.log(del)
        for (let i = 0; i < delFB.length; i++) {

            delFB.item(i).addEventListener('click', (e) => {
                if (e.target.parentElement.parentElement.previousElementSibling.id) {

                    const removeId = e.target.parentElement.parentElement.previousElementSibling.id
                  
                    cmtRemoved.doc(removeId).delete()
                    // Xóa ở DOM
                    // e.target.parentElement.parentElement.parentElement.parentElement.remove()
                }


            })
        }

    }
    handleCmt()
})







async function loadCmt() {

    const data = await firebase.firestore().collection('Home').doc(idSelected)
        .collection('viewers').get()

        const wholeCmts = document.getElementById('wholeCmts')


    // SHOW CMT

    data.docs.forEach((element) => {

        // Khi chưa click, userCmts ở Home chưa được khởi tạo nên phải có điều kiện Nếu UserCmts tồn tại
        if (element.data().userCmts) {
            // console.log(element.id)

            wholeCmts.innerHTML += `
            <div class='userComment'>
            <div class='userComment_image'>
                <img src="https://i.ibb.co/svd6QPK/default-avatar.jpg" alt="">
            </div>

            <div class='userComment_cmt'>
                <h4>${element.data().userName}</h4>
                <p>${element.data().userCmts}</p>
            </div>
            

            <div class='ellipsis'>
            
                <i  id = ${element.id} class="fas fa-ellipsis-v"> </i>
               
                    <div class = 'ellipsis-option'>
                        <div class = 'ellipsis-option_edit'>
                            <i class="fas fa-pen"></i>
                            <p>Chỉnh sửa</p>
                        </div>
                        <div class = 'ellipsis-option_delete'>
                            <i class="fas fa-trash"></i>
                            <p>Xóa</p>
                        </div>
                        <div class = 'ellipsis-option_report'>
                            <i class="fas fa-flag"></i>
                            <p>Báo cáo</p>
                        </div>
                    </div>  
            </div>
        </div>
            `
        }


    })

    
    const ellipsisIcon = wholeCmts.querySelectorAll('.fas.fa-ellipsis-v')
    const del = wholeCmts.querySelectorAll('.ellipsis-option_delete')
    const option = wholeCmts.querySelectorAll('.ellipsis-option')


    if (loginId != null) {

        for (let i = 0; i < ellipsisIcon.length; i++) {
            ellipsisIcon[i].addEventListener('click', (e) => {
                // console.log(e.target.nextElementSibling)
                if (window.getComputedStyle(option[i]).display == 'none') {
                    // console.log('none')
                    e.target.nextElementSibling.style.display = 'block'
                } else {
                    // console.log('block')
                    e.target.nextElementSibling.style.display = 'none'
                }



            })
        }


    }


    // HIỂN THỊ OPTION (sửa, xóa, report) THEO USER
    const opt = await firebase.firestore().collection('Home').doc(idSelected)
        .collection('viewers').where('userId', '==', `${loginId}`).get()

 



    for (let i = 0; i < ellipsisIcon.length; i++) {
        ellipsisIcon[i].addEventListener('click', (e) => {
            if (opt.docs.some((element) => {
                return element.id == e.target.id
            })) {
                e.target.nextElementSibling.lastElementChild.style.display = 'none'
            } else {
                e.target.nextElementSibling.firstElementChild.style.display = 'none'
                e.target.nextElementSibling.firstElementChild.nextElementSibling.style.display = 'none'
            }
        })
    }



    // XÓA 

    const cmtRemoved = await firebase.firestore().collection('Home').doc(idSelected)
        .collection('viewers')
    for (let i = 0; i < del.length; i++) {
        del.item(i).addEventListener('click', (e) => {
            const removeId = e.target.parentElement.parentElement.previousElementSibling.id
            cmtRemoved.doc(removeId).delete()
            // XÓa ở DOM
            e.target.parentElement.parentElement.parentElement.parentElement.remove()
        })
    }
}
loadCmt()



// Go to movie

document.getElementById('body-box-left').addEventListener('click',()=>{
    localStorage.setItem('movieId', idSelected)
    window.location.assign('movie.html')
})




