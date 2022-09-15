const options = [
  {
    key: 'hr',
    label: 'sidebar.hr',
    leftIcon: 'ion-ios-people',
    children: [
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
    key: 'examination',
    label: 'sidebar.examination',
    leftIcon: 'ion-clipboard',
    children: [
      {
        key: 'checkpoints',
        label: 'sidebar.checkpoint',
      },
      {
        key: 'blocks',
        label: 'sidebar.block',
      },
    ],
  },
  {
    key: 'settings',
    label: 'sidebar.setting',
    leftIcon: 'ion-ios-cog',
  },
];
export default options;
