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
exports.Materias = void 0;
const typeorm_1 = require("typeorm");
const DetallesMatricula_1 = require("./DetallesMatricula");
const Horarios_1 = require("./Horarios");
let Materias = class Materias {
};
exports.Materias = Materias;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Materia" }),
    __metadata("design:type", Number)
], Materias.prototype, "idMateria", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Materia", length: 100 }),
    __metadata("design:type", String)
], Materias.prototype, "nombreMateria", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "descripcion_Materia",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Materias.prototype, "descripcionMateria", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Detalle_Matricula" }),
    __metadata("design:type", Number)
], Materias.prototype, "idDetalleMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_horario" }),
    __metadata("design:type", Number)
], Materias.prototype, "idHorario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DetallesMatricula_1.DetallesMatricula, (detallesMatricula) => detallesMatricula.materias, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "id_Detalle_Matricula",
            referencedColumnName: "idDetalleMatricula",
        },
    ]),
    __metadata("design:type", DetallesMatricula_1.DetallesMatricula)
], Materias.prototype, "idDetalleMatricula2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Horarios_1.Horarios, (horarios) => horarios.materias, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_horario", referencedColumnName: "idHorario" }]),
    __metadata("design:type", Horarios_1.Horarios)
], Materias.prototype, "idHorario2", void 0);
exports.Materias = Materias = __decorate([
    (0, typeorm_1.Index)("id_Detalle_Matricula", ["idDetalleMatricula"], {}),
    (0, typeorm_1.Index)("id_horario", ["idHorario"], {}),
    (0, typeorm_1.Entity)("materias", { schema: "simadlsc" })
], Materias);
//# sourceMappingURL=Materias.js.map