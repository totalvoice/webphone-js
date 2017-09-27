# Webphone Oculto - Javascript
Para utilizar o webphone hidden via javascript basta você seguir a configuração abaixo.

### Configuração

Para configurar o seu webphone neste script você deve:
* Gerar a URL do seu webphone [neste link](https://api2.totalvoice.com.br/doc/#!/Central/get_webphone) informando o tipo dele como hidden.
* Depois só adicionar a url gerada no valor do src abaixo 'URL_WEBPHONE_API_TOTALVOICE' no script webphone.html
```
<!-- URL que foi pega pela API no /webphone - cria o iframe e injeta o webphone-->
<script src="URL_WEBPHONE_API_TOTALVOICE"></script>
```