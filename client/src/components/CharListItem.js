import React from 'react';
import './styles.css';

const CharListItem = props => {
	const { character } = props;

	const toTitleCase = toTitle => {
		return toTitle.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
	}

	return(
		<div>
			<div className="charListItem">
				<ul>
					<li>{character.name}</li>
					<li>{toTitleCase(character.race)}</li>
					<li>{toTitleCase(character.alignment)} {toTitleCase(character.cClass)}</li>
					<li>{toTitleCase(character.background)}</li>
				</ul>
			</div>
		</div>
	);
};

export default CharListItem;