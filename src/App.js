import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';



function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepositories( [...response.data] );
    });

  }, [])


  async function handleAddRepository() {
    const repository = {
      title: `Desafio ReactJS`,
      url: 'http://github.com/fhalbiero', 
      techs: ["Node.js", "React"]  
    }

    const response = await api.post('repositories', {...repository});

    setRepositories([...repositories, response.data]); 
  }


  async function handleRemoveRepository(id) {
    if (!id) return;

    const response = await api.delete(`repositories/${id}`);

    if (response.error) {
      console.log(response.error);
      return;
    }
    
    const filteredRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories([...filteredRepositories]);
  }


  return (
    <div>
      <h1>Repositories</h1>
      <button onClick={handleAddRepository}>Adicionar</button>
        <ul data-testid="repository-list">
          {repositories.map( repository => (
            <li key={repository.id}>{ repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
