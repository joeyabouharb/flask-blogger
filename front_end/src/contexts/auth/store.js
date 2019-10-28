import React, {
  createElement,
  useEffect,
  useState,
} from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
};
