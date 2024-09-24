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
exports.Asistencia = void 0;
const typeorm_1 = require("typeorm");
const Periodo_1 = require("./Periodo");
const Estudiantes_1 = require("./Estudiantes");
const Grados_1 = require("./Grados");
const JustificacionAusencia_1 = require("./JustificacionAusencia");
let Asistencia = class Asistencia {
};
exports.Asistencia = Asistencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Asistencia" }),
    __metadata("design:type", Number)
], Asistencia.prototype, "idAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", {
        name: "fecha_asistencia",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Asistencia.prototype, "fechaAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "estado_asistencia", length: 255 }),
    __metadata("design:type", String)
], Asistencia.prototype, "estadoAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "observaciones_asistencia",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Asistencia.prototype, "observacionesAsistencia", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Periodo" }),
    __metadata("design:type", Number)
], Asistencia.prototype, "idPeriodo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Periodo_1.Periodo, (periodo) => periodo.asistencias, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }]),
    __metadata("design:type", Periodo_1.Periodo)
], Asistencia.prototype, "idPeriodo2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Estudiantes_1.Estudiantes, (estudiantes) => estudiantes.idAsistencia2),
    __metadata("design:type", Array)
], Asistencia.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Grados_1.Grados, (grados) => grados.idAsistencia2),
    __metadata("design:type", Array)
], Asistencia.prototype, "grados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JustificacionAusencia_1.JustificacionAusencia, (justificacionAusencia) => justificacionAusencia.idAsistencia2),
    __metadata("design:type", Array)
], Asistencia.prototype, "justificacionAusencias", void 0);
exports.Asistencia = Asistencia = __decorate([
    (0, typeorm_1.Index)("id_Periodo", ["idPeriodo"], {}),
    (0, typeorm_1.Entity)("asistencia", { schema: "simadlsc" })
], Asistencia);
//# sourceMappingURL=Asistencia.js.map