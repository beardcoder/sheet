import { PrismaClient, Role, User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
const prisma = new PrismaClient();

const verifyGroupAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const membership = await prisma.membership.findFirst({
      where: {
        groupId: Number(id),
        userId: Number(user.id),
        role: Role.ADMIN,
      },
    });
    console.log(membership);
    if (membership == null) return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }

  next();
};

const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { userId: user?.id },
        },
      },
      include: {
        members: {
          include: {
            user: { select: { email: true, avatar: true, name: true } },
          },
        },
      },
    });

    res.status(201).json(groups);
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
};

const getGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const group = await prisma.group.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        members: {
          include: {
            user: { select: { email: true, avatar: true, name: true } },
          },
        },
      },
    });

    res.status(200).json(group);
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
};

const addGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const { name } = req.body;

    const group = await prisma.group.create({
      data: {
        name,
        members: {
          create: {
            user: {
              connect: { id: user?.id },
            },
            role: Role.ADMIN,
            assignedAt: new Date(),
          },
        },
      },
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { group } = req as any;

    const updatedGroup = await prisma.group.update({
      where: { id: group.id },
      data: group,
    });

    res.status(204).json(updatedGroup);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { group } = req as any;

    const updatedGroup = await prisma.group.delete({
      where: { id: group.id },
    });

    res.status(204).json(updatedGroup);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

const router = Router();
router.get("/", passport.authenticate("jwt", { session: false }), getAllGroups);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyGroupAdmin,
  getGroup
);
router.post("/", passport.authenticate("jwt", { session: false }), addGroup);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyGroupAdmin,
  updateGroup
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyGroupAdmin,
  deleteGroup
);

export default router;
