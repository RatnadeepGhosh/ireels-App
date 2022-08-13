import React, { useState, useEffect } from "react";
import { auth} from "../firebase";
export const AuthContext = React.createContext();
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
function AuthWrapper({ children }) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("in auth wrapper ");
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged called" );
      if (user) {
        setUser(user);
      }
      else {
        //sign out 
      }
    })
    setLoading(false);
  },[])
    //feature created 
    function login(email,password) {
      return signInWithEmailAndPassword(auth, email, password);
      //goes to firebase check if function called is legit
      //email pass checks with users table in authentication service 
      // if present suceess ,else fail
    }
  
  function logout() {
    return signOut(auth);
  }

    const store = {
      login,
      user,
      logout,
    };


    return (
      <AuthContext.Provider value={store}>
        {!loading && children}
      </AuthContext.Provider>
    );
}

export default AuthWrapper;