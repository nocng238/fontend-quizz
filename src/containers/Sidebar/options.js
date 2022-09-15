const options = [
  {
    key: 'hr',
    label: 'sidebar.hr',
    leftIcon: 'ion-ios-people',
    children: [
      {
        key: 'user',
        label: 'sidebar.user',
      },
      {
        key: 'campaign',
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
        key: 'checkpoint',
        label: 'sidebar.checkpoint',
      },
      {
        key: 'block',
        label: 'sidebar.block',
      },
    ],
  },
  {
    key: 'setting',
    label: 'sidebar.setting',
    leftIcon: 'ion-ios-cog',
  },
];
export default options;
