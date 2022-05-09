import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

type User = {
  id: string;
  name: string;
  age: number;
}

function App() {
  const [newName, setNewName] = useState<string>("");
  const [newAge, setNewAge] = useState<number>(0);

  const [users, setUsers] = useState<User[]>([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  }

  const updateUser = async (id: string, age: number) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, name: doc.data().name, age: doc.data().age })));
    }

    getUsers()
  }, [])

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(Number(event.target.value));
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={() => {updateUser(user.id, user.age)}}>Increase age</button>
            <button onClick={() => {deleteUser(user.id)}}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
