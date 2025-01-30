import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RouterManager } from './router/RouterManager'
import { CustomNav } from './components/Nav'
// Aqui se declaran los import como el del carrito de compras

function App() {
  return (
    <>
      <Router>
        <CustomNav />
        <RouterManager />
      </Router>    
    </>
  )
}

export default App
