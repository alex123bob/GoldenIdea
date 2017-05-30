const sidebarRuducer = (state, action) => (
    [
        {
            id: 'latest',
            defaultMessage: '最新金点子',
            description: 'The latest golden idea fetched from db',
        },
        {
            id: 'profession',
            defaultMessage: '业务工作',
            description: 'Golden ideas related to profession',
        },
        {
            id: 'teambuilding',
            defaultMessage: '队伍建设',
            description: 'Golden ideas relevant to teambuilding',
        },
        {
            id: 'policeassurance',
            defaultMessage: '警务保障',
            description: 'Golden ideas related to police affairs\'s assurance',
        },
        {
            id: 'lawandrule',
            defaultMessage: '法律法规',
            description: 'Golden ideas related to laws and rules',
        },
        {
            id: 'scientificenhancement',
            defaultMessage: '科技强警',
            description: 'Golden ideas related to scientific enhancement module',
        },
        {
            id: 'websiteconstruction',
            defaultMessage: '网站建设',
            description: 'Golden ideas relevant to website construction',
        },
    ]
);

export default sidebarRuducer;
