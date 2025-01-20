import { Route } from "wouter";
import Header from "./components/sections/Header";
import HomePage from "./views/HomePage";
import MatrizAccesible from "./views/MatrizAccesible";
import "./index.css";

export default function App() {
    return (
        <>
            <Header />
            <Route path="/" component={HomePage} />
            <Route path="/matriz-accesibilidad" component={MatrizAccesible} />
        </>
    )
}


