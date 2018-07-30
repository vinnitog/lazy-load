var loadImages;

// document.ready significa que esssa funcao ira rodar apenas apos o documento html todo ser renderizado
$(document).ready(function(){
    $('.lazy-img img').on('load', function(){
        $(this).addClass('loaded'); // add classe loaded para efeito visual quando a imagem é carregada no documento html
    });

    $(document).on('scroll', function(){
        loadImages(); // chamando a funcao loadImages
    });
    (loadImages = function(){
        $.each($('.lazy-img'), function(){
            var bloco = $(this); // captura o bloco que contem a imagem
            var img = bloco.find('img'); // captura a imagem do bloco

            // chama a funcao para verificar se o bloco esta visivel na tela
            if(isOnScreen(bloco)){
                var url = img.data('url'); // atribui o valor do atributo data-url em uma variavel

                if(img.attr('src')!= url){ // verifica se a imagem ja foi carregada no atributo src para nao ficar carregando constantemente
                    img.attr('src', url);
                }
            }
        });
    })(); // (); significa que ja vai executar essa funcao quando for atribuida    
});

function isOnScreen(element){
    var win = $(window); // capturando elemento window

    var screenTop = win.scrollTop(); // capturando a distancia para o topo
    var screenBottom =  screenTop + win.height(); //capturando a distancia para o rodape, somando a distancia pro topo + a altura da janela

    var elementTop = element.offset().top; // capturando a distancia do elemento para o topo
    var elementBottom = elementTop + element.height(); //capturandoa a distancia para o rodape, somando a distancia do elemento para o topo + a altura do elemento

    /* se a distancia do elemento para o rodape for maior que a distancia da janela para o topo e
    a distancia do elemento para o topo for menor que a distancia da tela para o rodape significa 
    que o elemento está visivel na pagina
    */ 
    return elementBottom > screenTop && elementTop < screenBottom;
}