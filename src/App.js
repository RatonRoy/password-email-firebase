import { getAuth } from "firebase/auth";
import './App.css';
import app from './firebase.init';
// this is the import files section and the end line.  
const auth = getAuth(app); 
const handleOnBlur = (e) => {
  console.log(e.target.value);
}
const subMit = event => {
  event.preventDefault();
}
function App() {
  return (
    <div className="App">
      <form onSubmit={subMit}>
        <p>
          <input type="email" name="email" id="email" placeholder="Please give your email..." onBlur={handleOnBlur}/>
        </p>
        <p>
          <input type="password" name="password" id="password" placeholder="Input a strong password....." onBlur={handleOnBlur}/>
        </p>
        <p>
          <input type="submit" value="Submit"  className="submit"/>
        </p>
      </form>
    </div>
  );
}

export default App;
