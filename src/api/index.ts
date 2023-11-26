import { Router, json } from "express";
import { attachAdminRoutes } from "./routes/admin";
import { attachStoreRoutes } from "./routes/store";
import { errorHandler } from "@medusajs/medusa";
import { getConfigFile, parseCorsOrigins } from "medusa-core-utils";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";
import cors from "cors";

export default (rootDirectory: string): Router | Router[] => {
  const { configModule } = getConfigFile<ConfigModule>(
    rootDirectory,
    "medusa-config"
  );
  const { projectConfig } = configModule;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  const adminCorsOptions = {
    origin: projectConfig.admin_cors.split(","),
    credentials: true,
  };
  // Set up express router
  const router = Router();

  router.use(json({ limit: "10mb" }));
  // Set up routers for store and admin endpoints
  const storeRouter = Router();
  const adminRouter = Router();

  storeRouter.use(cors(storeCorsOptions));
  adminRouter.use(cors(adminCorsOptions));

  // Attach these routers to the root routes
  router.use("/store", storeRouter);
  router.use("/admin", adminRouter);

  // Attach custom routes to these routers
  attachStoreRoutes(storeRouter);
  attachAdminRoutes(adminRouter);

  router.use(errorHandler());

  return router;
};
