let arrayPronto = []
let arrayJogador = []
let nivel = 0
let inicio = false
const cores = ['yellow', 'green', 'blue', 'red']

document.addEventListener('keydown', (e) => {
        iniciaJogo()
    }
)

handleClick()

function handleClick() {

    const botoes = document.querySelectorAll('.btn')
    botoes.forEach((e) => {
        e.addEventListener('click', () => {
            piscaBotao(e.id)
            arrayJogador.push(e.id)
            testaErro()
            proximaCor()
        })
    })
}

function iniciaJogo() {
    if (!inicio) {
        arrayPronto = []
        arrayJogador = []
        inicio = true
        atualizaNivel()
        adicionaCor()
        setTimeout(() => {
            piscaBotao(arrayPronto[0])
        }, 1500)
        tocaSom('game-start')
        document.querySelector('.reiniciar-jogo').classList.add('hide')
        }
}

function proximaCor() {
    if (arrayPronto.length === arrayJogador.length && (inicio)) {
        arrayJogador = []
        adicionaCor()
        setTimeout(() => {
            piscaSequencia()
        }, 1500)
        atualizaNivel()
        tocaSom('success')
    }
}

function testaErro() {
    for (let i = 0; i < arrayJogador.length; i++) {
        if (arrayJogador[i] !== arrayPronto[i]) {
            inicio = false
            nivel = 0
            document.querySelector('body').classList.add('game-over')
            setTimeout(() => {
                document.querySelector('body').classList.remove('game-over')
            }, 500);
            document.querySelector('#level-title').innerText = 'Game Over :('
            document.querySelector('.reiniciar-jogo').classList.remove('hide')
            tocaSom('game-over')
            console.log('gameover')
        }
    }
}

function adicionaCor() {
    let indice = Math.floor(Math.random() * 4)
    arrayPronto.push(cores[indice])
}

function piscaBotao(cor) {
    document.querySelector(`.${cor}`).classList.add('pressed')
    setTimeout(() => {
        document.querySelector(`.${cor}`).classList.remove('pressed')
    }, 300);
    tocaSom(cor)
}

function piscaSequencia() {
    for (let i = 0; i < arrayPronto.length; i++) {
        setTimeout(() => {
            piscaBotao(arrayPronto[i])
        }, 600 * i);
    }
}

function atualizaNivel() {
    nivel++
    document.querySelector('#level-title').innerHTML = 'Nível ' + nivel
}

function tocaSom(nome) {
    let audio = new Audio(`sounds/${nome}.mp3`)
    audio.play()
}