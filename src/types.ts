export type Module<T> = T & { __init__?: () => Promise<void> };
export type IoCModule<T> = Omit<Module<T>, "__init__">;
