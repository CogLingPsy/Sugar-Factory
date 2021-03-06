
export default [
  {
    path: '/',
    component: () => import('../layouts/default'),
    children: [
      {
        path: '',
        name: 'modeSelection',
        component: () => import('../pages/ModeSelection')
      }
    ]
  },
  {
    path: '/sugar-factory',
    component: () => import('../layouts/default'),
    children: [
      {
        path: '',
        name: 'sugarFactory',
        component: () => import('../pages/SugarFactory')
      }
    ]
  },
  {
    path: '/results',
    component: () => import('../layouts/default'),
    children: [
      {
        path: ':id',
        name: 'result',
        component: () => import('../pages/Result')
      },
      {
        path: '',
        name: 'results',
        component: () => import('../pages/ResultsList')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../layouts/default'),
    children: [
      { path: '', component: () => import('../pages/Login') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('../pages/404')
  }
]
