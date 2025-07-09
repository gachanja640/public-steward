import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/rules')
      .then(res => res.json())
      .then(data => setRules(data));
  }, []);

  const filteredRules = rules.filter(rule =>
    rule.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <header className="header">
        <h1>🏁 Public Steward</h1>
        <p>Your F1 Rules & Steward Decision Hub</p>
        <input
          type="text"
          placeholder="Search regulations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <main className="rules-list">
        {filteredRules.map((rule, index) => (
          <div key={index} className="rule-item">
            <h3>{rule.title}</h3>
            <p><strong>Date:</strong> {rule.date}</p>
            <a href={rule.url} target="_blank" rel="noopener noreferrer">Download PDF</a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;