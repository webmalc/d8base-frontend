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
        title: 'template.menu',
        isHeader: true
    },
    {
        title: 'template.search',
        icon: 'search',
        link: '/search'
    },
    {
        title: 'template.my-orders',
        icon: 'calendar-outline',
        link: '/my-orders/inbox',
        masterOnly: true
    },
    {
        title: 'template.my-orders',
        icon: 'calendar-outline',
        link: '/my-orders/outbox',
        clientOnly: true
    },
    {
        title: 'template.sign-in',
        icon: 'log-in-outline',
        link: '/auth/login',
        guestOnly: true
    },
    {
        title: 'template.sign-up',
        icon: 'reader-outline',
        link: '/auth/registration',
        guestOnly: true
    },
    {
        title: 'template.my-profile',
        isHeader: true,
        userOnly: true
    },
    {
        title: 'template.profile',
        icon: 'person-circle-outline',
        link: '/profile',
        userOnly: true
    },
    {
        title: 'template.master-profile',
        icon: 'construct-outline',
        link: '/professional',
        masterOnly: true
    },
    {
        title: 'template.miscellaneous',
        isHeader: true
    },
    {
        title: 'template.service',
        icon: 'medal-outline',
        link: '/service/publish'
    },
    {
        title: 'template.logout',
        icon: 'log-out-outline',
        link: '/auth/login',
        params: { logout: '' },
        userOnly: true
    }
];
