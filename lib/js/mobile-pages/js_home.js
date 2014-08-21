
    document.addEventListener('deviceready', onDeviceReady, false);
    
    function onDeviceReady(){
        
       
        var connect = new AntsConnectDb();
        connect.handleConnect();
        
        var user = new AntsGetUserSQLLite();
        user.handleGetUser();
        
        
    }
    
    function handleSetUserData()
    {
       
      
      
    }
    
    
    function handleGetDataEstudos(id)
    {
        $('#ulEstudos1').empty();
        $('#ulEstudos2').empty();
        $.getJSON(ExternalURL+'estudos/handleSelect/front/true/data/'+id,function(data){

                       
                        if(data.mensagem == 'fail')
                        {
                                alert('E#003 - Informe o Desenvolvedor');//Remover os dados do usuario do banco- adm/lib/php/sm_usuarios.php
                        }
                        else
                        {
                             $('#ulEstudos1').append('<li data-role="list-divider">Selecione o estudo desejado abaixo:</li>');
                             $('#ulEstudos2').append('<li data-role="list-divider">Selecione o estudo desejado abaixo:</li>');
                             
                            $.each(data.mensagem, function(i, index)
                            {
                               
                               
                                
                                $('#ulEstudos'+index.estudosDiaId)
						.append('<li><a href="#" onClick="handleViewEstudo(\''+index.estudosFile+'\')">'+
								'<img src="uploads/photos/'+index.palestrantesFoto+'" >'+
								'<h2>'+index.palestrantesNome+'</h2>'+
                                                                '<p>'+index.estudosDescricao+'</p></a>'+
								'</li>');
						$('#ulEstudos'+index.estudosDiaId).listview('refresh');	
                            });
                        }
                    });
    }
	
     function handleViewEstudo(file)
     {
         //alert(file)
         var ref = window.open(ExternalLink+'uploads/temp/'+file, '_blank', 'location=yes');
     }
        