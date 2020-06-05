const INITIAL_STATE = {
    modal: false,
}

const otpModal = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'SET_OTP_MODAL_TRUE': return {
            ...state,
            modal: true,
        }

        case 'SET_OTP_MODAL_FALSE': return {
            ...state,
            modal: false,
        }

        default: return state;
    }
}

export default otpModal;