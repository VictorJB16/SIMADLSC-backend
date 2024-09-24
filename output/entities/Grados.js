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
exports.Grados = void 0;
const typeorm_1 = require("typeorm");
const Estudiantes_1 = require("./Estudiantes");
const Horarios_1 = require("./Horarios");
const Asistencia_1 = require("./Asistencia");
const Matricula_1 = require("./Matricula");
let Grados = class Grados {
};
exports.Grados = Grados;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_grado" }),
    __metadata("design:type", Number)
], Grados.prototype, "idGrado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_grado", length: 100 }),
    __metadata("design:type", String)
], Grados.prototype, "nombreGrado", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "descripcion_Grado", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Grados.prototype, "descripcionGrado", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_horario" }),
    __metadata("design:type", Number)
], Grados.prototype, "idHorario", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_asistencia" }),
    __metadata("design:type", Number)
], Grados.prototype, "idAsistencia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Estudiantes_1.Estudiantes, (estudiantes) => estudiantes.idGrado2),
    __metadata("design:type", Array)
], Grados.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Horarios_1.Horarios, (horarios) => horarios.grados, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_horario", referencedColumnName: "idHorario" }]),
    __metadata("design:type", Horarios_1.Horarios)
], Grados.prototype, "idHorario2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Asistencia_1.Asistencia, (asistencia) => asistencia.grados, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_asistencia", referencedColumnName: "idAsistencia" }]),
    __metadata("design:type", Asistencia_1.Asistencia)
], Grados.prototype, "idAsistencia2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Matricula_1.Matricula, (matricula) => matricula.idGrado2),
    __metadata("design:type", Array)
], Grados.prototype, "matriculas", void 0);
exports.Grados = Grados = __decorate([
    (0, typeorm_1.Index)("id_horario", ["idHorario"], {}),
    (0, typeorm_1.Index)("id_asistencia", ["idAsistencia"], {}),
    (0, typeorm_1.Entity)("grados", { schema: "simadlsc" })
], Grados);
//# sourceMappingURL=Grados.js.map