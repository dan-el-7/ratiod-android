"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reports the current route to the Android shell (PortalProbe.setRoute) on
 * every navigation so the system back gesture can decide between the in-app
 * predictive animation to /dashboard and the default back-to-home behavior
 * on the dashboard itself. No-ops outside the Android app.
 */
export default function NativeBackSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    try {
      const plugins = (window as any)?.Capacitor?.Plugins;
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--theme-bg")
        .trim();
      const result = plugins?.PortalProbe?.setRoute?.({ path: pathname, bg });
      result?.catch?.(() => {});
    } catch {
      // not running inside Capacitor — nothing to sync
    }
  }, [pathname]);

  return null;
}
