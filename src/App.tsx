import { Route, Switch } from "wouter";
import { Toaster } from "sonner";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import HomePage from "./views/HomePage";
import MatrizAccesible from "./views/MatrizAccesible";
import NotFound from "./views/NotFound";
import "./index.css";

export default function App() {

    return (
        <div>
            <div className="min-h-screen flex flex-col justify-between">
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={HomePage} />
                        <Route path="/matriz-accesibilidad/" component={MatrizAccesible} />
                        <Route component={NotFound} /> {/* Captura rutas no existentes */}
                    </Switch>
                </div>
                <Footer />
            </div>
            <Toaster />
        </div>
    )
}


