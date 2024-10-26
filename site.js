
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {
	

	const getNextQuestion = async () => { 
		//fetch questions and format question and answers in JSON
		const pulled = await fetch('https://opentdb.com/api.php?amount=1');
		const json = await pulled.json();
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	};

	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => {

	//display
	const answersElement = document.getElementById('answersElement');
	answersElement.textContent = question;
	//clear
	answersElement.innerHTML = '';

	//create buttons
	answers.forEach(answer => {
		const button = document.createElement('button');
		button.textContent = answer;

		// Add click event listener
		button.addEventListener('click', function() {
			//is the answer correct or incorrect?
			if (answer === correct) {
				button.classList.add('correct');
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true);
				alert('Correct!');
				return;
			}

			button.disabled = true;
			alert('Incorrect!');
		});

		// Append button to answers element
		answersElement.appendChild(button);
	});

	};

	// todo: add the event listener to the "nextQuestion" button

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
