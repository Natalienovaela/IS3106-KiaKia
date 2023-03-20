import logo from './logo.svg';
import './App.css';
import moment from "moment";

function App() {
  const tomorrow = moment().add(1, "days").format("MMM DD YYYY"); 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Tomorrow is {tomorrow}</p>
      </header>
    </div>
  );
}

export default App;
