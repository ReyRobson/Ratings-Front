const express = require('express')
const path = require('path')
const { makeGet } = require('./public/js/httpHandler')
const fs = require('fs');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/pesquisa', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'search.html'))
})

app.get('/search', async (req,res) => {
    let value = req.query.q
    let retorno = await makeGet(value)

    geraPagina(retorno.data, value)

    res.redirect('/pesquisa')
})

function geraPagina(retorno, value){

    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Search</title>
        <link rel="stylesheet" href="css/styles-search.css">
    </head>
    <body>
        <header>
            <div id="logo">
                <a href="index.html"><img src="assets/logo ratings.png" alt="Logo Ratings"></a>
            </div>
            <div id="menu" class="menu">
                <nav>
                    <ul class="buttons">
                        <li><a href="topRatings.html">Melhores Avaliados</a></li>
                        <li><a href="discusions.html">Discussoes</a></li>
                        <li><a href="login.html">Fazer Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <section style="text-align: center; font-size: 20px;">
                <h1>Exibindo resultados para ${value}</h1>
            </section>
            <article>`;
            var persons =[
                {firstname : "Malcom", lastname: "Reynolds"},
                {firstname : "Kaylee", lastname: "Frye"},
                {firstname : "Jayne", lastname: "Cobb"}
            ]
        
            retorno.forEach(retorno => {
                htmlContent += `<div class="list">
                <div class="information">
                    <div class="title" style="display: inline-flex;">
                        <a>${retorno.titulo}</a>
                    </div>
                        <div class="infos">
                        ${retorno.data_lancamento}
                        </div>
                </div>
                    <div class="btnfavoritos">
                        <button>Adicionar aos favoritos</button>
                    </div>
                </div>
                `
            })
        htmlContent+= `
        </article>
        </main>
        <footer>
            <div id="footer-block" style="width: 1330px;">
                <div class="ratings-def">
                    <h2>O que é o Ratings?</h2>
                    <p>O Ratings é um lugar onde o publico pode avaliar, verificar seu progresso e discutir sobre as principais obras dos diversos generos de midia</p>
                </div>
                <div class="footer-contato">
                    <a target="_blank" class="icon-footer-sns" title="mande mesagem pelo whatsapp">
                        <img src="assets/whatsapp.png" alt="icone zap zap">
                    </a>
                    <a target="_blank" class="icon-footer-sns" title="siga no instagram" href="instagram.com">
                        <img src="assets/instagram.png" alt="icone instagram">
                    </a>
                </div>
                <div class="footer-link-block">
                    <p class="footer-link-home">
                        <a href="index.html">Home</a>
                    </p>
                    <p class="footer-link-home">
                        <a target="_blank">FAQ</a>
                        <a target="_blank">Terms</a>
                        <a target="_blank">Support</a>
                    </p>
                    <p class="footer-link-login">
                        <a href="" id="mailogin">Login</a>
                        <a href="">Cadastro</a>
                    </p>
                </div>
            </div>
        </footer>
    </body>
    </html>
    `
    
    const paginaClientes = path.join(__dirname, 'public', 'search.html');

    fs.writeFile(paginaClientes, htmlContent, err => {
        if(err){
            console.log(err)
        }
        console.log('arquivo salvo')
    })
}

function createList(){
    var persons =[
        {firstname : "Malcom", lastname: "Reynolds"},
        {firstname : "Kaylee", lastname: "Frye"},
        {firstname : "Jayne", lastname: "Cobb"}
    ]

    var result = ""
    persons.forEach(item => [
        result += "<li>" + item.firstname + "</li>"
    ])

    return result
}

app.listen(8080, () => {
    console.log('servidor rodando na porta 8080')
})