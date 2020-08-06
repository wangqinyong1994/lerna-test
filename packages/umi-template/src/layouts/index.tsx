import React from 'react';
import routers from '@config/route.config';
import BasicLayout from './BasicLayout';

// layout选择
export default function (props) {
  const { pathname } = props.location;
  const findRouterTit = (router: any[], pathname: string): string => {
    let title: string = '';
    let targetRoute;
    router.forEach((route) => {
      if (pathname.indexOf(route.path) > -1 && route.routes) {
        targetRoute = route.routes;
      }
      if (pathname === route.path) {
        targetRoute = [route];
      }
    });
    if (targetRoute) {
      targetRoute.forEach((item: { path: string; title: string }) => {
        if (item.path === pathname) {
          title = item.title;
        }
      });
    }
    return title;
  };
  const title = findRouterTit(routers, pathname);
  return <BasicLayout title={title}>{props.children}</BasicLayout>;
}
