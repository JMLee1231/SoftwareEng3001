import React, { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load users.");
        return response.json();
      })
      .then((data) => setCharacters(data.users_list))
      .catch((loadError) => setError(loadError.message));
  }, []);

  async function removeOneCharacter(id) {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setError("Unable to delete user.");
      return;
    }
    setCharacters((currentUsers) =>
      currentUsers.filter((character) => character._id !== id),
    );
  }

  async function updateList(person) {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
    if (!response.ok) {
      setError("Unable to create user.");
      return false;
    }
    const savedUser = await response.json();
    setCharacters((currentUsers) => [...currentUsers, savedUser]);
    return true;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      {error && <p role="alert">{error}</p>}
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
