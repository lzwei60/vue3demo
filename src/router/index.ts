import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/computedView',
    name: 'computedView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ComputedView.vue')
  },
  {
    path: '/refView',
    name: 'refView',
    component: () => import('../views/refView.vue')
  },
  {
    path: '/reactive',
    name: 'reactive',
    component: () => import('../views/Reactive.vue')
  },
  {
    path: '/readonlyView',
    name: 'readonlyView',
    component: () => import('../views/ReadonlyView.vue')
  },
  {
    path: '/watchView',
    name: 'watchView',
    component: () => import('../views/WatchView.vue')
  },
  {
    path: '/watchEffectView',
    name: 'watchEffectView',
    component: () => import('../views/WatchEffectView.vue')
  },
  {
    path: '/providerView',
    name: 'providerView',
    component: () => import('../views/providerView.vue')
  },
  {
    path: '/definComponentView',
    name: 'definComponentView',
    component: () => import('../views/definComponentView.vue')
  },
  {
    path: '/templateRefsView',
    name: 'templateRefsView',
    component: () => import('../views/templateRefsView.vue')
  },
  {
    path: '/correspondenceView',
    name: 'correspondenceView',
    component: () => import('../views/correspondenceView.vue'),
    children: [
      {
        path: '/correspondenceView/propsView',
        name: 'propsView',
        component: () => import('../views/correspondence/propsView.vue')
      },
      {
        path: '/correspondenceView/emitView',
        name: 'emitView',
        component: () => import('../views/correspondence/emitView.vue')
      },
      {
        path: '/correspondenceView/refsView',
        name: 'refsView',
        component: () => import('../views/correspondence/refsView.vue')
      }
    ]
  },
  {
    path: '/TSdomeView',
    name: 'TSdomeView',
    component: () => import('../views/TSdomeView.vue'),
    children: [
      {
        path: '/TsdomeView/tsBase',
        name: 'tsBase',
        component: () => import('../views/ts-dome/tsBase.vue'),
      },
      {
        path: '/TsdomeView/funBase',
        name: 'funBase',
        component: () => import('../views/ts-dome/funBase.vue'),
      },
      {
        path: '/TsdomeView/interface',
        name: 'interface',
        component: () => import('../views/ts-dome/interface.vue'),
      },
      {
        path: '/TsdomeView/classView',
        name: 'classView',
        component: () => import('../views/ts-dome/classView.vue'),
      },
      {
        path: '/TsdomeView/interfaceAndClass',
        name: 'interfaceAndClass',
        component: () => import('../views/ts-dome/interfaceAndClass.vue'),
      },
      {
        path: '/TsdomeView/enumView',
        name: 'enumView',
        component: () => import('../views/ts-dome/enumView.vue'),
      },
      {
        path: '/TsdomeView/typeInference',
        name: 'typeInference',
        component: () => import('../views/ts-dome/typeInference.vue'),
      },
      {
        path: '/TsdomeView/builtInObject',
        name: 'builtInObject',
        component: () => import('../views/ts-dome/builtInObject.vue'),
      }
    ]
  },
  {
    path: '/TSAdvancedView',
    name: 'TSAdvancedView',
    component: () => import('../views/TSAdvancedView.vue'),
    children: [
      {
        path: '/TSAdvancedView/highType',
        name: 'highType',
        component: () => import('../views/ts-advanced/highTypeView.vue')
      },{
        path: '/TSAdvancedView/fanxingView',
        name: 'fanxingView',
        component: () => import('../views/ts-advanced/fanxingView.vue')
      },{
        path: '/TSAdvancedView/highType2',
        name: 'highType2',
        component: () => import('../views/ts-advanced/highTypeSView.vue')
      },{
        path: '/TSAdvancedView/tsDeclareFileView',
        name: 'tsDeclareFileView',
        component: () => import('../views/ts-advanced/tsDeclareFileView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
