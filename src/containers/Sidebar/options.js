const options = [
  [
    {
      key: 'hr',
      label: 'sidebar.management',
      leftIcon: 'ion-ios-people',
      items: [
        {
          key: 'users',
          label: 'sidebar.user',
        },
        {
          key: 'assignments',
          label: 'sidebar.assignment',
        },
      ],
    },
    {
      key: 'settings',
      label: 'sidebar.settings',
      leftIcon: 'ion-ios-cog',
    },
  ],
  [
    {
      key: 'teacher',
      label: 'sidebar.teacher',
      leftIcon: 'ion-ios-people',
      items: [
        {
          key: 'users',
          label: 'sidebar.user',
        },
        {
          key: 'campaigns',
          label: 'sidebar.campaign',
        },
      ],
    },
    {
      key: 'teacher settings',
      label: 'sidebar.settings',
      leftIcon: 'ion-ios-cog',
    },
  ],
];

export default options;
