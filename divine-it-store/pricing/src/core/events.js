const ADD_TO_CART_EVENT = 'pricing:addToCart'
const LOGIN_REQUIRED = 'pricing:loginRequired'
const EMAIL_VERIFICATION_REQUIRED = 'pricing:emailVerificationRequired'

const dispatchEvent = (e) => {
    return () => {
         let event = new Event(e);
         document.dispatchEvent(event)
    }
}

const dispatchAddToCart = dispatchEvent(ADD_TO_CART_EVENT);
const dispatchLoginRequired = dispatchEvent(LOGIN_REQUIRED);
const dispatchEmailVerificationRequired = dispatchEvent(EMAIL_VERIFICATION_REQUIRED);

const authGaurd = (user, callBack) => {
    if (!user.authenticated) {
        dispatchLoginRequired()
    } else if(!user.emailVerified) {
        dispatchEmailVerificationRequired()
    } else {
        callBack()
    }
}

export default {
    dispatchAddToCart,
    dispatchLoginRequired,
    dispatchEmailVerificationRequired,
    ADD_TO_CART_EVENT,
    LOGIN_REQUIRED,
    EMAIL_VERIFICATION_REQUIRED,
    authGaurd
}