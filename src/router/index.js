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
    component: () => import('../views/mainViews/Login.vue'),
    meta: {
      title: "登录",
    },
  },
  {
    path: '/stuCenter',
    component: () => import('../views/mainViews/StudentCenter.vue'),
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
        path: 'myCourses',
        component: () => import("../views/studentCenter/StuCourses"),
        meta: {
          title: "我的课程",
        },
      },
      {
        path: 'course/:courseId',
        component: () => import("../views/mainViews/CoursePage"),
        meta: {
          title: "课程",
        },
      },
      {
        path: 'notesPage',
        component: () => import("../views/studentCenter/noteViews/NotesPage"),
        meta: {
          title: "笔记",
        },
      },
      {
        path: 'addNote',
        component: () => import("../views/studentCenter/noteViews/AddNote"),
        meta: {
          title: "添加笔记",
        },
      },
      {
        path: 'notes/:noteId',
        component: () => import("../views/studentCenter/noteViews/NoteDetail"),
        meta: {
          title: "查看笔记",
        },
      },
      {
        path: 'editNote/:noteId',
        component: () => import("../views/studentCenter/noteViews/EditNote"),
        meta: {
          title: "修改笔记",
        },
      },
    ]
  },
  {
    path: '/teaCenter',
    component: () => import('../views/mainViews/TeacherCenter.vue'),
    meta: {
      title: "教师管理页面",
    },
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
        path: 'course/:courseId',
        component: () => import("../views/mainViews/CoursePage"),
        meta: {
          title: "课程",
        },
      },
      {
        path: 'addCourse',
        component: () => import("../views/teacherCenter/AddCourse"),
        meta: {
          title: "添加课程",
        },
      },
      {
        path: 'courseManage',
        component: () => import("../views/teacherCenter/CourseManage"),
        meta: {
          title: "课程管理",
        },
      },
      {
        path: 'editCourse/:courseId',
        component: () => import("../views/teacherCenter/EditCourse"),
        meta: {
          title: "课程编辑",
        },
      },
    ]
  },
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
