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
exports.Evento = void 0;
const typeorm_1 = require("typeorm");
const Periodo_1 = require("./Periodo");
const TipoEvento_1 = require("./TipoEvento");
const Ubicaciones_1 = require("./Ubicaciones");
const Usuario_1 = require("./Usuario");
let Evento = class Evento {
};
exports.Evento = Evento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_Evento" }),
    __metadata("design:type", Number)
], Evento.prototype, "idEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Evento", length: 255 }),
    __metadata("design:type", String)
], Evento.prototype, "nombreEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "descripcion_Evento", nullable: true }),
    __metadata("design:type", String)
], Evento.prototype, "descripcionEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "fecha_Evento" }),
    __metadata("design:type", String)
], Evento.prototype, "fechaEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "hora_inicio_Evento" }),
    __metadata("design:type", String)
], Evento.prototype, "horaInicioEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "hora_fin_Evento" }),
    __metadata("design:type", String)
], Evento.prototype, "horaFinEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "dirigido_a_Evento", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Evento.prototype, "dirigidoAEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "estado_Evento", length: 50 }),
    __metadata("design:type", String)
], Evento.prototype, "estadoEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_Periodo" }),
    __metadata("design:type", Number)
], Evento.prototype, "idPeriodo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Periodo_1.Periodo, (periodo) => periodo.eventos, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }]),
    __metadata("design:type", Periodo_1.Periodo)
], Evento.prototype, "idPeriodo2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TipoEvento_1.TipoEvento, (tipoEvento) => tipoEvento.idEvento2),
    __metadata("design:type", Array)
], Evento.prototype, "tipoEventos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ubicaciones_1.Ubicaciones, (ubicaciones) => ubicaciones.idEvento2),
    __metadata("design:type", Array)
], Evento.prototype, "ubicaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Usuario_1.Usuario, (usuario) => usuario.idEvento2),
    __metadata("design:type", Array)
], Evento.prototype, "usuarios", void 0);
exports.Evento = Evento = __decorate([
    (0, typeorm_1.Index)("id_Periodo", ["idPeriodo"], {}),
    (0, typeorm_1.Entity)("evento", { schema: "simadlsc" })
], Evento);
//# sourceMappingURL=Evento.js.map