import dbConnection from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.contoller.js";
import postRouter from "./modules/post/post.controller.js";
import adminRouter from "./modules/admin/admin.controller.js";
import chatRouter from "./modules/chat/chat.controller.js"
import { globalError } from "./utils/error/global-error.js";
import { notFound } from "./utils/error/not-found.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./app.schema.js";
import { GraphQLError } from "graphql";
const bootStrap = async (app, express) => {
  app.use(
    rateLimit({
      windowMs: 3 * 60 * 1000, // number of requests in given period
      limit: 50,
      handler: (req, res, next, options) => {
        return next(new Error(options.message, { cause: options.statusCode }));
      },
      legacyHeaders: false, // disable the headers of rate limit
    }),
  );

  app.all(
    "/graphql",
    createHandler({
      schema,
      context: (req) => {
        const { authorization } = req.headers;
        return { authorization };
      },
      formatError: (error) => {
        return new GraphQLError(error.originalError?.message, {
          extensions: {
            success: false,
            statusCode: error.originalError?.cause || 500,
            stack: error.originalError?.stack,
          },
        });
      },
    }),
  );
  app.use(cors("*"));
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  await dbConnection();
  app.get("/", (req, res) => {
    return res.json({ message: "welcome" });
  });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/admin", adminRouter);
  app.use("/chat", chatRouter)

  app.all(/.*/, notFound);

  app.use(globalError);
};
export default bootStrap;
