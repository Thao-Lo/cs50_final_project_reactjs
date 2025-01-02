import { Elements, useStripe } from "@stripe/react-stripe-js";
import { useStripeContext } from "../StripeContext";
import { loadStripe } from "@stripe/stripe-js";

//https://docs.stripe.com/payments/quickstart
//https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=elements#web-test-the-integration

const stripePromise = loadStripe("pk_test_51OmJuDLHXp4eUWrCN9iiv9WuRgNTqeejQrRBUvlngd1jfM1L0AosFldH4kEmaZ4lrAePBWSHJugeybLIo9lpvbxO009poil13K");

const PaymentLayout =({ children }) => {
    const { clientSecret } = useStripeContext();   
    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    if (!clientSecret) {
        return <div>Loading payment details...</div>;
    }
    return (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            {children}
        </Elements>
    )
}
export default PaymentLayout;
//4242 4242 4242 4242