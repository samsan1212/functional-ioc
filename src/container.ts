import type { Module } from "./types";

export async function importModule<T>(dynamicIocModule: Promise<Module<T>>) {
  const { __init__, ...mod } = await dynamicIocModule;

  if (__init__) await __init__();

  return mod;
}

/**
 * import module in sync
 *
 * please make sure the `__init__` function is also sync
 */
export function importModuleSync<T>(iocModule: Module<T>) {
  const { __init__, ...mod } = iocModule;

  if (__init__) __init__();

  return mod;
}
