import { Router } from "express";
import { errorHandler } from "../Middlewares/error.handler";
import { JWT } from "../Middlewares/Jwt";
import { Locale } from "../Middlewares/locale";
import { RoleMiddleware } from "../Middlewares/RoleMiddleware";
import { PublicAuthRoutes } from "../Modules/Auth/auth.routs";
import { AdminUserRoutes, UserRoutes } from "../Modules/Users/user.routes";
import { GetStatics } from "./statistics.route";
import { logout } from "../Modules/Auth/logout";
import { me } from "../Modules/Auth/me";
import { AdminCategoriesRoutes, CategoriesRoutes } from "../Modules/Categories/categories.routes";
import { AdminServicesRoutes, ServicesRoutes } from "../Modules/Services/services.routes";
import { SavedListRoutes } from "../Modules/SavedList/saved_list.routes";
import { ReviewsRoutes } from "../Modules/Reviews/reviews.routes";
import { MessagesRoutes } from "../Modules/Messages/messages.routes";
import dashboardRoutes from '../Modules/Dashboard/dashboard.route';


export const applyRoutes = (): Router => {
  const router = Router();

  /**
   * -------------------------------------------------------
   * Authentication, Authorization and locale middlewares are first
   * to be registered on the Router
   * -------------------------------------------------------
   * */
  // TODO: add (authentication) and locale middlewares here

  router.use(Locale);

  /**
   * -------------------------------------------------------
   * All application routes can go here
   * -------------------------------------------------------
   * */
  const prefix = "/api/v1";

  const user_prefix = prefix + "/user"; // domain:8000/api/v1/user
  const admin_prefix = prefix + "/admin"; 
  /**
   * ------------------------------------------------------------------------------
   *  PUBLIC ROUTES
   * ------------------------------------------------------------------------------
   */
  // domain:8000/api/v1
  // insert any public middlewares above this line;

  PublicAuthRoutes(router, prefix);
  router.use(JWT);


 

  /**
   * ------------------------------------------------------------------------------
   *  USER ROUTES
   * ------------------------------------------------------------------------------
   */
  // router.use(user_prefix, RoleMiddleware(2));

 
  router.get(`${prefix}/me`, me);

  router.get(`${prefix}/logout`, logout);

  UserRoutes(router, prefix);
  ServicesRoutes(router, prefix);
  CategoriesRoutes(router, prefix);
  SavedListRoutes(router, prefix);
  ReviewsRoutes(router, prefix);
  MessagesRoutes(router, prefix);
  /**
   * ----------------------------------------------------------------------------
   *  ADMIN ROUTES
   * ----------------------------------------------------------------------------
   */
  // router.use( admin_prefix, RoleMiddleware(1));
  AdminCategoriesRoutes(router, admin_prefix);
  AdminUserRoutes(router, admin_prefix);
  AdminServicesRoutes(router, admin_prefix);
  router.get(`${admin_prefix}/statistics`, GetStatics);
   router.use(prefix+'/dashboard', dashboardRoutes);

  

  /**
   * ------------------------------------------------------------------------------
   * !!!! The Error handler is the last middleware on the router !!!!
   * ------------------------------------------------------------------------------
   * */
  router.use(errorHandler);

  return router;
};
