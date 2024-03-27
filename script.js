
let P = document.getElementById('gameplan');
P.innerHTML = `Match the Famous Duo's`;

let cardsContainer = document.querySelector('.container'); //we use query selector here as opposed to getElementsByClassName, this grabs the first element, with the class container we want to work on.  Note: if I used QuerySelectorAll, that would connect to all(if more than one) elements with the class of container.  

const characters = [
    {
        name: 'chucklebrothers',
        img: 'images/barry.jpg',
        position:"center"
    },
    {
        name: 'chucklebrothers',
        img: 'images/paul.jpeg',
        position:"center"
    },
    {
        name: 'TomandJerry',
        img: 'images/tom.jpg',
        position:"center", 
    },
    {
        name: 'TomandJerry',
        img: 'images/Jerry.png',
        position:"center"
    },
    {
        name: 'Bobthebuilder',
        img: 'images/bob.jpg',
        position:""
    },
    {
        name: 'Bobthebuilder',
        img: 'images/wendy.jpg',
        position:""
    },
    {
        name: 'shrek',
        img: 'images/shrek.jpg',
        position:""
    },
    {
        name: 'shrek',
        img: 'images/donkey.jpg',
        position:""
    },
    {
        name: 'Nemo',
        img: 'images/dory.jpg',
        position:""
    },
    {
        name: 'Nemo',
        img: 'images/nemo2.jpeg',
        position:"bottom"
    },
    {
        name: 'HarryPotter',
        img: 'images/harry.jpg',
        position:""
    },
    {
        name: 'HarryPotter',
        img: 'images/voldemort.jpg',
        position:"center"
    }];
    console.log(characters);


const characterCount = characters.length; 
//we use this down below in the for loop, we could also use the condition i<12 (as 12 is our no of tiles)

// variables that indicate the current state of the game  
let revealedCount = 0; //means start with 0 tiles revealed. 
let activeCard = null; //refers to the tile the user has just clicked on, thus is active. and referes to the DIV itself. 
let awaitingEndOfMove = false; // if set to true, means the user is waiting for the unmatched tiles to turn over again. 

// binding an event to an element 
function buildCard(character){
    const element = document.createElement('div');
    element.classList.add('card'); //giving the div a class of card
    element.setAttribute('data-character', character.name); 
    // using data-character, allows us to give a property to the element, the property is the character.

    element.setAttribute('data-revealed','false'); //this is saying 

    // the 'element' used below is the div that we created above, within which the boxes/character cards are. 
    element.addEventListener('click', () => {
        const revealed = element.getAttribute('data-revealed')

        if (
            awaitingEndOfMove
            || revealed === 'true'
            || element === activeCard //if clicking on the same tile twice, return and cancel the move
            ) {
            return; //this section says that if the cards do not match, don't proceed any further in the game or code, thus return(stop code from processing further)
        }
        // here we say if not awaiting end of move as the cards have matched, reveal the card. 
        // element.style.backgroundImage = `url('${character.img}')` ;
        element.style.background = `url('${character.img}') ${character.position}` ;
         console.log(element);

        if (!activeCard) {
            activeCard = element; //here active tile is the current tile 
            return; 
        }
    const characterToMatch = activeCard.getAttribute('data-character');

    if (characterToMatch === character.name){
        activeCard.setAttribute('data-revealed' , 'true');
        element.setAttribute('data-revealed' , 'true');

        awaitingEndOfMove = false;
        activeCard = null;
        revealedCount += 2; //variable to check if the game is completed

        if(revealedCount == characterCount){
            setTimeout(() => {
            alert('Congratulations, You had an awesome childhood! you are winning at Life!!');
            }, 500);

        }
        return;
    }
        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundImage = null;
            activeCard.style.backgroundImage = null;

            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000); //setting 1 second time so the cards flip back after 1 second, if the characters do not match. 
    },);
    
    return element;
}

// Building up the tiles using the for loop as the no of loops is know. 
// here for the condition we are using i<cardCount, a variable we defined on line 25. if we had not defind variable we could have written i<12 also. 

for (let i=0; i < characterCount; i++){
    const randomIndex = Math.floor(Math.random() * characters.length);
    const character = characters[randomIndex];
    const card = buildCard(character); //this is refering to the function we created above on line 35.

    characters.splice(randomIndex,1); // splice removes the character from the array that we are creating the card for, within this loop. so that in the next loop is does not create card for the same character. 

    cardsContainer.appendChild(card); // cardContainer came from the variable we defined uptop, this is also attaching/appending the 'card' to the correct element, which is this case is the cardContainer and not the body. 

    console.log(card); // this is saying for each loop when the condition is met, please show character.  
}

// coding the Reset Game button 
   
    const reset = document.getElementById('btn');
    btn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

