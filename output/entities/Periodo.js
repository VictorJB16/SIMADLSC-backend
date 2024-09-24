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
exports.Periodo = void 0;
const typeorm_1 = require("typeorm");
const Asistencia_1 = require("./Asistencia");
const Estudiantes_1 = require("./Estudiantes");
const Evento_1 = require("./Evento");
let Periodo = class Periodo {
};
exports.Periodo = Periodo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Periodo" }),
    __metadata("design:type", Number)
], Periodo.prototype, "idPeriodo", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "Anio" }),
    __metadata("design:type", Number)
], Periodo.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Periodo", length: 50 }),
    __metadata("design:type", String)
], Periodo.prototype, "nombrePeriodo", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fecha_inicio" }),
    __metadata("design:type", String)
], Periodo.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fecha_fin" }),
    __metadata("design:type", String)
], Periodo.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Asistencia_1.Asistencia, (asistencia) => asistencia.idPeriodo2),
    __metadata("design:type", Array)
], Periodo.prototype, "asistencias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Estudiantes_1.Estudiantes, (estudiantes) => estudiantes.idPeriodo2),
    __metadata("design:type", Array)
], Periodo.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Evento_1.Evento, (evento) => evento.idPeriodo2),
    __metadata("design:type", Array)
], Periodo.prototype, "eventos", void 0);
exports.Periodo = Periodo = __decorate([
    (0, typeorm_1.Entity)("periodo", { schema: "simadlsc" })
], Periodo);
//# sourceMappingURL=Periodo.js.map