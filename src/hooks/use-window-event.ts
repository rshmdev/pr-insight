/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

export function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(
      type as keyof WindowEventMap,
      listener as (
        this: Window,
        ev: WindowEventMap[keyof WindowEventMap],
      ) => any,
      options,
    )
    return () =>
      window.removeEventListener(
        type as keyof WindowEventMap,
        listener as (
          this: Window,
          ev: WindowEventMap[keyof WindowEventMap],
        ) => any,
        options,
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, listener])
}
