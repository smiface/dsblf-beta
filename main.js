let hpbar = document.querySelector('.hpbar')
let hitBtn = document.querySelector('.hit')
let hpBarBg = document.querySelector('.hp')
let hp = 100;
let number;
let fistImg = document.querySelector('.fist')
let hpDisplay = document.querySelector('.hpDisplay')
let faceImg = document.querySelector('.face')

function updageHpBar() {
    hpDisplay.innerHTML = hp
    hpbar.style.width = hp  + '%'
}

setInterval(() => {
    hpBarBg.style.transition = '1s'
    if (hpBarBg.style.backgroundColor == 'red') {
        hpBarBg.style.backgroundColor = 'grey'
    } else {
        hpBarBg.style.backgroundColor = 'red'
    }
}, 500);

updageHpBar()
const faces = [
    './img/x1.png',
    './img/x2.png',
    './img/x3.png',
    './img/x4.png',
]

hitBtn.onclick = () => {
    hit()
    if (hp == 20) {
        hpDisplay.innerHTML = hp = 10
        healing()
    } else {
        hp -= 10
    }
}

function hit() {
    hitBtn.disabled = true
    fistImg.src = './img/fist2.png'
    fistImg.style.left = '200px'
    faceImg.src = faces[1]

    setTimeout(() => {
        fistImg.style.left = '400px'
        fistImg.src = './img/fist1.png'
        hitBtn.disabled = false
        faceImg.src = faces[0]

        updageHpBar()

    }, 200);
}

function healing() {
    if (hp == 100) {
        hitBtn.disabled = false
        faceImg.src = faces[0]
    } else {

        setTimeout(() => {
            hp += 10
            hitBtn.disabled = true

            if (faceImg.src.match('x3.png')) {
                faceImg.src = faces[3]
                console.log(faceImg.src)
            } else {
                faceImg.src = faces[2]
            }

            hpDisplay.innerHTML = hp
            healing()
            console.log('healing' + hp)
        }, 500);
    }
    updageHpBar()
}