export type WithTimestamps<T = Record<string, unknown>> = { createdAt: Date; updatedAt: Date } & T;
