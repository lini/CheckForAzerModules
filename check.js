'use strict';

var fs = require('fs'),
    affectedPackages = ['abril-fatface', 'ada', 'after-time', 'alert', 'andthen', 'anglicize', 'ansi-codes', 'atbash', 'attr', 'attrs', 'available-slug', 'background-image', 'ballet', 'binding', 'bind-key', 'blending-modes', 'boxcars', 'brick', 'brick-browser', 'brick-browserify-plugin', 'brick-node', 'browserify-length', 'bud', 'bud-babelify', 'bud-browserify', 'bud-concat', 'bud-indexhtml', 'bud-live-server', 'call-all', 'categorize-files', 'center-box', 'centered', 'centered-cover-background', 'change-object', 'change-object-path', 'checkfor', 'circle', 'cli-form', 'cli-qa', 'combiner', 'comma-list', 'comp', 'concat', 'config-doc', 'core-modules', 'cover-background', 'create-temp-dir', 'debounce-fn', 'declarative-js', 'default-debug', 'delegate-dom', 'dom-children', 'dom-classes', 'dom-event', 'domflow', 'domquery', 'dom-select', 'dom-style', 'dom-tree', 'dom-value', 'door', 'duba', 'eksi-server', 'eksi-sozluk', 'english-time', 'environ', 'every-time', 'expand-home-dir', 'failing-code', 'failing-line', 'filename-id', 'filter-stack', 'findall', 'first-val', 'flat-glob', 'flatten-array', 'flickr-client', 'flickr-favorites', 'flickr-following', 'flickr-generate-urls', 'flickr-photo-brick', 'flickr-photo-info', 'flickr-photo-urls', 'flickr-recent', 'flickr-user', 'flickr-user-feed', 'fog', 'format-date', 'format-text', 'fox', 'functools', 'genpkg', 'get-json', 'get-object-path', 'gezi', 'gezi-core', 'go', 'go-api-starter', 'goodeggs-list', 'goodeggs-login', 'hide', 'highkick', 'htmlglue', 'html-patcher', 'iframe', 'ignore-doc', 'img', 'indev', 'indexhtml', 'indexhtml-cli', 'infinite-scroll', 'install-module', 'is-node', 'iter', 'join-params', 'jsify', 'json-resources', 'just-a-browserify-server', 'just-a-server', 'just-next-tick', 'juxt', 'key-event', 'keyname-of', 'keynames', 'kik', 'kik-starter', 'kurdish-time', 'left-pad', 'less-common-words', 'level-client', 'level-flush', 'level-json', 'level-json-cache', 'level-json-wrapper', 'limited-parallel-loop', 'local-debug', 'lowkick', 'make-editable', 'map', 'matches-dom-selector', 'measure-time', 'media', 'medium-author', 'medium-post', 'memdiff', 'memoize-async', 'memoize-sync', 'memoize-with-leveldb', 'meta-tags', 'methodify', 'midibin-api', 'midi-instrument', 'midi-sdk', 'mime-of', 'mix-objects', 'most-common-turkish-words', 'most-common-words', 'mp3s', 'new-chain', 'new-command', 'new-element', 'new-empty-array', 'new-error', 'new-format', 'new-list', 'new-object', 'new-partial', 'new-prop', 'new-pubsub', 'new-range', 'new-reactive', 'new-struct', 'next-time', 'observer', 'one', 'on-key-press', 'on-off', 'ourtunes', 'outer-html', 'package-path', 'parallel-loop', 'parallelly', 'parse-path', 'pause-function', 'personal-api', 'play-audio', 'playfair-display', 'play-url', 'post-data', 'pref', 'prettify-error', 'prompt-input', 'propertify', 'property', 'prova', 'provinces', 'pt-mono', 'pt-serif', 'pubsub', 'radio-paradise-api', 'random-color', 'rdio-js-api', 'read-cli-input', 'read-json', 'redux-starter', 'refine-object', 'relative-date', 'remotely', 'render-loop', 'require-sdk', 'right-pad', 'rimraf-glob', 'rm-rf', 'rname', 'rnd', 'route-map', 'run-after', 'run-paralelly', 'run-serially', 'sanitize-object', 'scrape-eksi', 'scrape-pages', 'scrape-url', 'scraping-eksi', 'scroll-bottom', 'select-dom', 'serial-loop', 'serially', 'set-content-type', 'set-object-path', 'setup-docker', 'shell-jobs', 'show-help', 'show-version', 'shuffle-array', 'simple.io', 'simulate-touch', 'slug-to-title', 'socks-browser', 'soundcloud-stream', 'stream-format', 'strip', 'styled', 'style-dom', 'style-format', 'subscribe', 'subscription', 'title-from-url', 'toba-batak-dictionary', 'to-class-name', 'toledo-chess', 'to-slug', 'to-title', 'try-call', 'turkish-alphabet', 'turkish-synonyms-api', 'turkish-time', 'unique-now', 'uniques', 'userbook', 'uzo', 'validate-value', 'variable-name', 'video-canvas', 'video-dimensions', 'virtualbox', 'virtual-glue', 'virtual-html', 'watch-array', 'web-assets', 'with-env', 'wysiwyg', 'youtube-video'],
    argv = process.argv,
    file;

function check(packages) {
    var i;

    function checkDeps(deps) {
        var used = '', key;
        for (key in deps) {
            if (deps.hasOwnProperty(key)) {
                if (affectedPackages.indexOf(key) !== -1) {
                    used += ' ' + key;
                }
            }
        }
        return used;
    }

    function checkFile(err, data) {
        if (err) {
            return console.log('Cannot open file: ' + (err && err.message));
        }

        if (!data) {
            return;
        }

        var used;
        try {
            data = JSON.parse(data);
        } catch (e) {
            return console.log('File is not valid JSON: ' + (e && e.message));
        }
        if (data) {
            if (data.dependencies) {
                used = checkDeps(data.dependencies);
                if (used) {
                    console.log(data.name + ' uses:' + used);
                }
            }
            if (data.devDependencies) {
                used = checkDeps(data.devDependencies);
                if (used) {
                    console.log(data.name + ' uses:' + used);
                }
            }
        }
    }

    for (i = packages.length - 1; i >= 0; i--) {
        if (packages[i]) {
            fs.readFile(packages[i], { encoding: 'utf8' }, checkFile);
        }
    }
}

if (!argv || !argv.length || argv.length < 3) {
    return console.log('Please pass an argument: file with paths to package.json files');
}

file = argv[2];
if (!file || !file.length) {
    return console.log('Invalid Argument!');
}

fs.readFile(file, { encoding: 'utf8' }, function (err, data) {
    if (err) {
        return console.log('Cannot open file: ' + (err && err.message));
    }
    var packages = data.split('\n');
    check(packages);
});

