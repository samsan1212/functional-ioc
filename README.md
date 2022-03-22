# functional-iac

WIP

## Use with RxJS

```typescript
import { importModule, importModuleSync } from "functional-ioc";
import { defer, of } from "rxjs";

import type { Module } from "functional-ioc";

export function getModuleObservable<T>(promiseMod: Promise<Module<T>>) {
  return defer(() => importModule(promiseMod));
}

export function getModuleSyncObservable<T>(mod: Module<T>) {
  return of(importModuleSync(mod));
}
```

## Use with React hook

```typescript
import { useEffect, useState } from "react";
import { of } from "rxjs";
import { filter, mergeMap, catchError } from "rxjs/operators";

import type { IoCModule, Module } from "functional-ioc";

export function useModule<T>(promiseMod: Promise<Module<T>>) {
  const [mod, setMod] = useState<IoCModule<T> | null>(null);

  useEffect(() => {
    if (mod) return;

    const subscription = of(mod)
      .pipe(
        filter((_mod) => !_mod),
        mergeMap(() =>
          // use with the `getModuleObservable` defined above
          getModuleObservable(promiseMod).pipe(
            catchError((err) => {
              console.error("useModule", err);
              return of(null);
            })
          )
        )
      )
      .subscribe((result) => {
        setMod(result);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [promiseMod, mod]);

  return mod;
}
```
