export default (initState = {}, action) => {
  let state;
  switch (action.type) {
  case 'selectIdea':
    state = {...initState, activeIdea: action.activeIdea};
    break;
  default:
    state = {};
    break;
  }
  return state;
};
