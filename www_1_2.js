const http = require("http");
const fs = require ("fs");
const url = require ("url");
//faili idee haldamiseks moodul
const path = require("path");
const textRef = "txt/vanasõnad.txt";
const dateET = require("./src/dateTimeET");
const pageHead = '<!DOCTYPE html>\n<html lang="et"><head>\n<meta charset="utf-8">\n<title>Uus algus, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBanner = '<img src="/vp_banner_2025_TA.jpg" alt="kursuse banner">';
const pageBody = '<h1>Jan Marken Juhalu, esimene tund</h1>\n<p>Seda tundi õpetas Andrus Rinde ja seda ma kirjutan <a href="https://www.tlu.ee">Tallinna Ülikoolis</a>, sest ma olen nimedega mega halb</p>\n<hr>\n<p>Kirjtasin seda teksti kohe peale seda kuima selle kodust valmissain. Kui enda kohta midagi lisada siis ma lisaks et mulle meeldib rahvatants ja jõusaalis käia. Ja elu on keeruline</p>\n<hr>';
const pageFoot = '</body>\n</html>';

http.createServer(function(req, res) {
	//parsin url-id
	let currentURL = url.parse(req.url, true);
	console.log(currentURL.pathname);
    //res.writeHead(200, {"Content-type": "text/html"});
	
		if (currentURL.pathname === "/"){
			res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write(pageFoot);
		return res.end();
		}
		else if (currentURL.pathname === "/vanasonad"){
			fs.readFile(textRef, "utf8", (err, data)=>{
			
		if(err){
		//return res.end();	//res.write("Ongi nii!");
			res.writeHead(200, {"Content-type": "text/html"});	
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateET.weekDay() + dateET.fullTime() + dateET.partOfDay() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
			res.write(pageFoot);
			return res.end();
		} else {
				let folkWisdom = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < folkWisdom.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.writeHead(200, {"Content-type": "text/html"});
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateET.weekDay() + " " + dateET.fullTime() + " " + dateET.partOfDay() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>");
				res.write(folkWisdomOutput);
				res.write(pageFoot);
				return res.end();
			
			}
	})}
				

    //Kodus peab nii tegema
    //<ol>
      //  <li>Vanasõna</li>
        //<li>Vanasüna</li>
        //...
    //</ol>
	
	else if (currentURL.pathname === "/vp_banner_2025_TA.jpg"){
		//liidame muidu kättesaaamatu piltide kausta meie veebi failiteega
		let bannerPath = path.join(__dirname, "image");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/jpeg"});
				res.end(data);//saab saata andmeid
			}
		});
	}
	
	else {
		res.end("Viga 404, ei leia sellist lehte!!");
	}
	
	//git add .
	//git commit -m "Esimene veeb" (git commit -m "Lisatud node serveri amrsuudid"
	//git push

}).listen(5119);

