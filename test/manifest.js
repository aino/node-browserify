var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var fromArgs = require('../bin/args.js');


test('bower manifest', function (t) {
    t.plan(1);
    
    var opts = {lookup: {bogus: {modulesDir: 'bower_components', manifest: 'bower.json'}}};
    var b = browserify(opts);
    b.add(__dirname + '/modulesdir/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (out) {
                t.equal(out, 'BOWERMANIFEST');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});

test('manifest from an arguments array', function (t) {
    t.plan(1);

    var b = fromArgs([ __dirname + '/modulesdir/main.js', '--lookup', 'bogus:bower_components:bower.json']);
    b.bundle(function (err, src) {
        var c = {
            done : function (out) {
                t.equal(out, 'BOWERMANIFEST');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});
