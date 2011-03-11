
function init() {
    
    with(pictureFrame.style)
	top=16,left=17,width=320, height=240;

    with(slideshowBg.style)
	width=360,height=280;

    slideshowBg.src="url(images/slideshow_glass_frame.png)";

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200
            && /text\/xml/.exec(request.getResponseHeader("Content-Type"))) {
            var doc = request.responseXML;
            var imagelinks = getContentImageLinks(doc);
//            System.Debug.outputString(imagelinks[0]);
            picture.src = imagelinks[0];
        }
    };
    request.open("GET", "http://blog.livedoor.jp/dokubutu/index.rdf");
    request.send(null);
}

function getContentImageLinks(xml) {
    var elem = document.createElement('div');
    var contents = xml.getElementsByTagName("content:encoded");
    var out = [];
    var i,j;
    tempbuf.appendChild(elem);
    for (i = 0; i < contents.length; i++) {
        elem.innerHTML = contents[i].firstChild.nodeValue;
        var links = document.getElementsByTagName("a");
        var reg = /\.jpe?g$/i;
        for (j = 0; j < links.length; j++) {
            var href = links[j].getAttribute("href");
            if (reg.test(href)) {
//                System.Debug.outputString(href);
                out.push(href);
            }
        }
    }
    tempbuf.removeChild(elem);
    return out;
}
