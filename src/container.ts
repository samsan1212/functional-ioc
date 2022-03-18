import type { Module } from "./types";

export async function importModule<T>(dynamicIocModule: Promise<Module<T>>) {
  const dynamicMod = await dynamicIocModule;

  if (dynamicMod.__init__) await dynamicMod.__init__();

  const { __init__, ...mod } = dynamicMod;

  return mod;
}

/**
 * import module in sync
 *
 * please make sure the `__init__` function is also sync
 */
export function importModuleSync<T>(iocModule: Module<T>) {
  if (iocModule.__init__) iocModule.__init__();

  const { __init__, ...mod } = iocModule;

  return mod;
}
