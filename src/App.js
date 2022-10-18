import {StackRoutes} from "./routes/Stack.Routes";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()

function App() {
  const [user, setUser] = useState(localStorage.getItem("usuario"))
  useEffect(() => {
    if(user !== undefined){
      localStorage.setItem("usuario",(user))
    }
  },[user])
  return (
    <AuthContext.Provider value={{user, setUser}}>
          <StackRoutes />
    </AuthContext.Provider>

  );
}

export default App;
