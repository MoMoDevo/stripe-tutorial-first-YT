 import{BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./componets/Home"
import Cancel from "./componets/Cancel"
import Success from "./componets/Success"
function App() {
 
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/success" element={<Success/>} />
        </Routes>
        </BrowserRouter>
      </div>
        
    </>
  )
}

export default App
