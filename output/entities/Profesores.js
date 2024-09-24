"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profesores = void 0;
const typeorm_1 = require("typeorm");
const Departamentos_1 = require("./Departamentos");
const Usuario_1 = require("./Usuario");
const SeccionesGrado_1 = require("./SeccionesGrado");
const Horarios_1 = require("./Horarios");
let Profesores = class Profesores {
};
exports.Profesores = Profesores;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Profesor" }),
    __metadata("design:type", Number)
], Profesores.prototype, "idProfesor", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_seccion" }),
    __metadata("design:type", Number)
], Profesores.prototype, "idSeccion", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Materia" }),
    __metadata("design:type", Number)
], Profesores.prototype, "idMateria", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Horario" }),
    __metadata("design:type", Number)
], Profesores.prototype, "idHorario", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Usuario" }),
    __metadata("design:type", Number)
], Profesores.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Departamentos_1.Departamentos, (departamentos) => departamentos.idProfesor2),
    __metadata("design:type", Array)
], Profesores.prototype, "departamentos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.profesores, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Usuario", referencedColumnName: "idUsuario" }]),
    __metadata("design:type", Usuario_1.Usuario)
], Profesores.prototype, "idUsuario2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SeccionesGrado_1.SeccionesGrado, (seccionesGrado) => seccionesGrado.profesores, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "id_seccion", referencedColumnName: "idSeccion" }]),
    __metadata("design:type", SeccionesGrado_1.SeccionesGrado)
], Profesores.prototype, "idSeccion2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Horarios_1.Horarios, (horarios) => horarios.profesores, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Horario", referencedColumnName: "idHorario" }]),
    __metadata("design:type", Horarios_1.Horarios)
], Profesores.prototype, "idHorario2", void 0);
exports.Profesores = Profesores = __decorate([
    (0, typeorm_1.Index)("id_Usuario", ["idUsuario"], {}),
    (0, typeorm_1.Index)("id_seccion", ["idSeccion"], {}),
    (0, typeorm_1.Index)("id_Horario", ["idHorario"], {}),
    (0, typeorm_1.Entity)("profesores", { schema: "simadlsc" })
], Profesores);
//# sourceMappingURL=Profesores.js.map