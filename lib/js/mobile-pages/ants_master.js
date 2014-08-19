
/*
 * Autor: Rafael Alves
 * E-mail: ralves.sql@gmail.com
 * Fb/rafael.alves.39794
 * Twitter: ralves_sql
 */




//
////PLUGIN MODAL
//
function PluginModal()
{
    this.PluginModalBlack = function() {
        
        var $div = $('<div />').prependTo('body');
        $div.attr('id', 'ants-modal-black');
        $div.addClass('AntsModalBlack');
        $('#ants-modal-black').fadeIn('fast');

        //$('#ants-modal-black').click(this.PluginModalRemove);
    };
    
     this.PluginModalVideo = function(data, redirect) {
       
       
        var marginLeft = data.width / 2;
        var marginTop = data.height / 2;
        
        var $div = $('<div />').prependTo('body');
        $div.attr('id', 'ants-modal-video');
        $div.addClass('AntsModalVideo');
        
        $div.css(
                {width:data.width+'px', height:data.height+'px', marginLeft:-marginLeft, marginTop:-marginTop}
                );
        
        //Header White
        var $div = $('<div />').prependTo('#ants-modal-video');
        $div.attr('id', 'ants-header-modal-white');
        $div.addClass('AntsHeaderModalWhite');
        $div.html(data.texto);
        
         //X Close
        var $div = $('<div />').prependTo('#ants-header-modal-white');
        $div.attr('id', 'ants-headerClose-modal-white');
        $div.addClass('AntsHeaderCloseModalWhite');
        
        $('#ants-modal-video').append('<video  controls src="'+data.src+'" autoplay="'+data.autoplay+'"></video>')
        
        $('#ants-modal-video').fadeIn('slow');
        
        $('#ants-headerClose-modal-white').click(
                function()
        {
            $('#ants-modal-video').fadeOut('fast', function()
            {
               $('#ants-modal-video').remove();
               $('#ants-modal-black').remove();
            });
        });
        //console.log(window.location = path_url+controller+'/'+data.redirect);
        if(data.redirect)
        {
            $("video").bind("ended", function() {
                
               window.location = path_url+controller+'/'+data.redirect;
            });
        }
        
    };
    
    
    this.PluginModalWhite = function(titulo) {
         //Base White
        var $div = $('<div />').prependTo('body');
        $div.attr('id', 'ants-modal-white');
        $div.addClass('AntsModalWhite');



        //Base Conteudo White
        var $div = $('<div />').prependTo('#ants-modal-white');
        $div.attr('id', 'ants-conteudo-modal-white');
        $div.addClass('AntsConteudoModalWhite');

         //Header White
        var $div = $('<div />').prependTo('#ants-modal-white');
        $div.attr('id', 'ants-header-modal-white');
        $div.addClass('AntsHeaderModalWhite');

         //X Close
        var $div = $('<div />').prependTo('#ants-header-modal-white');
        $div.attr('id', 'ants-headerClose-modal-white');
        $div.addClass('AntsHeaderCloseModalWhite');

        //Label Header
         var $div = $('<div />').prependTo('#ants-header-modal-white');
        $div.attr('id', 'ants-headerTitulo-modal-white');
        $div.addClass('AntsHeaderTituloModalWhite');
        $div.text(titulo);

        
        //Bt White
        var $div = $('<div />').prependTo('#ants-modal-white');
        $div.attr('id', 'ants-bt-modal-white');
        $div.addClass('AntsBtModalWhite');
        $div.text('Confirmar');
        
         //Message
        var $div = $('<div />').prependTo('#ants-modal-white');
        $div.attr('id', 'ants-message-white');
        $div.addClass('AntsMessageWhite');
        $div.text('Selecione um item acima!');
        
        $('#ants-modal-white').fadeIn('slow');

        $('#ants-headerClose-modal-white').click(this.PluginModalRemove);
    };
    this.PluginWhiteSmall = function(texto) {
        
        //Base White
        var $div = $('<div />').prependTo('body');
        $div.attr('id', 'ants-modalsmall-white');
        $div.addClass('AntsSmallWhite');
        
        //Base Conteudo White
        var $div = $('<div />').prependTo('#ants-modalsmall-white');
        $div.attr('id', 'ants-conteudo-modal-white');
        $div.addClass('AntsConteudoModalWhite');

         //Header White
        var $div = $('<div />').prependTo('#ants-modalsmall-white');
        $div.attr('id', 'ants-header-modal-white');
        $div.addClass('AntsHeaderModalWhite');
        
      //Label Header
         var $div = $('<div />').prependTo('#ants-header-modal-white');
        $div.attr('id', 'ants-headerTitulo-modal-white');
        $div.addClass('AntsHeaderTituloModalWhite');
        $div.text(texto);
        
        $('#ants-modalsmall-white').fadeIn('slow');
    };
    this.PluginModalRemove = function() {
        
        
        $('#ants-modalsmall-white').fadeOut('fast');
        $('#ants-modal-white').fadeOut('fast');
        $('#ants-modal-black').fadeOut('fast', function()
        {
           $('#ants-modal-black').remove();
           $('#ants-modal-white').remove();
        });
       
    };
    
}


//
////PLUGIN DATA ITEM
//
var inputChecked='';
function PluginDataItens()
{
    
    
    this.PluginDataEachItens = function(dados, item, arrItem)
    {
       
        $.each(dados, function (i, index)
        {

            var objItens = new Object();
            objItens.id = dados[i][item+'Id'];
            objItens.nome = dados[i][item+'Nome'];

            arrayItens.push(objItens);
            
           
           if (in_array(arrayItens[i].id, arrItem))
            {
                inputChecked = 'checked';
            }
            else
            {
                inputChecked = '';
            }
           
            
            $('#ants-conteudo-modal-white')
                    .append(
                    '<div class="div-categoria-item">'+
                      '<input type="checkbox" '+inputChecked+' data-item="'+item+'" id="div-'+item+'-item_'+i+'" value="'+arrayItens[i].id+'" />'+
                      '<label class="inputCheckBox" for="div-'+item+'-item_'+i+'">'+arrayItens[i].nome+'</label>'+
                    '</div>');
        });
    
        
        $('.div-categoria-item>input[type="checkbox"]').change(function(i)
             {
               if($(this).is(':checked'))
                {
                    arrItem.push($(this).val());
                }
                else
                {
                    for(var i2=0; i2<arrItem.length; i2++)
                    {
                        if(arrItem[i2] === $(this).val())
                            arrItem.splice(i2, 1);
                    }
                    
                }
             });
             
    };
    
    this.PluginDataReturnValue = function(arrItem)
    {
        
            if(arrItem.length <1)
            {
                 $('#ants-message-white').animate({
                   marginBottom: "40px"
                }, 300 );
            }
            else
            {
                pluginModal.PluginModalRemove();
            }
       
    };
}



/*
 * PLUGIN REDIMENSIONAR IMG
 */
function PluginRedimensionarImagem()
{
    
    this.PluginSizeImage = function(image)
    {
        //console.log(path_url+'system/WideImage/index.php');
        $.post(path_url+'system/WideImage/index.php', 
            {
                qString:'SizeImage',
                path:image
            },
            function(data)
            {}
            , 'json').done(function(success)
            {
                //console.log(success);
                //Success

            }, 'json').fail(function(error)
            {
                //console.log(error);
                //Error

         }, 'json');
    },
    
    this.PluginUnlink = function(image)
    {
        $.post(path_url+'system/WideImage/index.php', 
            {
                qString:'UnlinkImage',
                path:image
            },
            function(data)
            {}
            , 'json').done(function(success)
            {
                //console.log(success);
                //Success

            }, 'json').fail(function(error)
            {
                //console.log(error);
                //Error

         }, 'json');
    }
}

//
////PLUGIN VALIDACAO
//
function AntsValidacao()
{
    
    this.validaData = function()
    {
        var i=0;
        $('input, textarea').each(function() {
            // code
            
            if($(this).attr('required'))
            {
                
                if($(this).val() === '')
                {
                   i++;
                } 
            }
           
            
        });
        
        
        if(i > 0)return false;
        else return true;
            
        
    };
}


//
////PLUGIN VALIDA E-MAIL
//
function AntsValidacaoEmail()
{
    
    this.validaEmail = function(email)
    {
        if(email != "")
        {
           var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
           if(filtro.test(email))
           {
              return true;
           } else {
             
             return false;
           }
        }
    }
     
}

//
////PLUGIN VALIDA CPF
//
function AntsValidacaoCPF() { 
    
    this.validaCPF = function(strCPF)
    {
        var cpf = strCPF.replace('.','');
            cpf = cpf.replace('.','');
            cpf = cpf.replace('-','');
                                    
                                    
        var Soma; var Resto; Soma = 0; 
        
        if (cpf == "00000000000") return false; 

        for (i=1; i<=9; i++)  Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i); 

        Resto = (Soma * 10) % 11; 

        if ((Resto == 10) || (Resto == 11)) Resto = 0; 

        if (Resto != parseInt(cpf.substring(9, 10)) ) return false; 

        Soma = 0;

        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i); 
        Resto = (Soma * 10) % 11; 

        if ((Resto == 10) || (Resto == 11)) Resto = 0; 
        if (Resto != parseInt(cpf.substring(10, 11) ) ) return false; 

        return true; 
    }
    
}


//
////PLUGIN CARACTERES ESPECIAIS
//
function AntsValidacaoCaracteresEspeciais() {
    
    this.validarCaracteres = function(str)
    {
        //se não desejar números é só remover da regex abaixo
        var regex = '[\'\"]'//'[^a-zA-Z0-9]+';
        if(str.match(regex)) {
             //encontrou então não passa na validação
             return false;
        }
        else {
             //não encontrou caracteres especiais
             return true;
        }
    }
   
}



//
///PLUGIN DB-Data Base
//
function AntsDB()
{
    
    this.handleInsert = function(arrDados)
    {
         arrDados.txDb.executeSql("INSERT INTO "+arrDados.tabela+" ("+arrDados.field+") VALUES ("+arrDados.value+")");
    }
}

//
////MIXIN
//
/*Object.prototype.includes = function(construtor)
{
    var objeto = new construtor();

    for(var propriedade in objeto)
    {
        if(objeto.hasOwnProperty(propriedade))
        {
            this.prototype[propriedade] = new objeto[propriedade];
        }
    }
};
*/