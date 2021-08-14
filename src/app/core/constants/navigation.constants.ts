export enum NavPath {
  Auth = 'auth',
  Search = 'search',
  Profile = 'profile',
  Professional = 'professional',
  Message = 'message',
  Reviews = 'reviews',
  Service = 'service',
  Orders = 'my-orders',
  Bookmarks = 'saved-professionals',
}

export enum NavBranch {
  // auth path:
  Login = 'login',
  Registration = 'registration',

  // professional path:
  MyProfile = 'my-profile',
  MyServices = 'my-services',
  MySchedule = 'my-schedule',
  Profile = 'profile',
  Services = 'services',
  Schedule = 'schedule',

  // message path:
  Chat = 'chat',

  // service path:
  Publish = 'publish',

  // orders path:
  Inbox = 'inbox',
  Outbox = 'outbox',
}

export enum NavParams {
  MasterId = 'master-id',
}
