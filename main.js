let hpbar = document.querySelector('.hpbar')
let hitBtn = document.querySelector('.hit')
let hpBarBg = document.querySelector('.hp')
let hpDisplay = document.querySelector('.hpDisplay')
let fistImg = document.querySelector('.fist')
let faceImg = document.querySelector('.face')
let bodyArmor = document.querySelector('.bodyArmor')
let headArmor = document.querySelector('.headArmor')

let ded = {
    hp: 100,
    bodyArmor: 0,
    headArmor: 0,
    deathCount: 0
}
console.log(ded)

function addArmor() {
    if (ded.bodyArmor < 3) {
        ded.bodyArmor++
        bodyArmor.src = './img/armor' + ded.bodyArmor + '.png'
        ded.deathCount++
    } else {
        ded.headArmor++
        headArmor.src = './img/head' + ded.headArmor + '.png'
        ded.deathCount++
    }
    console.log(ded)
}



function updateHpBar() {
    hpDisplay.innerHTML = ded.hp
    hpbar.style.width = ded.hp + '%'
}

setInterval(() => {
    if (hpBarBg.style.backgroundColor == 'red') {
        hpBarBg.style.backgroundColor = 'grey'
    } else {
        hpBarBg.style.backgroundColor = 'red'
    }
}, 500);

updateHpBar()
const faces = [
    './img/x1.png',
    './img/x2.png',
    './img/x3.png',
    './img/x4.png',
]

hitBtn.onclick = () => {

    hit()
    if (ded.hp == 20) {
        addArmor()

        hpDisplay.innerHTML = ded.hp = 10
        ded.deathCount++
        healing()

    } else {
        ded.hp -= 10
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

        updateHpBar()

    }, 200);
}

function healing() {

    if (ded.hp == 100) {
        hitBtn.disabled = false
        faceImg.src = faces[0]
    } else {

        setTimeout(() => {
            ded.hp += 10
            hitBtn.disabled = true

            if (faceImg.src.match('x3.png')) {
                faceImg.src = faces[3]
                console.log(faceImg.src)
            } else {
                faceImg.src = faces[2]
            }

            hpDisplay.innerHTML = ded.hp
            healing()
            // console.log('healing' + ded.hp)
        }, 500);
    }
    updateHpBar()
}