/* eslint-disable react-refresh/only-export-components */

export default function (state, action) {
    switch (action.type) {
        case "InputChange":
          return {
            ...state, pokemonName: action.payload
          }
         case "setError": 
          return {
            ...state, isError: action.payload
          }  
          case "setQueryString":
            return {
              ...state, queryString: action.payload
            }
           case "setSpriteSrc":
            return {
              ...state, spriteSrc: action.payload
            }
            case "setOutputName" :
              return {
                ...state, outputName: action.payload
              }
        default: 
        return state
      }
  }
  