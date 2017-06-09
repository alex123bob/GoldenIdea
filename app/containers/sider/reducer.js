export default (initState = {}, action) => (
  [
    {
      id: 'latest',
      name: '最新金点子',
      description: 'The latest golden idea fetched from db',
      icon: 'tag-o'
    },
    {
      id: 'profession',
      name: '业务工作',
      description: 'Golden ideas related to profession',
      icon: 'book'
    },
    {
      id: 'teambuilding',
      name: '队伍建设',
      description: 'Golden ideas relevant to teambuilding',
      icon: 'team'
    },
    {
      id: 'policeassurance',
      name: '警务保障',
      description: 'Golden ideas related to police affairs\'s assurance',
      icon: 'home'
    },
    {
      id: 'lawandrule',
      name: '法律法规',
      description: 'Golden ideas related to laws and rules',
      icon: 'copy'
    },
    {
      id: 'scientificenhancement',
      name: '科技强警',
      description: 'Golden ideas related to scientific enhancement module',
      icon: 'rocket'
    },
    {
      id: 'websiteconstruction',
      name: '网站建设',
      description: 'Golden ideas relevant to website construction',
      icon: 'global'
    },
    {
      id: 'ihaveideas',
      name: '我有金点子',
      description: 'I have ideas module',
      icon: 'file-add'
    }
  ]
);
