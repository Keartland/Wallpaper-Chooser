images = [];
i=0;
buttons = "<button onclick=\"back()\" type=\"button\">Back</button><button onclick=\"next()\" type=\"button\">Next</button><button onclick=\"shuffle(images);\" type=\"button\">Shuffle</button>";

loadImages("https://api.github.com/repos/LukeSmithxyz/wallpapers/contents/")
document.getElementById('finished').innerHTML=buttons;
shuffle();

function next(){
  i = (i+1)%images.length;
  loadImg();
}
function back(){
    i = (i-1)%images.length;
    if(i<0){i=images.length-1}
    loadImg();
}
function loadImg(){
  console.log(i+":"+images[i]);
  width = screen.width/2;
  height = screen.height/2;
  document.getElementById('image').innerHTML = "<img onclick=\"window.open(\'"+images[i]+"\')\" src=\""+images[i]+"\" width=\""+width+"\" height=\""+height+"\">";
}

function shuffle() {
  var currentIndex = images.length;
  var temporaryValue=0;
  var randomIndex=0;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = images[currentIndex];
    images[currentIndex] = images[randomIndex];
    images[randomIndex] = temporaryValue;
  }
}

function loadImages(folder){
    getFileFromGithub(folder).then(function(files){  // gets files in folder as array
        console.log(files);
    for(var i = 0; i < files.length; i++) // loops through
    {
        if (files[i]["download_url"] == null) // checks if its a directory
        {
            loadImages(files[i]["url"]);// recursion
        } else {
            images.push(files[i]["download_url"]); // add files to images
        }
    }})
    return images; // returns the array
}

async function getFileFromGithub(folder){
  f = fetch(folder).then(r => r.json());
  return await f;
}
