import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';

export interface MainMenuItem {
  title: string;
  icon?: string;
  link?: string;
  params?: object;
  isHeader?: boolean;

  // visibility settings:
  guestOnly?: boolean;
  userOnly?: boolean;
  clientOnly?: boolean;
  masterOnly?: boolean;
  desktopOnly?: boolean;
}

export const mainMenuItems: MainMenuItem[] = [
  {
    title: 'main-menu.account-title',
    isHeader: true,
  },
  {
    title: 'main-menu.log-in',
    icon: 'log-in-outline',
    link: `/${NavPath.Auth}/${NavBranch.Login}`,
    guestOnly: true,
  },
  {
    title: 'main-menu.sign-up',
    icon: 'create-outline',
    link: `/${NavPath.Auth}/${NavBranch.Registration}`,
    guestOnly: true,
  },
  {
    title: 'main-menu.my-account',
    icon: 'person-circle-outline',
    link: `/${NavPath.Profile}`,
    userOnly: true,
  },
  {
    title: 'main-menu.log-out',
    icon: 'log-out-outline',
    link: '/auth/login',
    params: { logout: '' },
    userOnly: true,
  },

  {
    title: 'main-menu.professional-title',
    isHeader: true,
    masterOnly: true,
  },
  {
    title: 'main-menu.add-service',
    icon: 'add-circle-outline',
    link: `/${NavPath.Service}/${NavBranch.Publish}`,
    masterOnly: true,
  },
  {
    title: 'main-menu.service-list',
    icon: 'list-outline',
    link: `/${NavPath.Professional}/${NavBranch.MyServices}`,
    masterOnly: true,
  },
  {
    title: 'main-menu.received-orders',
    icon: 'mail-unread-outline',
    link: `/${NavPath.Orders}/${NavBranch.Inbox}`,
    masterOnly: true,
  },
  {
    title: 'main-menu.professional-profile',
    icon: 'settings-outline',
    link: `/${NavPath.Professional}/${NavBranch.MyProfile}`,
    masterOnly: true,
  },
  {
    title: 'main-menu.professional-schedule',
    icon: 'calendar-outline',
    link: `/${NavPath.Professional}/${NavBranch.MySchedule}`,
    masterOnly: true,
  },

  {
    title: 'main-menu.orders-title',
    isHeader: true,
  },
  {
    title: 'main-menu.search',
    icon: 'search-outline',
    link: `/${NavPath.Search}`,
  },
  {
    title: 'main-menu.bookmarks',
    icon: 'bookmarks-outline',
    link: `/${NavPath.Bookmarks}`,
    userOnly: true,
  },
  {
    title: 'main-menu.sent-orders',
    icon: 'list-outline',
    link: `/${NavPath.Orders}/${NavBranch.Outbox}`,
    userOnly: true,
  },

  {
    title: 'main-menu.become-professional-title',
    isHeader: true,
    clientOnly: true,
  },
  {
    title: 'main-menu.become-professional',
    icon: 'medal-outline',
    link: `/${NavPath.Service}/${NavBranch.Publish}`,
    clientOnly: true,
  },
  {
    title: 'main-menu.become-professional-title',
    isHeader: true,
    guestOnly: true,
  },
  {
    title: 'main-menu.become-professional',
    icon: 'medal-outline',
    link: `/${NavPath.Service}/${NavBranch.Publish}`,
    guestOnly: true,
  },
];
