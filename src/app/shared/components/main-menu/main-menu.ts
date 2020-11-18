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
        title: 'template.favorites',
        icon: 'heart-outline',
        link: '/favorites',
        userOnly: true
    },
    {
        title: 'template.my-orders',
        icon: 'calendar-outline',
        link: '/orders',
        userOnly: true
    },
    {
        title: 'template.download',
        icon: 'cloud-download-outline',
        link: '/app',
        desktopOnly: true
    },
    {
        title: 'template.sign-in',
        icon: 'log-in-outline',
        link: '/auth/login',
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
        title: 'template.preferences',
        icon: 'settings-outline',
        link: '/preferences',
        userOnly: true
    },
    {
        title: 'template.miscellaneous',
        isHeader: true
    },
    {
        title: 'template.service',
        icon: 'medal-outline',
        link: '/service/publish/step-one'
    },
    {
        title: 'template.support',
        icon: 'help-circle-outline',
        link: '/support'
    },
    {
        title: 'template.logout',
        icon: 'log-out-outline',
        link: '/auth/login',
        params: { logout: '' },
        userOnly: true
    }
];
