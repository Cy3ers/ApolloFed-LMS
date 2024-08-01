// ./src/middleware/authMiddleware.ts
import { roles } from "../constants/roles";

const requireRole = (requiredRole: string) => {
  return (resolve: any, parent: any, args: any, context: any, info: any) => {
    const { user } = context;
    if (!user || user.role !== requiredRole) {
      throw new Error("Not authorized.");
    }
    return resolve(parent, args, context, info);
  };
};

export default requireRole;
