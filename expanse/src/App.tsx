import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Expenses from './pages/Expenses';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';
const socketPort = import.meta.env.VITE_SOCKET_PORT ?? '';

function App() {
  console.log('basePath', basePath)
  return (
    <div className="App">
      <FrappeProvider socketPort={socketPort}>
        <BrowserRouter>
			    <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/" element={<Expenses />} />
          </Routes>
        </BrowserRouter>
      </FrappeProvider>
    </div>
  )
}

export default App;
