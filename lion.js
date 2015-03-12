$(function() {

var story = {};
var data = {
    story: story,
    recording: false,
    recordingFragment: -1, // index of the fragment currently being recorded if any
    focusedFragment: 0,
    playbackReady: [], // a true or false for each fragment's playback readiness
    isFocused: function (fragNum) {
        return this.get('focusedFragment') === fragNum;
    },
    isRecording: function (fragNum) {
        return this.get('recordingFragment') === fragNum;
    },

};

orcaLoad = function(storyXMLPath) {
    console.log('orcaLoad');
    getStoryXML(storyXMLPath);
};

var storyRactive;

var getStoryPartial = function() {
    return $.get("partials/story.html", function(html_data) {
        console.log("Loaded the partial as ", typeof(html_data));
        initRactive(html_data)
    });
};

var initRactive = function(template) {
    storyRactive = new Ractive({
        el: 'story-container',
        template: template,
        data: data,
    });
    window.storyRactive = storyRactive;

    storyRactive.on('toggleRecord', function (event) {
        console.log("Toggled!", event);
        var jqueryNode = $(event.node);
        var fragmentNum = jqueryNode.data("fragment");
        if (storyRactive.get('recording')) {
            storyRactive.set('recordingFragment', -1);
            storyRactive.set('recording', false);
        } else {
            storyRactive.set('recording', true);
            storyRactive.set('recordingFragment', fragmentNum);
        }
    });

    storyRactive.on('hoverPanel', function (event) {
        console.log("Hover");
        var jqueryNode = $(event.node);
        var fragmentNum = jqueryNode.data("fragment");
        console.log("Hovered fragment:", fragmentNum);
        storyRactive.set('focusedFragment', fragmentNum);

    });

    storyRactive.on('unhoverPanel', function (event) {
        console.log("Unhover");
        var jqueryNode = $(event.node);
        storyRactive.set('focusedFragment', -1);
    });
};

var getStoryXML = function(storyXMLPath) {
    return $.get(storyXMLPath, function (xml_data) {
        // xml_data is an XML Document parsed from the file
        var $xml_data = $(xml_data);
        var title = $xml_data.find("title").text();
        title = $.trim(title);
        var content = $xml_data.find("content").text();
        content = $.trim(content).split(/\n/);
        console.log(title, content);
        prepareStory({title: title, content: content});
        getStoryPartial();
    });
};

var normalizeString = function (textSring){
    var punctuationRegex = /[.,?""''-;:]/g;
    var normalized = textSring.replace(punctuationRegex, '');
    normalized = normalized.toLowerCase();
    return normalized;
};

var prepareStory = function(storyInfo) {
    story.title = storyInfo.title;
    story.fragments = [];
    for (var i = 0; i < storyInfo.content.length; i++) {
        var line = storyInfo.content[i];
        story.fragments[i] = {
            words:  line.split(' '),
            text: normalizeString(line),
        };
        data.playbackReady[i] = false;
    }
    console.log("Story:", story);
};


});
