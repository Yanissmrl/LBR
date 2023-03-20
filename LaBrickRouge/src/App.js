import HeaderAccueil from "./components/Accueil/header";
import Evenements from "./components/Accueil/Evenements";
import Carte from "./components/Accueil/carte";
import Presentation from "./components/Accueil/presentation";
import Nav from "./components/nav";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <div className="page">
        <Nav></Nav>
        <HeaderAccueil></HeaderAccueil>
        <Evenements></Evenements>
        <Carte></Carte>
        <Presentation></Presentation>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
