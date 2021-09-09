import React, {useState, useContext} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    return <AppContext.Provider value={{isLoading, setIsLoading}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppProvider};