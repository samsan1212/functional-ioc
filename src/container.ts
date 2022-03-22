import type { Module, IoCModule } from "./types";

const modulePool = new WeakMap<Module<unknown> | Promise<Module<unknown>>, IoCModule<unknown>>();

export async function importModule<T>(dynamicIocModule: Promise<Module<T>>): Promise<IoCModule<T>> {
  const moduleInPool = modulePool.get(dynamicIocModule);
  if (moduleInPool) return moduleInPool as IoCModule<T>;

  const dynamicMod = await dynamicIocModule;

  if (dynamicMod.__init__ && !dynamicMod.__init__.loaded) {
    await dynamicMod.__init__();
    dynamicMod.__init__.loaded = true;
  }

  const { __init__, ...mod } = dynamicMod;

  modulePool.set(dynamicIocModule, mod);

  return mod;
}

/**
 * import module in sync
 *
 * please make sure the `__init__` function is also sync
 */
export function importModuleSync<T>(iocModule: Module<T>): IoCModule<T> {
  const moduleInPool = modulePool.get(iocModule);
  if (moduleInPool) return moduleInPool as IoCModule<T>;

  if (iocModule.__init__ && !iocModule.__init__.loaded) {
    iocModule.__init__();
    iocModule.__init__.loaded = true;
  }

  const { __init__, ...mod } = iocModule;

  modulePool.set(iocModule, mod);

  return mod;
}
