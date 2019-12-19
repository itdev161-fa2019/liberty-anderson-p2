import React from 'react';
import CharListItem from './CharListItem';
import './styles.css';

const CharList = props => {
	const  { chars } = props;
	return (
		<div className="charList">
			{chars.map(character => (
				<CharListItem
					key={character._id}
					character={character}
				/>
			))}
		</div> 
	);
};

export default CharList;