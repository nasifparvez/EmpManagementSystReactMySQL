import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState(0);
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");


  return (
    <div className="App">
      <div className='addEmployeeForm'>
      <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Salary:</label>
        <input
          type="number"
          step="0.01"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Salary:</label>
        <input
          type="number"
          step="0.01"
          onChange={(event) => {
            setName(event.target.value);
          }
        }
        />
      </div>
    </div>
  );
}

export default App;
