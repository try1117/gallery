// let defaultImageURL = "http://seismonepal.gov.np/assets/img/no_image.jpg";
let defaultImageURL = "https://try1117.github.io/gallery/images/placeholder.jpg";

// let imagesURL = [
//     "https://upload.wikimedia.org/wikipedia/commons/9/93/20030820-antelope-canyon.jpg",
//     "https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_960_720.jpg",
//     "https://images.pexels.com/photos/34950/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34923/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34913/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34942/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34953/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34922/pexels-photo.jpg",
//     "https://images.pexels.com/photos/34930/pexels-photo.jpg",
//     "https://images.pexels.com/photos/349/pexels-photo.jpg",
// ];

let mainGalleryImagesURL = [
    "https://try1117.github.io/gallery/images/0.jpg",
    "https://try1117.github.io/gallery/images/1.jpg",
    "https://try1117.github.io/gallery/images/2.jpg",
    "https://try1117.github.io/gallery/images/3.jpg",
    "https://try1117.github.io/gallery/images/4.jpg",
    "https://try1117.github.io/gallery/images/5.jpg",
    "https://try1117.github.io/gallery/images/6.jpg",
    "https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_960_720.jpg",
    "https://try1117.github.io/gallery/images/7.jpg",
    "https://try1117.github.io/gallery/images/8.jpg",
    "https://try1117.github.io/gallery/images/9.jpg",
    "https://try1117.github.io/gallery/images/10.jpg",
    "https://try1117.github.io/gallery/images/11.jpg",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg",
    "https://i.imgur.com/4y0EZuG.jpg",
    "https://i.imgur.com/CrHYfTG.jpg",
    "https://i.imgur.com/gQp3VSW.jpg",
    "https://i.imgur.com/M0SKsEE.jpg",
    "https://i.imgur.com/aBONniI.jpg",
    "https://i.imgur.com/eb4dOra.jpg",
    "https://i.imgur.com/qBz4xcn.jpg",
    "https://i.imgur.com/YEBeHG1.jpg",
    "https://i.imgur.com/oDwCk03.jpg",
    "https://i.imgur.com/6lP5BND.jpg",
    "https://i.imgur.com/hjHoxsp.jpg",
    "https://i.imgur.com/WUNSgmp.jpg",
    "https://i.imgur.com/PKU3RSE.jpg",
    "https://i.imgur.com/9mgcdli.jpg",
    "https://i.imgur.com/3NBq6n2.jpg",
    "https://i.imgur.com/74YY5FE.jpg",
    "https://i.imgur.com/EXsE5EM.jpg",
    "https://i.imgur.com/FR5BxXW.jpg",
    "https://i.imgur.com/05pGzjI.jpg",
    "https://i.imgur.com/rS9ttuE.jpg",
    "https://i.imgur.com/ypi2aRe.jpg",
];

window.onload = function() {
    let createTotalProgressBar = (id) => new ProgressBar.Line("#" + id, {
        color: '#3a3a3a',
        trailColor: 'darkgrey',
        duration: 50,
        text: {
            style:{},
            autoStyleContainer: true,
        },
        step: function(state, progressBar, attachment) {
            progressBar.setText(Math.round(100 * progressBar.value()) + ' %');
        },
    });

    let createImageProgressBar = (id) => new ProgressBar.Circle("#" + id, {
        strokeWidth: 6,
        color: '#3a3a3a',
        duration: 50,
    });

    let galleriesParameters = [
        [
            'main-gallery',
            'main-gallery-total-progress',
            mainGalleryImagesURL,
            defaultImageURL,
            createImageProgressBar,
            createTotalProgressBar,
            ['progress-circle'],
        ],
    ];

    for (let galleryParameters of galleriesParameters) {
        new Gallery(...galleryParameters);
    }
}
