import React, { useState } from 'react';
import { getCharacterData } from '../services/blizzardApi';

const CharacterData = () => {
  const [realm, setRealm] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [characterData, setCharacterData] = useState(null);

  const handleFetchData = async () => {
    const data = await getCharacterData(realm, characterName);
    setCharacterData(data);
  };

  return (
    <div>
      <h1>World of Warcraft Character Data</h1>
      <input
        type="text"
        placeholder="Realm"
        value={realm}
        onChange={(e) => setRealm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Character Name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      {characterData && (
        <div>
          <h2>{characterData.name}</h2>
          <p>Level: {characterData.level}</p>
          <p>Class: {characterData.class}</p>
          <p>Race: {characterData.race}</p>
          <p>Health: {characterData.stats.health}</p>
          {characterData.stats.mana && <p>Mana: {characterData.stats.mana}</p>}
          {characterData.stats.energy && <p>Energy: {characterData.stats.energy}</p>}
          <h3>Professions</h3>
          <ul>
            {characterData.professions.primary.map((profession) => (
              <li key={profession.id}>{profession.name}</li>
            ))}
          </ul>
          <h3>Achievements</h3>
          <p>Total Achievements Earned: {characterData.achievements.totalQuantity}</p>
          <h4>Most Recent Achievements</h4>
          <ul>
            {characterData.achievements.recent.slice(0, 5).map((achievement) => (
              <li key={achievement.id}>{achievement.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterData;
