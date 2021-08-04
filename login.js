import { firebaseDB } from "./FB.js"











const signupEmail = document.getElementById('email-signup')
const signupPassword = document.getElementById('password-signup')
const signupName = document.getElementById('name-signup')
const btnSignup = document.getElementById('btn-signup')


const emailSignupNoti = document.getElementById('email-signup-noti')
const passwordSignupNoti = document.getElementById('password-signup-noti')
const nameSignupNoti = document.getElementById('name-signup-noti')


const loginEmail = document.getElementById('email-login')
const loginPassword = document.getElementById('password-login')
const btnLogin = document.getElementById('btn-login')


const emailLoginNoti = document.getElementById('email-login-noti')
const passwordLoginNoti = document.getElementById('password-login-noti')





// Show sign in dashboard
document.querySelector('.navbarRight_signup').addEventListener('click', () => {
    document.getElementById('abc').style.transform = 'translateX(100%)'
    document.querySelector('.overlay').style.display = 'block'
    document.querySelector('.signupAndLogin').style.display = 'block'
    document.getElementById('loginCancelIcon').style.display = 'block'

})


// Show log in dashboard
document.querySelector('.navbarRight_login').addEventListener('click', () => {

    document.querySelector('.overlay').style.display = 'block'
    document.querySelector('.signupAndLogin').style.display = 'block'
    document.getElementById('loginCancelIcon').style.display = 'block'
})


// Cancel icon
document.getElementById('loginCancelIcon').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'none'
    document.querySelector('.signupAndLogin').style.display = 'none'

    loginEmail.value = ''
    loginPassword.value = ''
    signupEmail.value = ''
    signupPassword.value = ''

    emailSignupNoti.innerHTML = ''
    passwordSignupNoti.innerHTML = ''
    nameSignupNoti.innerHTML = ''

    emailLoginNoti.innerHTML = ''
    passwordLoginNoti.innerHTML = ''

})
// add(): CREATE DATA

btnSignup.onclick = () => {


    async function checkDuplicate() {
        const result = await firebase.firestore().collection('Users').get()
        result.docs.forEach((element) => {

            if (element.data().email === signupEmail.value && signupEmail.value !== '') {
                emailSignupNoti.innerHTML = 'Email đã tồn tại'
            }
        })


        if (signupEmail.value != '') {
            if (result.docs.every((element) => {
                return element.data().email != signupEmail.value
            })) {
                if (signupPassword.value != ''
                    && signupName.value != '') {
                    firebase.firestore().collection('Users').add({
                        name: signupName.value,
                        email: signupEmail.value,
                        password: signupPassword.value,
                    })
                    window.alert('Đăng ký thành công')
                }
                // console.log('456')
            }
        }
    }
    checkDuplicate()



    const inputValue = [signupEmail.value, signupPassword.value, signupName.value]
    const noti = [emailSignupNoti, passwordSignupNoti, nameSignupNoti]
    const tagName = ['Email', 'Password', 'Name']
    emailSignupNoti.innerHTML = ''
    passwordSignupNoti.innerHTML = ''
    nameSignupNoti.innerHTML = ''
    var i
    for (i = 0; i < inputValue.length; i++) {
        for (i = 0; i < noti.length; i++) {
            for (i = 0; i < tagName.length; i++) {
                if (inputValue[i] == '') {
                    noti[i].innerHTML = ` ${tagName[i]} is require`
                }
            }
        }
    }
}





// SignUp onchange
signupEmail.onchange = () => {


    async function demo() {
        const result = await firebase.firestore().collection('Users').get()

        if (signupEmail.value != '') {
            if (result.docs.some((element) => {
                return element.data().email === signupEmail.value
            })) {
                emailSignupNoti.innerHTML = 'Email đã tồn tại'
            }
        }

    }

    demo()

}




// Login onchange
loginEmail.onchange = () => {
    async function demo() {
        const result = await firebase.firestore().collection('Users').get()

        if (result.docs.every((element) => {
            return loginEmail.value.toLowerCase() != element.data().email.toLowerCase()
        })) {
            emailLoginNoti.innerHTML = 'Email chưa đăng ký'
        }
    }
    demo()
}


// Onfocus

loginEmail.onfocus = () => {
    loginEmail.value = ''
    emailLoginNoti.innerHTML = ''
}

loginPassword.onfocus = () => {
    loginPassword.value = ''

}


btnLogin.onclick = () => {
    const inputValue = [loginEmail.value, loginPassword.value]
    const noti = [emailLoginNoti, passwordLoginNoti]
    const tagName = ['Email', 'Password']
    emailLoginNoti.innerHTML = ''
    passwordLoginNoti.innerHTML = ''
    var i
    for (i = 0; i < inputValue.length; i++) {
        for (i = 0; i < noti.length; i++) {
            for (i = 0; i < tagName.length; i++) {
                if (inputValue[i] == '') {
                    noti[i].innerHTML = ` ${tagName[i]} is require`
                }
            }
        }
    }





    async function verify() {
        const result = await firebase.firestore().collection('Users').get()

        for (i = 0; i < result.docs.length; i++) {
            console.log(result.docs.length)
            if (result.docs[i].data().email.toLowerCase() == loginEmail.value.toLowerCase()
                && result.docs[i].data().password == loginPassword.value) {
                localStorage.setItem('loginId', `${result.docs[i].id}`)
                window.alert('Đăng nhập thành công')
                setTimeout(() => { window.location.assign('home.html') }, 500)
                break;
            }
        }



        if (loginEmail.value != ''
            && loginPassword.value != '') {
            if ((result.docs.every((pass) => {
                return pass.data().password != loginPassword.value
            }))) {
                window.alert('Sai email hoặc mật khẩu')
            }
        }
    }
    verify()
}



async function loginSuccessful() {
    const loginId = localStorage.getItem('loginId')

    
    if (loginId) {
        const result = await firebase.firestore().collection('Users').doc(loginId).get()
     
        if (loginId != null) {
            document.querySelector('.navbarRight_signupAndLogin').style.display = 'none'
            document.querySelector('.navbarRight_accountAndLogout').style.display = 'flex'
            document.querySelector('.navbarRight_account').style.color = 'var(--colorBase)'
            document.querySelector('.navbarRight_account').innerHTML = `${result.data().name}`
        }

    }

}

loginSuccessful()






document.querySelector('.navbarRight_logout').addEventListener('click', () => {
    document.querySelector('.navbarRight_signupAndLogin').style.display = 'flex'
    document.querySelector('.navbarRight_accountAndLogout').style.display = 'none'
    localStorage.removeItem('loginId')

})

