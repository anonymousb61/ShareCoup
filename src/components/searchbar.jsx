import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your Firebase configuration


// Initialize Firebase
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const db = firebase.firestore();
    const snapshot = await db.collection('codes').where('companyName', '==', searchTerm).get();

    const searchResults = snapshot.docs.map(doc => doc.data());
    setResults(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
