import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setList] = useState([]);

  // Insert data

  const addFriend = () => {
    Axios.post("http://localhost:3001/insert", { name: name, age: age })
      .then((response) => {
        setList([...listOfFriends, { id: response._id, name: name, age: age }]);
      })
  };

  //  Read data

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  //Update the value

  const updateFriend = (id) => {
    const newAge = prompt("Enter the age");

    Axios.put("http://localhost:3001/update", { newAge: newAge, id: id }).then(
      () => {
        setList(
          listOfFriends.map((eachItem) => {
            return eachItem._id === id
              ? { _id: id, name: eachItem.name, age: newAge }
              : eachItem;
          })
        );
      }
    );
  };

  // Delete function

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() =>
        setList(
          listOfFriends.filter((eachItem) => {
            return eachItem._id !== id;
          })
        )
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className="input" >
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={addFriend}>Add</button>
      </div>

      <div className="listOfFriend">
        {listOfFriends.map((eachItem) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>{eachItem.name}</h3>
                <h3>{eachItem.age}</h3>
              </div>
              <button onClick={() => updateFriend(eachItem._id)}>Update</button>
              <button
                onClick={() => deleteFriend(eachItem._id)}
                style={{ borderLeft: "none", backgroundColor: "red" }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
