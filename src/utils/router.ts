import type { IRuta } from "@/interfaces";

const arrayRutas: IRuta[] = [{
    name: "Inicio",
    icon: "home",
    nombre: "Inicio",
    url: "/",
    permissions: "public",
}, {
    name: "pensum-student",
    icon: "book",
    nombre: "Pensum",
    url: "/pensum/student",
    permissions: 'student.pensum.view',
}, {
    name: "notes-docente",
    icon: "book",
    nombre: "Materias",
    url: "/notes/docente",
    permissions: 'docente.notes.view',
}];

export default arrayRutas;
