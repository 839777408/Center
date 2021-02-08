import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//导航菜单组件双击报错解决
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: "登录",
    },
  },
  {
    path: '/center',
    component: () => import('../views/Center.vue'),
    children: [
      {
        path: '',
        redirect: 'homePage'
      },
      {
        path: 'homePage',
        component: () => import("../views/mainViews/HomePage"),
        meta: {
          title: "首页",
        },
      },
      {
        path: 'notesPage',
        component: () => import("../views/mainViews/NotesPage"),
        meta: {
          title: "笔记",
        },
      },
      {
        path: 'addNote',
        component: () => import("../views/mainViews/AddNote"),
        meta: {
          title: "添加笔记",
        },
      },
      {
        path: 'notes/:noteId',
        component: () => import("../views/mainViews/NoteDetail"),
        meta: {
          title: "查看笔记",
        },
      },
      {
        path: 'editNote/:noteId',
        component: () => import("../views/mainViews/EditNote"),
        meta: {
          title: "修改笔记",
        },
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
