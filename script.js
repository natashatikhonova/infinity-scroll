const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];


let count=30;
const apiKey='imYkW0QeB9_3w4scJWHVo2vsYbbseVIE3HSQXQmdDQI'
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}

//helper function to set attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

}
//create elemetns for links and pictures; add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //run function for each obj
    photosArray.forEach((photo)=>{
        //create <a> to link to unsplash
        const item=document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create img for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        //event listener: check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put img inside a, then put both inside imageContaoner
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get pictures from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //catch error
    }
}

//infinite scroll
window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
});

getPhotos();

