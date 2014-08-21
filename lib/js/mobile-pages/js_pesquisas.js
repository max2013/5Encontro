
   
    function onDeviceReady(){
        
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        var user = new AntsGetUserSQLLite();
        user.handleGetUser();
        
    }
    
    function handleSetUserData()
    {
       
       var arrRespostas = new Array();
       //Form ONE
       $('#send-form-one').click(function()
        {
             var radioOne = '';
             arrRespostas = [];
             
             radioOne = $('input[name=radioOne]:checked', '#form-one').val();
             
             //Controll CHECK BOX
                $('#form-one input[type="checkbox"]').each(function(data) {
                    
                  if($(this).is(':checked'))
                   {
                      //Check concessionárias
                       
                        arrRespostas.push($(this).val());
                   }
                });
                
               
             if(radioOne === undefined ||  arrRespostas.length === 0)
             {
                 alert('Por favor preencher todas as questões!')
             }
             else
             {
                  
                 $.post(ExternalURL+'pesquisas/handleInsert/front/true/dia/1', 
                 {
                     participanteId:dadosParticipantes[0],
                     participanteNome:dadosParticipantes[1],
                     resposta1: radioOne, 
                     resposta2: arrRespostas
                 }, function(data)
                 {
                    if(data.mensagem === 'success')
                    {
                        alert('Pesquisa realizada com sucesso, Obrigado.');
                        window.location.reload();
                    }
                    else if(data.mensagem === 'user_exists')
                    {
                        alert('Você já participou desta pesquisa, obrigado!');
                         window.location.reload();
                    }
                    else
                    {
                        alert('Houve um erro ao registrar a pesquisa!');
                    }
                 },'json');
                    
                    
             }
          
        });
        
        
        //Form TWO
        $('#send-form-two').click(function()
        {
            //Controll CHECK BOX
            var respostas1 = new Array();
            var respostas2 = new Array();
            var respostas3, respostas4, respostas5, respostas6, respostas7;
            
            respostas3 = $('input[name=radioTwo]:checked', '#form-two').val();
            respostas4 = $('input[name=radioTwo1]:checked', '#form-two').val();
            respostas5 = $('input[name=radioTwo2]:checked', '#form-two').val();
            respostas6 = $('input[name=radioTwo5]:checked', '#form-two').val();
            respostas7 = $('input[name=radioTwo6]:checked', '#form-two').val();
            
            //Check
            $('#form-two input[type="checkbox"]').each(function(data) {

              if($(this).is(':checked'))
               {
                  //Check concessionárias
                   if($(this).attr('data-tipo') === 'pergunta1')
                   {
                       respostas1.push($(this).val());
                   }

                   if($(this).attr('data-tipo') === 'pergunta2')
                   {
                       respostas2.push($(this).val());
                   }

               }
            });

            if(respostas3 === undefined  || respostas4 === undefined || respostas5 === undefined || respostas6 === undefined || respostas7 === undefined ||  respostas1.length === 0 || respostas2.length === 0)
             {
                 alert('Por favor preencher todas as questões!')
             }
             else
             {
                  
                 $.post(ExternalURL+'pesquisas/handleInsert/front/true/dia/2', 
                 {
                     participanteId:dadosParticipantes[0],
                     participanteNome:dadosParticipantes[1],
                     resposta1: respostas1, 
                     resposta2: respostas2,
                     resposta3: respostas3,
                     resposta4: respostas4,
                     resposta5: respostas5,
                     resposta6: respostas6,
                     resposta7: respostas7
                     
                 }, function(data)
                 {
                    if(data.mensagem === 'success')
                    {
                        alert('Pesquisa realizada com sucesso, Obrigado.');
                        window.location.reload();
                    }
                    else if(data.mensagem === 'user_exists')
                    {
                        alert('Você já participou desta pesquisa, obrigado!');
                         window.location.reload();
                    }
                    else
                    {
                        alert('Houve um erro ao registrar a pesquisa!');
                    }
                 },'json');
                    
                    
             }
             
             
                
        });
        
        //Form Three
        $('#send-form-three').click(function()
        {
            var respostas1, respostas2, respostas3, respostas4, respostas5, respostas6;
            
            respostas1 = $('input[name=radioThree]:checked', '#form-three').val();
            respostas2 = $('input[name=radioThree2]:checked', '#form-three').val();
            respostas3 = $('input[name=radioThree3]:checked', '#form-three').val();
            respostas4 = $('input[name=radioThree4]:checked', '#form-three').val();
            respostas5 = $('input[name=radioThree5]:checked', '#form-three').val();
            respostas6 = $('input[name=radioThree6]:checked', '#form-three').val();
            
            if(respostas1 === undefined  || respostas2 === undefined  || respostas3 === undefined  || respostas4 === undefined || respostas5 === undefined || respostas6 === undefined)
             {
                 alert('Por favor preencher todas as questões!')
             }
             else
             {
                  
                 $.post(ExternalURL+'pesquisas/handleInsert/front/true/dia/3', 
                 {
                     participanteId:dadosParticipantes[0],
                     participanteNome:dadosParticipantes[1],
                     resposta1: respostas1, 
                     resposta2: respostas2,
                     resposta3: respostas3,
                     resposta4: respostas4,
                     resposta5: respostas5,
                     resposta6: respostas6
                     
                 }, function(data)
                 {
                    if(data.mensagem === 'success')
                    {
                        alert('Pesquisa realizada com sucesso, Obrigado.');
                        window.location.reload();
                    }
                    else if(data.mensagem === 'user_exists')
                    {
                        alert('Você já participou desta pesquisa, obrigado!');
                         window.location.reload();
                    }
                    else
                    {
                        alert('Houve um erro ao registrar a pesquisa!');
                    }
                 },'json');
             }
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
