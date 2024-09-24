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
exports.DetallesMatricula = void 0;
const typeorm_1 = require("typeorm");
const Materias_1 = require("./Materias");
const Matricula_1 = require("./Matricula");
let DetallesMatricula = class DetallesMatricula {
};
exports.DetallesMatricula = DetallesMatricula;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Detalle_Matricula" }),
    __metadata("design:type", Number)
], DetallesMatricula.prototype, "idDetalleMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "estado_Detalle_Matricula", length: 50 }),
    __metadata("design:type", String)
], DetallesMatricula.prototype, "estadoDetalleMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "nota_Detalle_Matricula",
        nullable: true,
        precision: 5,
        scale: 2,
    }),
    __metadata("design:type", String)
], DetallesMatricula.prototype, "notaDetalleMatricula", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Materias_1.Materias, (materias) => materias.idDetalleMatricula2),
    __metadata("design:type", Array)
], DetallesMatricula.prototype, "materias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Matricula_1.Matricula, (matricula) => matricula.idDetalleMatricula2),
    __metadata("design:type", Array)
], DetallesMatricula.prototype, "matriculas", void 0);
exports.DetallesMatricula = DetallesMatricula = __decorate([
    (0, typeorm_1.Entity)("detalles_matricula", { schema: "simadlsc" })
], DetallesMatricula);
//# sourceMappingURL=DetallesMatricula.js.map