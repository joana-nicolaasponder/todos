import AddTodo from './AddTodo.tsx'
import ViewTodos from './ViewTodos.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <ViewTodos />
        {/* <AddTodo /> */}
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
