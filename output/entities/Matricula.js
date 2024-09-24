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
exports.Matricula = void 0;
const typeorm_1 = require("typeorm");
const DetallesMatricula_1 = require("./DetallesMatricula");
const Grados_1 = require("./Grados");
let Matricula = class Matricula {
};
exports.Matricula = Matricula;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Matricula" }),
    __metadata("design:type", Number)
], Matricula.prototype, "idMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "estado_Matricula", length: 50 }),
    __metadata("design:type", String)
], Matricula.prototype, "estadoMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("longblob", { name: "Otros_Documentos_Matricula", nullable: true }),
    __metadata("design:type", Buffer)
], Matricula.prototype, "otrosDocumentosMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "Documentos_Tipo_Matricula",
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], Matricula.prototype, "documentosTipoMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fecha_Matricula" }),
    __metadata("design:type", String)
], Matricula.prototype, "fechaMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Detalle_Matricula" }),
    __metadata("design:type", Number)
], Matricula.prototype, "idDetalleMatricula", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_grado" }),
    __metadata("design:type", Number)
], Matricula.prototype, "idGrado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DetallesMatricula_1.DetallesMatricula, (detallesMatricula) => detallesMatricula.matriculas, { onDelete: "RESTRICT", onUpdate: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)([
        {
            name: "id_Detalle_Matricula",
            referencedColumnName: "idDetalleMatricula",
        },
    ]),
    __metadata("design:type", DetallesMatricula_1.DetallesMatricula)
], Matricula.prototype, "idDetalleMatricula2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grados_1.Grados, (grados) => grados.matriculas, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_grado", referencedColumnName: "idGrado" }]),
    __metadata("design:type", Grados_1.Grados)
], Matricula.prototype, "idGrado2", void 0);
exports.Matricula = Matricula = __decorate([
    (0, typeorm_1.Index)("id_Detalle_Matricula", ["idDetalleMatricula"], {}),
    (0, typeorm_1.Index)("id_grado", ["idGrado"], {}),
    (0, typeorm_1.Entity)("matricula", { schema: "simadlsc" })
], Matricula);
//# sourceMappingURL=Matricula.js.map