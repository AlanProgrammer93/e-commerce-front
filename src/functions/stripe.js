import axios from 'axios';

export const createPayloadIntent = (authtoken, coupon) => 
    axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,
        { couponApplied: coupon },
        {
            headers: {
                authtoken,
            }
        }
    );
