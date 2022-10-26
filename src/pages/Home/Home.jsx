import React, {useContext} from 'react'
import { AuthContext } from '../../App';
import './Home.css'
import { useNavigate } from "react-router-dom";
import { StackRoutes } from "../../routes/Stack.Routes";
import { Header } from '../../components/Header/Header'

    export function Home() {
      const {setUser} = useContext(AuthContext)
      let navigate = useNavigate();
      function Home() {
        setUser(null)
        navigate("/alterpassword")
        return <StackRoutes/>
      } 
  return (
    <Header />
  )
}
