import './App.css';
import React from "react"
import Die from "./components/die"
import Confetti from 'react-confetti'

function App() {
	const [dice, setDice] = React.useState(() => allNewDice())
	const [isWon, setIsWon] = React.useState(() => false)
	React.useEffect(()=> {
		const allHeld = dice.every(die => die.isHeld)
		const checkValue = dice[0].value
		const allSameValue = dice.every(die => die.value === checkValue)
		if (allHeld && allSameValue)
		{
			setIsWon(true)
			console.log("You Won !")
		}
	}, [dice])
	function allNewDice()
	{
		let newArray = []
		for (let index = 0; index < 10; index++) {
			newArray.push({
					id : index,
					value : Math.floor(Math.random() * 6 + 1),
					isHeld : false
			})
		}
		return newArray
	}

	function generateNewGame ()
	{
		setDice(allNewDice)
		setIsWon(false)
	}

	function rollDice ()
	{
		setDice(oldDice => oldDice.map( die => {
			return !die.isHeld ?
				{...die, value : Math.floor(Math.random() * 6 + 1)} : 
				die
			})
		)
	}

	function togglehold(id) 
	{
		setDice(oldDice => oldDice.map( die => {
			return die.id === id ? 
				{...die, isHeld : !die.isHeld} : 
				die
			})
		)
	}

	const diceElements = dice.map(die => 
		<Die key={die.id} die={die} toggle={()=> togglehold(die.id)}></Die>
		)  
	return (
		<main className="App">
			{isWon && <Confetti/>}
			<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className="dice-container">
				{diceElements}
			</div>
			{!isWon ? 
				<button className="roll-dice" onClick={rollDice}>Roll</button> :
				<button className="roll-dice" onClick={generateNewGame}>New Game</button>
		}
		</main>
  );
}

export default App;
