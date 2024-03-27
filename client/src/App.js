import './App.css';
import Entry from "./entry"

function App() {
  return (
  <main>
    <header>
      <a href="" className="logo">MyBlog</a>

      <nav>
        <a href="" >Login</a>
        <a href="" >Register</a>
      </nav>


    </header>
    <div className="entries">
      <Entry />

    </div>



  </main>
  );
}

export default App;
