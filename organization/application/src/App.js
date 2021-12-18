import logo from './logo.svg';
import './App.css';
import doctorImg from './doctor.png';
import patientImg from './patient.png';
import LoginForm from "./Login.js";

function App() {


    return (
      <div>
          <div className={"lContainer"}>
              <LoginForm title={"Login as doctor"} img={doctorImg}/>
          </div>
          <div className={"lContainer"}>
              <LoginForm title={"Login as device"} img={patientImg}/>
          </div>
      </div>

    );
}

export default App;
