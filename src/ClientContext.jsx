import React, { createContext, useState } from 'react';

const ClientContext = createContext();

const ClientContextProvider = (props) => {
    const [domainCards, setDomainCards] = useState([]);

    return (
        <ClientContext.Provider value={[domainCards, setDomainCards]}>
            {props.children}
        </ClientContext.Provider>
    );
};

export {
    ClientContext,
    ClientContextProvider
}
