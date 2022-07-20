
let images = ['pexels-anna-shvets-4226119.jpg','pexels-olenka-sergienko-3646172.jpg','pexels-stanislav-kondratiev-2908984.jpg'];
let img = Math.floor(Math.random() * images.length);
document.getElementById('img').src = "/images/"+images[img];