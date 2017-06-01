const initialState = {
    name: '',
};

export default (state = initialState, action) => {
    let newState = state;
    const SELECT = 'SELECT_';
    switch (action.type) {
        case `${SELECT}latest`:
            newState = {
                name: '最新金点子',
            };
            break;
        case `${SELECT}profession`:
            newState = {
                name: '业务工作',
            };
            break;
        case `${SELECT}teambuilding`:
            newState = {
                name: '队伍建设',
            };
            break;
        case `${SELECT}policeassurance`:
            newState = {
                name: '警务保障',
            };
            break
        case `${SELECT}lawandrule`:
            newState = {
                name: '法律法规',
            };
            break;
        case `${SELECT}scientificenhancement`:
            newState = {
                name: '科技强警',
            };
            break;
        case `${SELECT}websiteconstruction`:
            newState = {
                name: '网站建设',
            };
            break;
        case `${SELECT}ihaveideas`:
            newState = {
                name: '我有金点子',
            };
            break;
        default:
            break;
    }

    return newState;
};
