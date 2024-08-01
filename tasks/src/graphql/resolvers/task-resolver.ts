// ./src/tasks/task-resolvers.ts
import Task from "../../models/Task";
import { PubSub } from "graphql-subscriptions";
import { roles } from "../../constants/roles";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    tasks: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated.");
      return await Task.findAll({ where: { userId: user.id } });
    }
  },
  Mutation: {
    createTask: async (_: any, { title, description, status, priority }: any, { user }: any) => {
      if (!user || user.role !== roles.ADMIN) throw new Error("Not authorized.");
      const newTask = await Task.create({ title, description, status, priority, userId: user.id });
      pubsub.publish("TASK_ADDED", {
        taskAdded: {
          message: `New task added: ${title}`
        }
      });
      return newTask;
    },
    updateTask: async (_: any, { id, title, description, status, priority }: any, { user }: any) => {
      if (!user || user.role !== roles.ADMIN) throw new Error("Not authorized.");

      const task = await Task.findByPk(id);
      if (!task) throw new Error("Task not found.");
      if (task.userId !== user.id) throw new Error("Unauthorized access to task.");

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (priority !== undefined) task.priority = priority;

      await task.save();
      return task;
    },
    deleteTask: async (_: any, { id }: any, { user }: any) => {
      if (!user || user.role !== roles.ADMIN) throw new Error("Not authorized.");

      const task = await Task.findByPk(id);
      if (!task) throw new Error("Task not found.");
      if (task.userId !== user.id) throw new Error("Unauthorized access to task.");

      await task.destroy();
      return true;
    }
  },
  Subscription: {
    taskAdded: {
      subscribe: () => pubsub.asyncIterator(["TASK_ADDED"])
    }
  }
};

export default resolvers;
