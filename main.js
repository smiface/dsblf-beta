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
    deathCount: 0,
    isHealing: false
}

let damageSum = function () {
    return (
        10 - ded.bodyArmor * 2 - ded.headArmor * 1
    )
}

function addArmor() {
    if (ded.bodyArmor < 3) {
        ded.bodyArmor++
        bodyArmor.src = './img/armor' + ded.bodyArmor + '.png'
    } else {
        if (ded.headArmor < 3) {
            ded.headArmor++
            headArmor.src = './img/head' + ded.headArmor + '.png'

        }
    }
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
    if (ded.deathCount > 10) {
        alert('Отстань от деда')
    }
    hitBtn.disabled = true
    hit()
    if (ded.hp < 21) {
        addArmor()
        hpDisplay.innerHTML = ded.hp -= damageSum()
        ded.deathCount++
        healing()
    } else {
        ded.hp -= damageSum()
    }
}

function hit() {
    fistImg.src = './img/fist2.png'
    fistImg.style.left = '200px'
    faceImg.src = faces[1]

    setTimeout(() => {
        fistImg.style.left = '400px'
        fistImg.src = './img/fist1.png'
        faceImg.src = faces[0]
        updateHpBar()
        if (ded.isHealing == false) {
            hitBtn.disabled = false
        }
    }, 200);
}

function healing() {
    ded.isHealing = true
    if (ded.hp > 90) {
        hpDisplay.innerHTML = ded.hp = 100
        faceImg.src = faces[0]
        ded.isHealing = false
        hitBtn.disabled = false
    } else {
        hitBtn.disabled = true
        setTimeout(() => {
            ded.hp += 10
            if (faceImg.src.match('x3.png')) {
                faceImg.src = faces[3]
                console.log(faceImg.src)
            } else {
                faceImg.src = faces[2]
            }

            hpDisplay.innerHTML = ded.hp
            healing()
        }, 500);
    }
    updateHpBar()
}
