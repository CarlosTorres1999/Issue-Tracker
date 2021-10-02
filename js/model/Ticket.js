function Ticket  (
    id_ticket,
    titulo,
    descripcion,
    responsable,
    fecha_creacion,
    fecha_vencimiento,
    prioridad,
    estado,
    creador
){
    this.id_ticket = id_ticket;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.responsable = responsable;
    this.fecha_creacion = fecha_creacion;
    this.fecha_vencimiento = fecha_vencimiento;
    this.prioridad = prioridad;
    this.estado = estado;
    this.creador = creador;
}

