// app-jquery.js - lógica con jQuery (AJAX)
/* Requisito: Hacer solicitud AJAX con jQuery y mostrar el atributo "mensaje".
   Endpoint de ejemplo: https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example
*/
(function($){
  $(function(){
    const $resultado = $('#resultadoApi');
    $('#btnConsultarApi').on('click', function(){
      $resultado.removeClass('d-none alert-danger alert-success').addClass('alert-secondary').text('Consultando…');
      $.ajax({
        url: 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example',
        method: 'GET',
        dataType: 'json',
        timeout: 8000
      })
      .done(function(data){
        // Se espera un JSON que contenga el atributo "mensaje"
        const msg = (data && (data.mensaje || data.message || JSON.stringify(data)));
        $resultado.removeClass('alert-secondary').addClass('alert-success').text(String(msg));
      })
      .fail(function(jq, textStatus){
        let detalle = 'Error desconocido';
        if(jq && jq.responseText){ detalle = jq.responseText; }
        $resultado.removeClass('alert-secondary').addClass('alert-danger').text('Fallo al consultar el API: ' + textStatus);
        // Opcional: mostrar más detalles en consola
        console.error('AJAX error:', textStatus, detalle);
      });
    });
  });
})(jQuery);
