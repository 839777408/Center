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
        path: 'myCourses',
        component: () => import("../components/courseComponents/StuCourses"),
        meta: {
          title: "我的课程",
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
        component: () => import("../views/noteViews/AddNote"),
        meta: {
          title: "添加笔记",
        },
      },
      {
        path: 'notes/:noteId',
        component: () => import("../views/noteViews/NoteDetail"),
        meta: {
          title: "查看笔记",
        },
      },
      {
        path: 'editNote/:noteId',
        component: () => import("../views/noteViews/EditNote"),
        meta: {
          title: "修改笔记",
        },
      },
      {
        path: 'course/:courseId',
        component: () => import("../views/mainViews/CoursePage"),
        meta: {
          title: "课程",
        },
      }
    ]
  },
  {
    path: '/teacherCenter',
    component: () => import('../views/TeacherCenter.vue'),
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
        path: 'myCourses',
        component: () => import("../components/courseComponents/TeaCourses"),
        meta: {
          title: "我的课程",
        },
      },
      {
        path: 'addCourse',
        component: () => import("../components/courseComponents/AddCourse"),
        meta: {
          title: "添加课程",
        },
      },
      {
        path: 'courseManage',
        component: () => import("../components/courseComponents/CourseManage"),
        meta: {
          title: "课程管理",
        },
      },
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
