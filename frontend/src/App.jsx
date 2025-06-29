import { Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./Pages/Login"
import Expenses from "./components/Expenses"
import Layout from "./Pages/Layout"



function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Expenses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
