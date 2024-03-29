
const dice = ["bird","basket","red","green","blue","yellow"]
const diceImage = ['owl.png','shopping-basket.png', 'apple.png', 'cherry.png','orange.png','pear.png']

let diceColor = ''
let actualDiceIndex = 0
let emptyTrees = 0
let birdInGarden = false
let gameOver = false



const setUpEventHandlers = function() {
    document.querySelector('.dice').addEventListener('click', playOneRound)
}

const playOneRound = function(){
    if(!gameOver){
        rollDice()
        setDiceColor()
        moveItems()
        checkGameEnd()
    } else {
        if(confirm('Game Over: Play again?')){
            location.reload()
        }
    }
}

const setDiceColor = function(){
    const diceFace = document.querySelector('.dice')
    diceColor = dice[actualDiceIndex]
    diceFace.style.backgroundImage = `url(ressources/img/${diceImage[actualDiceIndex]})`
    diceFace.style.backgroundRepeat = "no-repeat";
    diceFace.style.backgroundPosition = "center";
    diceFace.style.backgroundSize = "contain"
    diceFace.textContent = ""
}

const moveItems = function() {
    // Actions according to the dice face
    if (diceColor !== "bird" && diceColor !== "basket"){
        // color on dice
        const ulToRemoveFrom = document.querySelector(`.tree.${diceColor} ul`)
        const ulToAddTo = document.querySelector(`.basket.${diceColor} ul`)
        moveFruit(ulToRemoveFrom, ulToAddTo)
    } else if(diceColor === "basket"){
        // basket on dice
        const divTree = getLongestTree()
        const ulToRemoveFrom = divTree.children[1]

        const treeColor = divTree.className.split(" ")[1]
        const ulToAddTo = document.querySelector(`.basket.${treeColor} ul`)
        moveFruit(ulToRemoveFrom, ulToAddTo)
    } else {
        // bird
        moveBird()
    }
}


const moveFruit = function(treeToRemoveFrom, treeToAddTo){
    if(treeToRemoveFrom.children[0]){
        const li = treeToRemoveFrom.children[0]
        // remove fruit
        treeToRemoveFrom.removeChild(li)
        // add fruit
        treeToAddTo.appendChild(li)
        // last fruit taken from tree
        if(treeToRemoveFrom.children.length === 0){
            emptyTrees +=1 
        }
    } else {
        console.log(`${treeToRemoveFrom.parentNode.className} is empty, cant pick another fruit.`)
    }
}


const moveBird = function(){
    if(document.querySelector('.bird')){
        const birdTile = document.querySelector('.bird')
        birdTile.classList.toggle('bird')

        if(birdTile.nextElementSibling){
            birdTile.nextElementSibling.classList.toggle('bird')
        } else {
            birdInGarden = true
            console.log("You loose!!")
        }
    } 
}

const getLongestTree= function(){
    trees = document.querySelectorAll('.tree')
    fruits = []
    for(let tree of trees){
        fruits.push(tree.children[1].children.length)
    }
    const i = fruits.indexOf(Math.max(...fruits));
    return trees[i]
}

const rollDice = function(){
    actualDiceIndex = Math.floor(6 * Math.random())   
}

const checkGameEnd = function(){
    let text = ''
    let className = ''
    if(emptyTrees === 4 && !birdInGarden){
        text  = "You win, catched all the fruits"
        className = 'winner'
    } else if(emptyTrees < 4 && birdInGarden){
        text  = "You lose, the bird is in your garden"
        className = 'loser'
    } else {
        return
    }
    const h1 = document.querySelector('h1')
    h1.textContent = text
    h1.classList.toggle(className)
    gameOver = true
}



// Start game
setUpEventHandlers()




