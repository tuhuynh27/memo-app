import React from "react";
import Loadable from "react-loadable";

import Loading from "./modules/loading/Loading";

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "./modules/home/Home"),
  loading: () => <Loading />,
  modules: ["../app/modules/home/Home"],
  webpack: () => [require.resolveWeak("../app/modules/home/Home")]
});

export default [
  {
    path: "/home",
    title: "Home",
    component: Home
  }
];
