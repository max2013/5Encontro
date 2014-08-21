
   
    function onDeviceReady(){
        
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        var user = new AntsGetUserSQLLite();
        user.handleGetUser();
        
    }
    
    function handleSetUserData()
    {
       
       
       $('#btAnotacoes').click(function ()
        {
            handleSaveAnotacoes($('#bloco_anotacoesNote'));

        });
                
                
    }
    
function handleSaveAnotacoes(txt)
{
    $('#sleepNote').html('Por favor aguarde...');
    $.post(ExternalURL+'perguntas/handleInsert/front/true', {id:dadosParticipantes[0], pergunta:$('#perguntasTexto').val(), sala:$('#perguntasSalasId').val()}, function(data)
    {
        //console.log(data);
    }, 'json')
    .done(function(data)
    {
        alert('Dados Salvos com sucesso!');
        $('#perguntasTexto').val('');
        $('#sleepNote').html('');
        //console.log(data);
    }, 'json')
    .fail(function(data)
    {
        //console.log(data);
        alert('Erro ao salvar os dados!');
    }, 'json');
}
