import { articleActions } from '../actions/types'


const initialState = {
    articles: []
}

function articleReducer(state=initialState, action){
    switch(action.type){
        case articleActions.GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case articleActions.SEARCH_ARTCILES:
            return {
                ...state,
                articles: action.payload
            }

        default: 
            return state;
    }
}

export default articleReducer;