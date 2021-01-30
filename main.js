let hpbar = document.querySelector('.hpbar')
let hpBarBg = document.querySelector('.hp')
let hpDisplay = document.querySelector('.hpDisplay')

let fistRight = document.querySelector('.fistRight')
let fistLeft = document.querySelector('.fistLeft')
let hitLeftBtn = document.querySelector('.hitLeft')
let hitRightBtn = document.querySelector('.hitRight')

let faceImg = document.querySelector('.face')
let bodyArmor = document.querySelector('.bodyArmor')
let headArmor = document.querySelector('.headArmor')
let deathDisplay = document.querySelector('.deathDisplay')

let defaultDed = {
    hp: 100,
    armor: 0,
    deathCount: 0,
    isHealing: false
}

let ded;

if (localStorage.getItem('ded') == undefined) {
    ded = defaultDed
} else {
    let localDed = JSON.parse(localStorage.getItem('ded'))
    ded = localDed
}

let damageSum = function () {
    let dmg;
    if (ded.armor < 9) {
        dmg = 10 - ded.armor
    } else {
        dmg = 1
    }

    return (
        dmg
    )
}

function updateDed() {
    localStorage.setItem('ded', JSON.stringify(ded))
}

function updateArmor() {
    if (ded.armor < 4) {
        bodyArmor.src = './img/armor' + ded.armor + '.png'
    } else if (ded.armor < 7) {
        bodyArmor.src = './img/armor' + 3 + '.png'
        headArmor.src = './img/armor' + ded.armor + '.png'
    }
}

function updateHpBar() {
    hpDisplay.innerHTML = ded.hp
    hpbar.style.width = ded.hp + '%'
}

function updateDeathDisplay() {
    deathDisplay.innerHTML = 'Перекуров : ' + ded.deathCount;
}

setInterval(() => {
    if (hpBarBg.style.backgroundColor == 'red') {
        hpBarBg.style.backgroundColor = 'grey'
    } else {
        hpBarBg.style.backgroundColor = 'red'
    }
}, 500);

updateArmor()
updateDeathDisplay()
updateHpBar()

function hitAction(btn, hit) {
    if (ded.deathCount > 10) {
        alert('Отстань от деда')
    }
    btn.disabled = true
    hit()
    if (ded.hp < 21) {
        ded.armor++
        hpDisplay.innerHTML = ded.hp -= damageSum()
        ded.deathCount++
        updateArmor()
        healing()
        updateDeathDisplay()
    } else {
        ded.hp -= damageSum()
    }
}

hitRightBtn.onclick = () => {
    hitAction(this, hitRight)
}

hitLeftBtn.onclick = () => {
    hitAction(this, hitLeft)
}

function hitRight() {
    fistRight.src = './img/fist2.png'
    fistRight.style.marginLeft = '300px'

    faceImg.src = './img/x2.png'
    setTimeout(() => {
        fistRight.style.marginLeft = '500px'
        fistRight.src = './img/fist1.png'
        faceImg.src = './img/x1.png'
        updateHpBar()
        if (ded.isHealing == false) {
            hitRightBtn.disabled = false
        }
    }, 200);
}

function hitLeft() {
    fistLeft.src = './img/fist4.png'
    fistLeft.style.marginLeft = '200px'

    faceImg.src = './img/x2.png'
    setTimeout(() => {
        fistLeft.style.marginLeft = '-50px'
        fistLeft.src = './img/fist3.png'
        faceImg.src = './img/x1.png'
        updateHpBar()
        if (ded.isHealing == false) {
            hitLeftBtn.disabled = false
        }
    }, 200);
}

function healing() {
    ded.isHealing = true
    if (ded.hp > 90) {
        hpDisplay.innerHTML = ded.hp = 100
        faceImg.src = './img/x1.png'
        ded.isHealing = false
        hitRightBtn.disabled = false
        hitLeftBtn.disabled = false
        updateDed()
    } else {
        hitRightBtn.disabled = true
        hitLeftBtn.disabled = true
        setTimeout(() => {
            ded.hp += 10
            if (faceImg.src.match('x3.png')) {
                faceImg.src = './img/x4.png'
            } else {
                faceImg.src = './img/x3.png'
            }
            hpDisplay.innerHTML = ded.hp
            healing()
        }, 500);
    }
    updateHpBar()
}