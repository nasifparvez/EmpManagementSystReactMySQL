import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState("");
  const [job_title, setjob_title] = useState("");

  const [newSalary, setNewSalary] = useState(0);


  const [employeeList, setEmployeeList] = useState([]);

  
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };


  const addEmployee = () => {
    Axios.post("http://localhost:3001/add", {
      name: name,
      salary: salary,
      job_title: job_title,
      email: email,
      phone: phoneNo
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          salary: salary,
          job_title: job_title,
          email: email,
          phone: phoneNo
        },
      ]);
    });
  };


  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.emp_id != id;
        })
      );
    });
  };

  const updateEmployeeSalary = (id) => {
    Axios.put("http://localhost:3001/update", { salary: newSalary, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.emp_id == id
              ? {
                  emp_id: val.emp_id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  salary: newSalary,
                }
              : val;
          })
        );
      }
    );
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
        <label>job_title:</label>
        <input
          type="text"
          onChange={(event) => {
            setjob_title(event.target.value);
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
        <br></br>
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Id: {val.emp_id}</h3>
                <h3>Name: {val.name}</h3>
                <h3>Phone No.: {val.phone}</h3>
                <h3>Email: {val.email}</h3>
                <h3>Job Title: {val.job_title}</h3>
                <h3>Salary: {val.salary}</h3>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Change Salary Here"
                  onChange={(event) => {
                    setNewSalary(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeSalary(val.emp_id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.emp_id);
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
