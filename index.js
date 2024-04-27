const http = require('http')

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'Nicola Tesla '
    },
    {
        id: 1,
        name: 'Albert Einsten'
    },
    {
        id: 2,
        name: 'Sir Isaac Newton'
    }

]

const server = http.createServer((req, res) =>{
    const items = req.url.split('/')
    // /friends/2=>['', 'friends', '2']
    if (req.method === 'POST'  && items[1] === 'friends'){
      req.on('data', (data) =>{
        const friend =  data.toString();
        console.log('Request :',friend)
        friends.push(JSON.parse(friend));
      
      });
      req.pipe(res);
    }else if(req.method === 'GET' && items[1] === 'friends'){
        res.statusCode = 200;
        res.setHeader = ('Content-Type', 'application/json');
        if (items.length === 3){   //checking whether the extra parameter id has been passed or not
               const friendIndex = Number(items[2]);
               res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends))
        }
        res.end(JSON.stringify());
    } else if (req.url === '/messages'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac</li>');
        res.write('<li>What are your thoughts on astronomy</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();

    } else {
        res.statusCode = 404;
        res.end()
    }
   
});

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
