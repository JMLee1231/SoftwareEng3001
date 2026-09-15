import { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

const USERS_URL = "http://localhost:8000/users";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch(USERS_URL);
  }

  function postUser(person) {
    return fetch(USERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`${USERS_URL}/${id}`, { method: "DELETE" });
  }

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load users: ${response.status}`);
        }

        return response.json();
      })
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.error(error));
  }, []);

  function updateList(person) {
    return postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error(`Could not create user: ${response.status}`);
        }

        return response.json();
      })
      .then((createdUser) => {
        setCharacters((currentCharacters) => [...currentCharacters, createdUser]);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  function removeOneCharacter(id) {
    return deleteUser(id)
      .then((response) => {
        if (response.status !== 204) {
          throw new Error(`Could not delete user: ${response.status}`);
        }

        setCharacters((currentCharacters) =>
          currentCharacters.filter((character) => character.id !== id),
        );
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
