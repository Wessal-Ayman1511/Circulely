export const isAuthorized = (roles, context) => {
  if (!roles.includes(context.authUser.role)) {
    throw new Error("You aren't allowed!!!", { cause: 401 });
  }
};
