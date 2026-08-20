import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SkeletonLoader from "./components/SkeletonLoader";
import Index from "./pages/Index";

const Calendario = lazy(() => import("./pages/Calendario"));
const Roster = lazy(() => import("./pages/Roster"));
const Merch = lazy(() => import("./pages/Merch"));
const Boleteria = lazy(() => import("./pages/Boleteria"));
const Partidos = lazy(() => import("./pages/Partidos"));
const Noticias = lazy(() => import("./pages/Noticias"));

function App() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/boleteria" element={<Boleteria />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/noticias" element={<Noticias />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
