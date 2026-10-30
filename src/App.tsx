import { lazy, Suspense, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SkeletonLoader from "./components/SkeletonLoader";
import Index from "./pages/Index";

// If a page file fails to load (stale version after an update/rebuild),
// retry once, then reload the page once instead of showing a blank screen.
const RELOAD_KEY = "lazy-reload-attempted";
function lazyWithRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const mod = await factory();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (err) {
      try {
        await new Promise((r) => setTimeout(r, 500));
        return await factory();
      } catch {
        if (!sessionStorage.getItem(RELOAD_KEY)) {
          sessionStorage.setItem(RELOAD_KEY, "1");
          window.location.reload();
          return new Promise<{ default: T }>(() => {});
        }
        throw err;
      }
    }
  });
}

const Calendario = lazyWithRetry(() => import("./pages/Calendario"));
const Roster = lazyWithRetry(() => import("./pages/Roster"));
const Merch = lazyWithRetry(() => import("./pages/Merch"));
const Partidos = lazyWithRetry(() => import("./pages/Partidos"));
const Noticias = lazyWithRetry(() => import("./pages/Noticias"));
const Boleteria = lazyWithRetry(() => import("./pages/Boleteria"));

function App() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/boleteria" element={<Boleteria />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
