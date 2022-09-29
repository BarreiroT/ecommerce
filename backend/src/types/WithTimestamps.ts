export type WithTimestamps<T = {}> = { createdAt: Date; updatedAt: Date } & T;
