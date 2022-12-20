
// export const ONLINE = "ONLINE";
export const LOGGED_IN = 'LOGGED_IN';
export const START_APP = 'START_APP';
export const LOG_OUT = 'LOG_OUT';


// export const setOnline = item => ({
//     type: ONLINE,
//     payload: item
// })

export const loggedIn = data => ({
    type: LOGGED_IN,
    payload: data
})

export const logout = data => ({
    type: LOG_OUT
})

export const startApp = data => ({
    type: START_APP
})

const initialState = {
    isOnline: true,
    loginDetails: null,
    isLoading: true,
    isSignedOut: false,
    isSignedUp: false,
    noAccount: false,
    isSignedIn: false,
}



export default function reducer(state = initialState, action){
    switch (action.type) {
        // case ONLINE:
        //     return{
        //         ...state,
        //         isOnline: action.payload
        //     }
        case START_APP:
            return {
                isLoading: false
            }
        case LOGGED_IN:
            return {
                ...state,
                isSignedOut: false,
                isSignedIn: true,
                isSignedUp: true,
                isLoading: false,
                loginDetails: action.payload,
            }
        case LOG_OUT:
            return {
                ...state,
                isSignedOut: true,
                isSignedIn: false,
                isSignedUp: false,
                isLoading: true,
                noAccount: true,
                loginDetails: null,
            }
        // case REFRESH_TO_HOME:
        //     return{
        //         ...state,
        //         isSignedOut: false,
        //         isSignedIn: true,
        //         isSignedUp: true,
        //         isLoading: false,
        //     }
        // case RESTORE_TOKEN:
        //     return {
        //         ...state,
        //         loginDetails: action.payload,
        //         isLoading: false,
        //     };
        default:
            return state
    }
}

  