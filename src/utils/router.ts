import type { IRuta } from "@/interfaces";

const arrayRutas: IRuta[] = [{
    name: "Inicio",
    icon: "home",
    nombre: "Inicio",
    url: "/",
    permissions: [],
}, {
    name: "pensum-student",
    icon: "book",
    nombre: "Pensum",
    url: "/pensum/student",
    permissions: [],
}];

export default arrayRutas;