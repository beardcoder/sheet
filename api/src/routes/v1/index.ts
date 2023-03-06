import { Router } from "express";
import groupsRouter from "./groups";
import usersRouter from "./users";

const apiRouter = Router();
apiRouter.use("/users", usersRouter);
apiRouter.use("/groups", groupsRouter);

export default apiRouter;
