const express = require('express');
const cheerio = require('cheerio');
const rs = require('request');
const cors = require('cors');
const { VidstreamingScraper } = require('vidstreaming-scraper');
const baseUrl  = 'https://gogoanime.pe';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Popular anime
app.get('/popular/:page', (req, res)=>{
    let results = [];
    let page = req.params.page;
    if(isNaN(page)){
        return res.statusMessage(404).json({ results });
    }
    let url =`${baseUrl}/popular.html?page=${req.params.page}`;
    rs(url, (error, response, html)=>{
        if(!error){
            try{
                var $ = cheerio.load(html);
                $('.img').each(function (index, element){
                    let title = $(this).children('a').attr().title;
                    let id = $(this).children('a').attr().href.slice(10);
                    let image = $(this).children('a').children('img').attr().src;
                    results[index] = {title, id, image};
                });
                res.status(200).json({results});
            } catch(e){
                res.status(404).json({ error: "Something went wrong" });
            }
        }
    }); 
});

//Anime  Details
app.get('/details/:id', (req, res)=>{
    let results = [];
    let url = `${baseUrl}/category/${req.params.id}`
    rs(url, (error, response, html)=>{
        if(!error){
            try{
                var $ = cheerio.load(html)
                var type = ' '
                var summary = ''
                var released = ''
                var status = ''
                var genres = ''
                var otherName = ''
                var title = $('.anime_info_body_bg').children('h1').text()
                var image = $('.anime_info_body_bg').children('img').attr().src

                $('p.type').each(function (index, element) {
                    if ('Type: ' == $(this).children('span').text()) {
                        type = $(this).text().slice(15, -5)
                    } else if ('Plot Summary: ' == $(this).children('span').text()) {
                        summary = $(this).text().slice(14)
                    } else if ('Released: ' == $(this).children('span').text()) {
                        released = $(this).text().slice(10)
                    } else if ('Status: ' == $(this).children('span').text()) {
                        status = $(this).text().slice(8)

                    } else if ("Genre: " == $(this).children('span').text()) {
                        genres = $(this).text().slice(20, -4)
                        genres = genres.split(',')
                        genres = genres.join(',')


                    } else ('Other name: ' == $(this).children('span').text())
                    {
                        otherName = $(this).text().slice(12)

                    }
                });
                genres.replace(" ");
                var totalEpisode = $('#episode_page').children('li').last().children('a').attr().ep_end
                results[0] = { title, image, type, summary, released, genres, status, totalEpisode, otherName }
                res.status(200).json({ results })
            }
            catch(e){
                res.status(404).json({ error: "Something went wrong" });
            }
        }
    });
});

//Search anime
app.get('/search/:word/:page', (req, res)=>{
    let results = [];
    var word = req.params.word;
    let page = req.params.page;
    if (isNaN(page)) {
        return res.status(404).json({ results });
    }
    let url = `${baseUrl}/search.html?keyword=${word}&page=${req.params.page}`;
    rs(url, (err, resp, html) => {
        if (!err) {
            try {

                var $ = cheerio.load(html)
                $('.img').each(function (index, element) {
                    let title = $(this).children('a').attr().title;
                    let id = $(this).children('a').attr().href.slice(10);
                    let image = $(this).children('a').children('img').attr().src;

                    results[index] = { title, id, image };
                })
                res.status(200).json({ results });
            }
            catch (e) {
                res.status(404).json({ error: 'Something went wrong' })
            }
        }
    });
});

//Episode Watch
app.get('/watch/:id/:episode', (req, res) => {
    let link = '';
    let nl = [];
    var id = req.params.id;
    var episode = req.params.episode;
    url = `${baseUrl}/${id}-episode-${episode}`;
    rs(url, (err, resp, html) => {
        if (!err) {
            try {
                var $ = cheerio.load(html);
                if ($('.entry-title').text()==='404'){return res.status(404).json({links:[],link})}

                link = $('li.anime').children('a').attr('data-video');

                nl = async () => {
                    const scrapp = await new VidstreamingScraper().scrap("http:" + link);
                    if (scrapp.success) {
                       return res.status(200).json({ links: scrapp.data.sources, link });
                    }
                    return res.status(200).json({ link, links:[] })
                }
                nl()
            }
            catch (e) {
                res.status(404).json({ links:[],link:''})
            }
        }
    });
});

//Genre
app.get('/genre/:type/:page', (req, res) => {

    var results = []
    var type = req.params.type
    var page = req.params.page
    if (isNaN(page)) {
        return res.status(404).json({ results })
    }
    url = `${baseUrl}/genre/${type}?page=${page}`
    rs(url, (err, resp, html) => {
        if (!err) {
            try {

                var $ = cheerio.load(html)
                $('.img').each(function (index, element) {
                    let title = $(this).children('a').attr().title
                    let id = $(this).children('a').attr().href.slice(10)
                    let image = $(this).children('a').children('img').attr().src

                    results[index] = { title, id, image }

                })

                res.status(200).json({ results })
            }
            catch (e) {
                res.status(404).json({ error: 'Something went wrong' })
            }
        }
    });
});

//Recently added
app.get('/recentlyadded/:page', (req, res) => {
    var page = req.params.page
    var results = []
    if (isNaN(page)) {
        return res.status(404).json({ results })
    }
    url = `${baseUrl}/?page=${page}`
    rs(url, (err, resp, html) => {

        if (!err) {
            try {

                var $ = cheerio.load(html)
                $('.img').each(function (index, element) {
                    let title = $(this).children('a').attr().title
                    let id = $(this).children('a').attr().href.slice(1)
                    let image = $(this).children('a').children('img').attr().src
                    let episodeNumber = $(this).parent().children('p.episode').text().replace(' ', '-').toLowerCase()
                    id = id.replace('-' + episodeNumber, '')
                    episodeNumber = episodeNumber.replace('episode-', '')
                    results[index] = { title, id, image, episodeNumber }
                })

                res.status(200).json({ results })
            }
            catch (e) {
                res.status(404).json({ error: 'Something went wrong' })
            }
        }

    })
})

//Genre List
app.get("/genrelist", (req, res) => {

    var list = []

    let url = `${baseUrl}`
    rs(url,  (err, resp, html) => {
        if (!err) {
            try {

                var $ =  cheerio.load(html)
                $('nav.genre').children('ul').children('li').each(function (index, element) {
                    list[index] = $(this).text()

                })
                res.status(200).json({ list })
            }
            catch (e) {
                res.status(404).json({ error: 'Something went wrong' })
            }
        }

    })
})

//List View
app.get('/list/:variable/:page', (req, res) => {
    var list = []
    var page = req.params.page
    if (isNaN(page)) {
        return res.status(404).json({ list })
    }
    var alphabet = req.params.variable
    let url = `${baseUrl}/anime-list.html?page=${page}`

    if (alphabet !== 'all') {
        url = `${baseUrl}/anime-list-${alphabet}?page=${page}`
    }
    rs(url, (err, resp, html) => {
        if (!err) {
            try {

                var $ = cheerio.load(html)
                $('ul.listing').children('li').each(function (index, element) {
                    let title = $(this).children('a').text()

                    let id = $(this).children('a').attr().href.slice(10)


                    list[index] = { title, id }
                })

                res.status(200).json({ list })
            }
            catch (e) {
                res.status(404).json({ error: 'Something went wrong' })
            }
        }
    })
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`);
});