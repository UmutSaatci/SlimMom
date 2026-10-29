const initialState = {
  isLoading: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loader/start":
      return {
        ...state,
        isLoading: true,
      };

    case "loader/stop":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default initialState;
