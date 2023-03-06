import { PrismaClient, User } from "@prisma/client";
import { hash } from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { sign, verify } from "jsonwebtoken";
import multer from "multer";
import passport from "passport";
import sharp from "sharp";
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

const generateTokens = (data: any) => {
  const accessToken = sign(data, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const refreshToken = sign({ ...data }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const prisma = new PrismaClient();

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = generateTokens({ sub: user.id });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while registering.");
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: User, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const { accessToken, refreshToken } = generateTokens({ sub: user.id });

      res.json({ accessToken, refreshToken });
    }
  )(req, res, next);
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as any;
    const newUserData = req.body;
    if (req.file) {
      await sharp(req.file!.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${user.id}-avatar.jpeg`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(user.id) },
      data: {
        email: newUserData.email,
        name: newUserData.name,
        avatar: req.file
          ? `/img/users/${user.id}-avatar.jpeg?${new Date().getSeconds()}`
          : newUserData.avatar,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    console.error(error);
    res.json({ error: error });
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: currentRefreshToken } = req.body;
    if (currentRefreshToken == null) return res.sendStatus(401);

    const decoded = verify(currentRefreshToken, process.env.JWT_SECRET!);

    const user = await prisma.user.findFirst({
      where: { id: Number(decoded.sub) },
    });

    if (!user) return res.sendStatus(401);
    const { accessToken, refreshToken } = generateTokens({
      sub: user.id,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", passport.authenticate("jwt", { session: false }), me);
router.post("/refresh-token", refreshToken);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar[]"),
  update
);

export default router;
