import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Articles from './Components/Articles';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <h2>Search</h2>
        <Articles />
      </main>
    </div>
  );
}

export default App;
