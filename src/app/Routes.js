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

export default [
  {
    path: "/home",
    title: "Home",
    component: Home
  },
  {
    path: "/create",
    title: "Create",
    component: Home
  }
];
