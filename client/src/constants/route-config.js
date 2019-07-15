const ROUTE_CONFIG = {
  unauth: {
    LOGIN: '/',
    SIGN_UP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },
  auth: {
    DASHBOARD: '/home',
    CREATE_PACK: '/create-pack',
    PACK_CONTAINER: '/pack/:id',
  }
};

export default ROUTE_CONFIG;