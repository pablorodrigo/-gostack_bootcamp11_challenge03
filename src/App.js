import React, {useEffect, useState} from "react";
import api from "./services/api";
import "./styles.css";


function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            console.log(response.data);
            setRepositories(response.data);
        })
    }, []);

    async function handleAddRepository() {
        const response = await api.post('/repositories', {
            title: `New Repository added ${Date.now()}`,
            url: "www.url.com.br",
            techs: ["Tech1", "Tech2"],
        });

        const repository = response.data;

        setRepositories([...repositories, repository])

    }

    async function handleRemoveRepository(id) {
        // TODO
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>{repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remove
                        </button>
                    </li>

                ))}
            </ul>

            <button onClick={handleAddRepository}>Add</button>
        </div>
    );
}

export default App;
