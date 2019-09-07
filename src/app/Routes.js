import React from "react";
import Loadable from "react-loadable";

import Loading from "./modules/loading/Loading";

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "./modules/home/Home"),
  loading: () => <Loading />,
  modules: ["../app/modules/home/Home"],
  webpack: () => [require.resolveWeak("../app/modules/home/Home")]
});

const Create = Loadable({
  loader: () =>
    import(/* webpackChunkName: "create" */ "./modules/create/Create"),
  loading: () => <Loading />,
  modules: ["../app/modules/create/Create"],
  webpack: () => [require.resolveWeak("../app/modules/create/Create")]
});

const Edit = Loadable({
  loader: () => import(/* webpackChunkName: "edit" */ "./modules/edit/Edit"),
  loading: () => <Loading />,
  modules: ["../app/modules/edit/Edit"],
  webpack: () => [require.resolveWeak("../app/modules/edit/Edit")]
});

export default [
  {
    path: "/home",
    title: "Home",
    component: Home
  },
  {
    path: "/create",
    title: "Create",
    component: Create
  },
  {
    path: "/edit",
    title: "Edit",
    component: Edit
  }
];
