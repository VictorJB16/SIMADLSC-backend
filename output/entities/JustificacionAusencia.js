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
exports.JustificacionAusencia = void 0;
const typeorm_1 = require("typeorm");
const Asistencia_1 = require("./Asistencia");
let JustificacionAusencia = class JustificacionAusencia {
};
exports.JustificacionAusencia = JustificacionAusencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Justificacion_Ausencia" }),
    __metadata("design:type", Number)
], JustificacionAusencia.prototype, "idJustificacionAusencia", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Motivo_Justificacion",
        nullable: true,
        length: 300,
    }),
    __metadata("design:type", String)
], JustificacionAusencia.prototype, "motivoJustificacion", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "fecha_Justificacion_Ausencia", nullable: true }),
    __metadata("design:type", Date)
], JustificacionAusencia.prototype, "fechaJustificacionAusencia", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Asistencia" }),
    __metadata("design:type", Number)
], JustificacionAusencia.prototype, "idAsistencia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Asistencia_1.Asistencia, (asistencia) => asistencia.justificacionAusencias, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Asistencia", referencedColumnName: "idAsistencia" }]),
    __metadata("design:type", Asistencia_1.Asistencia)
], JustificacionAusencia.prototype, "idAsistencia2", void 0);
exports.JustificacionAusencia = JustificacionAusencia = __decorate([
    (0, typeorm_1.Index)("id_Asistencia", ["idAsistencia"], {}),
    (0, typeorm_1.Entity)("justificacion_ausencia", { schema: "simadlsc" })
], JustificacionAusencia);
//# sourceMappingURL=JustificacionAusencia.js.map