import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '..';

// Context with the correct type
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  // Define the default state
  const defaultState: AppState = {
    username: undefined,
    profilePic: undefined,
    isLoggedIn: false
  };

  const [state, setState] = useState<AppState>(() => {
    const storedState = localStorage.getItem('state');
    return storedState ? JSON.parse(storedState) : defaultState;
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          `${(API_URL as string) + '/user/verify'}`,
          {
            credentials: 'include'
          }
        );
        const data = await response.json();
        if (data.isAuthenticated) {
          setState({ ...state, username: data.username, isLoggedIn: true });
        } else {
          setState(defaultState);
          localStorage.setItem('state', JSON.stringify(state));
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };
    if (state.isLoggedIn) verifyUser();
    localStorage.setItem('state', JSON.stringify(state));
  }, []);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export interface AppState {
  username?: string;
  profilePic?: string;
  isLoggedIn: boolean;
}

// Define the shape of your context
interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}
