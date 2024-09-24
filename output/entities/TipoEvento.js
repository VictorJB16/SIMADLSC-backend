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
exports.TipoEvento = void 0;
const typeorm_1 = require("typeorm");
const Evento_1 = require("./Evento");
let TipoEvento = class TipoEvento {
};
exports.TipoEvento = TipoEvento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id_tipo_evento" }),
    __metadata("design:type", Number)
], TipoEvento.prototype, "idTipoEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nombre_Tipo_Evento", length: 100 }),
    __metadata("design:type", String)
], TipoEvento.prototype, "nombreTipoEvento", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "id_evento" }),
    __metadata("design:type", Number)
], TipoEvento.prototype, "idEvento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Evento_1.Evento, (evento) => evento.tipoEventos, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_evento", referencedColumnName: "idEvento" }]),
    __metadata("design:type", Evento_1.Evento)
], TipoEvento.prototype, "idEvento2", void 0);
exports.TipoEvento = TipoEvento = __decorate([
    (0, typeorm_1.Index)("id_evento", ["idEvento"], {}),
    (0, typeorm_1.Entity)("tipo_evento", { schema: "simadlsc" })
], TipoEvento);
//# sourceMappingURL=TipoEvento.js.map