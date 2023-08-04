import { createContext, useState } from "react";

const ModalContext = createContext()

const ModalContextProvider = ({children}) => {
    const [modalOn, setModalOn] = useState(false)

    return(
        <ModalContext.Provider value={{modalOn, setModalOn}}>
            {children}
        </ModalContext.Provider>
    )
}
export {ModalContextProvider, ModalContext}