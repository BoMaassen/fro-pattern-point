import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContect.jsx";
import PostsContextProvider from "./context/PostsContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <AuthContextProvider>
              <PostsContextProvider>
              <App />
              </PostsContextProvider>
          </AuthContextProvider>
      </Router>
  </StrictMode>,
)
