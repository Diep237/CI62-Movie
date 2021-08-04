import { firebaseDB } from "./FB.js"




const movieId = localStorage.getItem('movieId')
// console.log(movieId)

console.log(movie.src)
async function getData() {

    // console.log(idSelected)
    const result = await firebase.firestore().collection('Home').doc(movieId).get()
  
    
    
    document.getElementById('movie').src = result.data().src

}
getData()


