import CloudHomeRouter from "../pages/home/home";
import CloudCategoryRouter from "../pages/category/category";
import CloudProductRouter from "../pages/product/product";
import CloudInHouseRouter from "../pages/in_house/in_house";
import CloudInHouseDetailRouter from "../pages/in_house/in_house_detail";
import CloudOutHouseRouter from "../pages/out_house/out_house";
import CloudRoleRouter from "../pages/role/role";
import CloudUserRouter from "../pages/user/user";
import CloudMenuRouter from "../pages/menu/menu";



export const routeModules = [
    {
        path:'/app/home',
        component: CloudHomeRouter
    },
    {
        path:'/app/category',
        component: CloudCategoryRouter
    },
    {
        path:'/app/category',
        component: CloudProductRouter
    },
    {
        path:'/app/product',
        component: CloudInHouseRouter
    },
    {
        path:'/app/in_house',
        component: CloudInHouseRouter
    },
    {
        path:'/app/in_house_detail',
        component: CloudInHouseDetailRouter
    },
     {
        path:'/app/out_house',
        component: CloudOutHouseRouter
    },
     {
        path:'/app/role',
        component: CloudRoleRouter
    },
     {
        path:'/app/user',
        component: CloudUserRouter
    },
    {
        path:'/app/menu',
        component: CloudMenuRouter
    }
];
