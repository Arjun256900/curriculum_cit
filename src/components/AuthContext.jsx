import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userObjString = localStorage.getItem("user"); // Get raw string

    if (token && userObjString) {
      setUser({ token });
      setUserObj(JSON.parse(userObjString)); // Parse only if it exists
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserObj(data.user); 
      setUser({ token: data.token });
    } else {
      console.log("AuthContext.js");
      alert(data.error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('regulation');
    setUser(null);
    setUserObj(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userObj }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
