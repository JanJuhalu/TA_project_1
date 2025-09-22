const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageHead = '<!DOCTYPE html>\n<html lang="et"><head>\n<meta charset="utf-8">\n<title>Uus algus, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '<h1>Jan Marken Juhalu, esimene tund</h1>\n<p>Seda tundi õpetas Andrus Rinde ja seda ma kirjutan <a href="https://www.tlu.ee">Tallinna Ülikoolis</a>, sest ma olen nimedega mega halb</p>\n<hr>\n<p>Kirjtasin seda teksti kohe peale seda kuima selle kodust valmissain. Kui enda kohta midagi lisada siis ma lisaks et mulle meeldib rahvatants ja jõusaalis käia. Ja elu on keeruline</p>\n<hr>';
const pageFoot = '</body>\n</html>';

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
    //res.write("Ongi nii!");
    res.write(pageHead);
    res.write(pageBody);
    res.write("\n\t<p>Täna on " + dateEt.weekDay() + dateET.fullTime() + dateET.partOfDay());
    res.write(pageFoot);
    return res.end();

    //Kodus peab nii tegema
    //<ol>
      //  <li>Vanasõna</li>
        //<li>Vanasüna</li>
        //...
    //</ol>
	
	

}).listen(5119);

