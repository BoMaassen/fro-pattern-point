
import './App.css'
import {MagnifyingGlass, PlusCircle, UserCircle} from "@phosphor-icons/react";

function App() {

  return (
    <>
<nav>
  <h2>Pattern point</h2>
    <div>
  <label htmlFor="searchbar">
  <input id="searchbar" name="searchbar" placeholder="zoeken..."/>
  </label>
    <button type="button"><MagnifyingGlass></MagnifyingGlass></button>
    </div>
  <div>
      <button>
          <PlusCircle></PlusCircle>
      </button>
      <button>
          <UserCircle></UserCircle>
      </button>
  </div>
</nav>
        <h2>titel 2</h2>
        <h3>titel 3</h3>
        <h4>titel 4</h4>
        <p>hello</p>
    </>
  )
}

export default App
