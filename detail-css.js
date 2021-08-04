document.getElementById('body-box-left').addEventListener('mouseover', () => {
    document.getElementById('body-box-left_overlay').style.display = 'block'
    document.getElementById('body-box-left_playIcon').style.opacity = '0.9'
})


document.getElementById('body-box-left').addEventListener('mouseout', () => {
    document.getElementById('body-box-left_overlay').style.display = 'none'
    document.getElementById('body-box-left_playIcon').style.opacity = '0.6'
})



