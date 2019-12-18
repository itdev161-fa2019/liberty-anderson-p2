import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
	const [charData, setCharData] = useState({
		name: '',
		race: '',
		cClass: '',
		alignment: '',
		background: ''
	});

	const { name, race, cClass, alignment, background } = charData;

	const onChange = e => {
		const { name, value } = e.target;
		setCharData({
			...charData,
			[name]: value
		});
	};

	const create = async() => {
		if (!name || !race || !cClass || !alignment) {
			console.log('Name, Race, Class, and Alignment are required');
		} else {
			const newChar = {
				name: name,
				race: race,
				cClass: cClass,
				alignment: alignment,
				background: background
			}

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				const body = JSON.stringify(newChar);
				const res = await axios.post('http://localhost:5000/api/chars', body, config);
				console.log(res.data);
			} catch (error) {
				console.error(`Error adding character: ${error.response.data}`);
			}
		}
	};

	return (
		<div className="form-container">
			<h2>Create Character</h2>
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={name} 
					onChange={e => onChange(e)} />
			<input
					type="text"
					placeholder="Race"
					name="race"
					value={race} 
					onChange={e => onChange(e)} />
			<input
					type="text"
					placeholder="Class"
					name="cClass"
					value={cClass} 
					onChange={e => onChange(e)} />
			<input
					type="text"
					placeholder="Alignment"
					name="alignment"
					value={alignment} 
					onChange={e => onChange(e)} />
			<input
					type="text"
					placeholder="Background"
					name="background"
					value={background} 
					onChange={e => onChange(e)} />
			<button onClick={() => create()}>Create</button>
		</div>
	)
}

export default Create;