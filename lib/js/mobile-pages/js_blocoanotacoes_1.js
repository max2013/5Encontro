
   
    function onDeviceReady(){
        
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        var user = new AntsGetUserSQLLite();
        user.handleGetUser();
        
    }
    
    function handleSetUserData()
    {
       
       handleGetAnotacoes();
       
       $('#btAnotacoes').click(function ()
        {
            handleSaveAnotacoes($('#bloco_anotacoesNote'));

        });
                
       
        $('#sendLogin').click(function()
        {
           
            if($('#admLogin').val() ==='max' && $('#admSenha').val() === 'max@2014')
            {
                $.post(ExternalURL+'participantes/updateiPad/front/true/id/'+dadosParticipantes[0], function(data)
                {
                    if(data.mensagem === 'success')
                    {
                        alert('Usuário desativado com sucesso!');
                        var cleanDb = new AntsCleanDb();
                        cleanDb.handleClean();
                    };
                    
                },'json');
                
            }
            else
            {
                alert('Erro ao descadastrar o usuário.')
            }
        }); 
        
    }
    
function handleSaveAnotacoes(txt)
{
    $('#sleepNote').html('Por favor aguarde...');
    $.post(ExternalURL+'blocoanotacoes/handleInsert/front/true', {id:dadosParticipantes[0], texto:$('#bloco_anotacoesNote').val()}, function(data)
    {
        //console.log(data);
    }, 'json')
    .done(function(data)
    {
        alert('Dados Salvos com sucesso!');
        $('#sleepNote').html('');
        //console.log(data);
    }, 'json')
    .fail(function(data)
    {
        //console.log(data);
        alert('Erro ao salvar os dados!');
    }, 'json');
}

function handleGetAnotacoes()
{
   
    $.getJSON(ExternalURL+'blocoanotacoes/handleSelect/front/true/id/'+dadosParticipantes[0],function(data){
            
            console.log(data)
               
        }).done(function(data)
        {
            $('#bloco_anotacoesNote').html(data.mensagem[0]['bloco_anotacoesNote']);
            
        }).fail(function(data)
        {
            console.log(data);
            
        });
}
