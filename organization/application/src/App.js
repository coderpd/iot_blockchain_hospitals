import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import doctorImg from './doctor.png';
import patientImg from './patient.png';
import LoginForm from "./Login.js";
import Dashboard from "./dashboard";

function App() {

    const[user, setUser] = useState("");

    return user ?
        <Dashboard id={user} setUser={setUser}/> :
        <div>
            <div className={"lContainer"}>
                <LoginForm title={"Login as doctor"} img={doctorImg} setUser={setUser}/>
            </div>
            <div className={"lContainer"}>
                <LoginForm title={"Login as device"} img={patientImg} setUser={setUser}/>
            </div>
        </div>;
}

export default App;
