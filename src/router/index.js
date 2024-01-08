import Login from "@/page/Login";
import Home from "@/page/Home";
import NotFound from "@/page/NotFound";
import UnauthorizedAccess from "@/page/UnauthorizedAccess";
import ConstructionDetail from "@/page/ConstructionDetail";

const routers = [
  {
    path: "/zycg/home",
    name: "首页",
    component: <Home />,
    exact: true,
  },
  {
    path: "/zycg/construction/detail/:id",
    name: "工地详情页",
    component: <ConstructionDetail />,
    exact: true,
  },
  {
    path: "/zycg/UnauthorizedAccess",
    name: "UnauthorizedAccess",
    component: <UnauthorizedAccess />,
    exact: true,
  },
  {
    path: "*",
    name: "NotFound",
    component: <NotFound />,
    exact: true,
  },
];

const loginRoute = {
  path: "/zycg/login",
  exact: true,
  key: "login",
  component: <Login />,
};

export { routers, loginRoute };
