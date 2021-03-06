export default (initState = {}, action) => {
  let state;
  switch (action.type) {
  case 'selectMenuItem':
    state = {...initState, activeMenuItem: action.activeMenuItem};
    break;
  default:
    state = {};
    break;
  }
  return state;
};
