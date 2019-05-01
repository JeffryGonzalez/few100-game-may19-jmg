import { getRandomInt } from "./numbers";

let squares: NodeList;
const message = document.getElementById('message') as HTMLElement;
export function runApp() {
    // Select a square as the secret square
    // pick a random numbers, 1-6 inclusive
    const secretNumber = getRandomInt(1, 6);
    // find the corrleated square and "bless" it
    squares = document.querySelectorAll('.square');
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            // mark the square somehow
            sq.dataset.secret = "true";

        }
        sq.addEventListener('click', handleClick);

        currentSquare++;
    })
}

function handleClick() {
    // Did they win?
    const isWinner = this.dataset.secret === "true";
    const clickedSquare = this;
    if (isWinner) {
        // make it pretty!
        clickedSquare.classList.add('winner');
        message.innerText = 'YOU WIN! AWESOME!';
        squares.forEach((sq: HTMLDivElement) => {
            if (sq !== clickedSquare) {
                sq.classList.add('loser');
                sq.removeEventListener('click', handleClick);
            }
        })

    } else {
        clickedSquare.classList.add('loser');
        clickedSquare.removeEventListener('click', handleClick);

        const allDone = document.querySelectorAll('.square.loser').length === 5;
        if (allDone) {
            message.innerHTML = 'LOSER!';
        }
    }

}

// const handleClick = () => {
//     console.log("You clicked", this);
// }