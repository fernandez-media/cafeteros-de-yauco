import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Calendario from "./pages/Calendario";
import Roster from "./pages/Roster";
import Merch from "./pages/Merch";
import Boleteria from "./pages/Boleteria";
import Partidos from "./pages/Partidos";
import Noticias from "./pages/Noticias";
import Nosotros from "./pages/Nosotros";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/boleteria" element={<Boleteria />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Route>
    </Routes>
  );
}

export default App;
