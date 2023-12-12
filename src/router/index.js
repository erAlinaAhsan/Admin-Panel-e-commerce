import { createRouter, createWebHistory } from "vue-router";

// Views Pages

import Dashboard from "../views/Dashboard.vue";
import ManageProduct from '../views/Product/ManageProduct.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import ManageCategory from '../views/Category/ManageCategory.vue'
import AddCategory from '../views/Category/AddCategory.vue'
import ManageCustomers from '../views/Customers/ManageCustomers.vue'
import ManageOrders from '../views/Orders/ManageOrders.vue'
// Component Pages
import Valert from "../views/components/alert.vue";
import Vaccrodion from "../views/components/accordion.vue";
import Vbadges from "../views/components/badges.vue";
import Vbreadcumb from "../views/components/breadcumbs.vue";
import Vbutton from "../views/components/button.vue";
import Vcard from "../views/components/card.vue";
import Vdropdown from "../views/components/dropdown.vue";
import Vmodal from "../views/components/modal.vue";
import Login from "../views/layouts/auth/Login.vue";

import ForgotPassword from "../views/layouts/auth/forgot-password.vue";

// layouts
import Blank from "../views/layouts/Blank.vue";

// error page
import Page404 from "../views/layouts/error/404.vue";
import Page500 from "../views/layouts/error/500.vue";
import PageMaintenance from "../views/layouts/error/maintenance.vue";
import Tables from "../views/tables.vue";

var appname = " - Qart Dashboard Admin Template";

const routes = [
  // Routes
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      // Redirect to /dashboard
      next('/dashboard')
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, hideNav: true },
    // meta: { title: "Dashboard " + appname },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    // meta: { title: "Dashboard " + appname },
  },

  {
    path: '/admin/product/manage',
    name: 'ManageProduct',
    component: ManageProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/product/add',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAuth: true },
  },

  //Category routes
  {
    path: '/admin/category/manage',
    name: 'ManageCategory',
    component: ManageCategory,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/customers/manage',
    name: 'ManageCustomers',
    component: ManageCustomers,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/orders/manage',
    name: 'ManageOrders',
    component: ManageOrders,
    meta: { requiresAuth: true },
  },

  // Components based Routes
  {
    path: "/component/alert",
    name: "Valert",
    component: Valert,
    meta: { title: "Alert" + appname, requiresAuth: true },
  },
  {
    path: "/component/accordion",
    name: "Vaccordion",
    component: Vaccrodion,
    meta: { title: "Accordion" + appname, requiresAuth: true },
  },
  {
    path: "/component/badge",
    name: "Vbadge",
    component: Vbadges,
    meta: { title: "Badge" + appname, requiresAuth: true },
  },
  {
    path: "/component/breadcumb",
    name: "Vbreadcumb",
    component: Vbreadcumb,
    meta: { title: "Breadcumb" + appname, requiresAuth: true },
  },
  {
    path: "/component/button",
    name: "Vbutton",
    component: Vbutton,
    meta: { title: "Button" + appname, requiresAuth: true },
  },
  {
    path: "/component/card",
    name: "Vcard",
    component: Vcard,
    meta: { title: "Card" + appname, requiresAuth: true },
  },
  {
    path: "/component/dropdown",
    name: "Vdropdown",
    component: Vdropdown,
    meta: { title: "Dropdown" + appname, requiresAuth: true, },
  },
  {
    path: "/component/modal",
    name: "Vmodal",
    component: Vmodal,
    meta: { title: "Modal" + appname, requiresAuth: true },
  },
  // layouts

  {
    path: "/Blank",
    name: "Blank Page",
    component: Blank,
    meta: { title: "Blank Page" + appname, requiresAuth: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { title: "i Forgot Password" + appname, hideNav: true, requiresAuth: true },
  },
  // layout/error
  // default page 404
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: Page404,
    meta: { title: "Upps! 404" + appname, hideNav: true, requiresAuth: true },
  },
  {
    path: "/500",
    name: "Page500",
    component: Page500,
    meta: { title: "Server internal Error" + appname, hideNav: true, requiresAuth: true },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: PageMaintenance,
    meta: {
      title: "Sorry the app has been Maintenance" + appname,
      hideNav: true,
      requiresAuth: true
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      title: "Tables" + appname,
      requiresAuth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("authToken") === null) {
      next({ name: 'Login' })
    } else {
      next();
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});

export default router;
