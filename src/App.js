import logo from "./logo.svg";
import "./App.css";

import Person from "./person";

function App() {
  const petList = [
    {
      id: 1,
      name: "Hotch",
      isAlive: false,
    },
    {
      id: 2,
      name: "Bonita",
      isAlive: false,
    },
    {
      id: 3,
      name: "Peluso",
      isAlive: false,
    },
    {
      id: 4,
      name: "Nami",
      isAlive: true,
    },
    {
      id: 5,
      name: "Lola",
      isAlive: false,
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Trying...
        </p>
        <Person />
        <Calculator number1={1} number2={2} />
        <Pets pets={petList} />
        <Hello />
        <Hello name="Ada" />
        <Hello name="Wong" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Hello({ name = "World!" }) {
  return <p>Hello {name}</p>;
}

function Pets({ pets }) {
  return (
    <ul>
      {pets.map((pet) => (
        <Pet key={pet.id} {...pet} />
      ))}
    </ul>
  );
}

function Pet({ id, name, isAlive }) {
  return (
    <li className={isAlive ? "is-alive" : ""}>
      {name} - has id {id} and is {isAlive ? "alive" : "not alive :("}
    </li>
  );
}

function Calculator({ number1, number2 }) {
  if (!number1) {
    return "number1 is required";
  }

  if (!number2) {
    return "number2 is required";
  }

  const result = number1 + number2;

  return <p>{result}</p>;
}

export default App;
