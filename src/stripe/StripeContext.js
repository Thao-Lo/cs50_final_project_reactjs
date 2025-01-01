import { createContext, useContext, useState } from "react";


const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    console.log("Payment Intent:  " , paymentIntentId);
    console.log("clientSecrect: " + clientSecret)

   
    return (
        <StripeContext.Provider value={{ paymentIntentId, setPaymentIntentId, clientSecret, setClientSecret }}>          
                {children}            
        </StripeContext.Provider>
    )

}

export const useStripeContext = () => useContext(StripeContext);  