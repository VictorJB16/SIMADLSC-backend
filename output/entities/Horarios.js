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
exports.Horarios = void 0;
const typeorm_1 = require("typeorm");
const Grados_1 = require("./Grados");
const Materias_1 = require("./Materias");
const Profesores_1 = require("./Profesores");
let Horarios = class Horarios {
};
exports.Horarios = Horarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Horario" }),
    __metadata("design:type", Number)
], Horarios.prototype, "idHorario", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "dia_semana_Horario", length: 50 }),
    __metadata("design:type", String)
], Horarios.prototype, "diaSemanaHorario", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "hora_inicio_Horario" }),
    __metadata("design:type", String)
], Horarios.prototype, "horaInicioHorario", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "hora_fin_Horario" }),
    __metadata("design:type", String)
], Horarios.prototype, "horaFinHorario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Grados_1.Grados, (grados) => grados.idHorario2),
    __metadata("design:type", Array)
], Horarios.prototype, "grados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Materias_1.Materias, (materias) => materias.idHorario2),
    __metadata("design:type", Array)
], Horarios.prototype, "materias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Profesores_1.Profesores, (profesores) => profesores.idHorario2),
    __metadata("design:type", Array)
], Horarios.prototype, "profesores", void 0);
exports.Horarios = Horarios = __decorate([
    (0, typeorm_1.Entity)("horarios", { schema: "simadlsc" })
], Horarios);
//# sourceMappingURL=Horarios.js.map