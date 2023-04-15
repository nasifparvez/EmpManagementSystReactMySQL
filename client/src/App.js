import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [deptId, setDeptId] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  
  const getEmployees = () => {
    Axios.get("https://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };


  const addEmployee = () => {
    Axios.post("https://localhost:3001/create", {
      name: name,
      salary: salary,
      position: position,
      email: email,
      deptId: deptId,
      phoneNo: phoneNo
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          salary: salary,
          position: position,
          email: email,
          deptId: deptId,
          phoneNo: phoneNo
        },
      ]);
    });
  };


  return (
    <div className="App">
      <div className='addEmployeeForm'>
        <h1>Add Employee</h1>
      <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Salary:</label>
        <input
          type="number"
          step="0.01"
          onChange={(event) => {
            setSalary(event.target.value);
          }
        }
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Phone Number:</label>
        <input
          type="tel"
          onChange={(event) => {
            setPhoneNo(event.target.value);
          }
        }
        />
        <label>Dept ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setDeptId(event.target.value);
          }
        }
        />
        <br></br>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    //setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    //updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    //deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  );
}

export default App;
