const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unplash API
const count = 30
const apiKey = 'jsgjvT_EqpsdlmOS_cCFgURDhQZ5Zhvru9_Ou-596Gk'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
        console.log('ready = ', ready)
    }
}

// Helper functions to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> link to Unplash
        const item = document.createElement('a')

        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img')

        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
} 

// Get photos from Unplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        // console.log(photosArray)
    }catch(error){
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () =>{
    // console.log('scrolled')
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
        console.log('Load more')
    }
})

// On Load
getPhotos()