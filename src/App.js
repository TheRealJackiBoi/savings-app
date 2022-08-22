import logo from './logo.svg'; 
import './App.css'; 
import {useState, useEffect} from 'react';

function App() {
 	const [collection, setCollection] = useState({});
 	const [envelope, setEnvelope] = useState(0);
	const [sum, setSum] = useState(0);

	useEffect(() => {
		const col = localStorage.getItem("collection") 
		if ( col ) {
			setCollection(() => JSON.parse(col));
		} 
		else {
			let newCol = {}
			for (let i = 0; i < 50; i++) {
				if ( i === 0 ) {
					newCol = {
						1: 0,
					}
				}
				else {
					newCol = {...newCol,
						[i + 1]: 0,
					}
				}
			}
			localStorage.setItem('collection', JSON.stringify(newCol))
		}

		setSum(() => {
			let newSum = 0
			
			for (let i = 1; i <= 50; i++)
				newSum += collection[i]
			
			return newSum
		})
	}, [envelope])

	const getEnvelope = () => {
		setEnvelope(() => Math.floor(Math.random() * (50-1) + 1))
	}

	const addMoney = () => {
		collection[envelope] += envelope*10
		localStorage.setItem('collection', JSON.stringify(collection))
		setEnvelope(envelope)
	}

	return (
    <div className="w-screen h-screen">
		<h1 className="w-1/2 mx-auto">Hello and welcome to your savings manager!</h1>
		
		<button id="get-envelope" onClick={getEnvelope} className='mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get an envelope</button>

		<p>Your envelope is number <b>{envelope}</b></p>
		<p>There is <b>{JSON.stringify(collection[envelope])}kr</b> in there</p>

		<button id="add-number" onClick={addMoney} className='mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Add money</button>

		<p>In total you have saved <b>{sum}kr</b></p>
		
		<b><p>Envelopes amount:</p></b>

		{Object.keys(collection).map((val, index) => <p key="index">{val}: {collection[val]}</p>)}
	</div>
  );
}

export default App;
