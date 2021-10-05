function Data (
    usuarios, 
    tickets, 
    comentarios, 
    usuarioLogueado, 
    administrador, 
    id_usuario_global, 
    id_ticket_global,
    id_comentario_global
    ) {
    this.usuarios = usuarios;
    this.tickets = tickets;
    this.comentarios = comentarios;
    this.usuarioLogueado = usuarioLogueado;
    this.administrador = administrador;
    this.id_ticket_global = id_ticket_global;
    this.id_usuario_global = id_usuario_global;
    this.id_comentario_global = id_comentario_global; 
}