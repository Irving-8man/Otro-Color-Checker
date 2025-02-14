import { Route } from "wouter";
import { Toaster } from "sonner";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import HomePage from "./views/HomePage";
import MatrizAccesible from "./views/MatrizAccesible";
import "./index.css";

export default function App() {

    return (
        <div>
            <div className="min-h-screen flex flex-col justify-between">
                <div>
                    <Header />
                    <Route path="/" component={HomePage} />
                    <Route path="/matriz-accesibilidad/" component={MatrizAccesible} />
                </div>
                <Footer />
            </div>
            <Toaster />
        </div>
    )
}


