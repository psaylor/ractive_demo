$(function() {

var getStoryThumbnailPartial = function() {
    return $.get("partials/story_thumbnail.html", function(html_data) {
        initRactive({
            template: html_data,
        });
    });
};

var getNavbarPartial = function() {
    return $.get('partials/header.html', function(html_data) {
        new Ractive({
            el: 'nav-header-container',
            template: html_data
        });
    });
};

stories = [
    {
        title: 'The Father and the Sons',
        link: './the_father_and_sons.html',
        image: './images/aesop.jpg',
    },
    {
        title: 'The Lion and the Mouse',
        link: './the_lion_and_mouse.html',
        image: './images/the_lion_and_mouse.jpg',
    },
    {
        title: 'The Madman Who Sold Wisdom',
        link: './the_madman_who_sold_wisdom.html',
        image: './images/aesop.jpg',
    },
    {
        title: 'The North Wind and the Sun',
        link: './the_north_wind.html',
        image: './images/aesop.jpg',
    },
    {
        title: 'The Oak and the Reeds',
        link: './the_oak_and_reeds.html',
        image: './images/the_oak_and_reeds.jpg',
    },
    {
        title: 'The Thrush and the Swallow',
        link: './the_thrush_and_swallow.html',
        image: './images/the_thrush_and_swallow.jpg',
    },
    {
        title: 'The Traveler and The Dog',
        link: './the_traveler_and_dog.html',
        image: './images/aesop.jpg',
    },
    {
        title: 'The Trees and the Axe',
        link: './the_trees_and_axe.html',
        image: './images/the_trees_and_axe.jpg',
    },
];

var storiesRactive;
var initRactive = function(options) {
    storiesRactive = new Ractive({
        el: 'stories-container',
        template: options.template,
        data: {
            stories: stories,
        },
    });
};

getNavbarPartial();
getStoryThumbnailPartial();

});
