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
exports.Ubicaciones = void 0;
const typeorm_1 = require("typeorm");
const Evento_1 = require("./Evento");
let Ubicaciones = class Ubicaciones {
};
exports.Ubicaciones = Ubicaciones;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_ubicacion" }),
    __metadata("design:type", Number)
], Ubicaciones.prototype, "idUbicacion", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Ubicacion", length: 100 }),
    __metadata("design:type", String)
], Ubicaciones.prototype, "nombreUbicacion", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "descripcion_Ubicacion",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Ubicaciones.prototype, "descripcionUbicacion", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Evento" }),
    __metadata("design:type", Number)
], Ubicaciones.prototype, "idEvento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Evento_1.Evento, (evento) => evento.ubicaciones, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Evento", referencedColumnName: "idEvento" }]),
    __metadata("design:type", Evento_1.Evento)
], Ubicaciones.prototype, "idEvento2", void 0);
exports.Ubicaciones = Ubicaciones = __decorate([
    (0, typeorm_1.Index)("id_Evento", ["idEvento"], {}),
    (0, typeorm_1.Entity)("ubicaciones", { schema: "simadlsc" })
], Ubicaciones);
//# sourceMappingURL=Ubicaciones.js.map