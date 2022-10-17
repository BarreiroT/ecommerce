export type WithTimestamps<T = unknown> = { createdAt: Date; updatedAt: Date } & T;
