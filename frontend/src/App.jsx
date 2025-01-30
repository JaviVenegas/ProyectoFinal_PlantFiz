import './App.css'
import { Footer } from './components/Footer'
import { LoginForm } from './components/LoginForm'
import { CustomNav } from './components/Nav'
import { RegisterForm } from './components/RegisterForm'

function App() {
  return (
    <>
      <CustomNav />
      
      {/* <RegisterForm /> */}
      <LoginForm />

      <Footer />
    </>
  )
}

export default App
