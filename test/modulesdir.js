var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var fromArgs = require('../bin/args.js');


test('node modulesdir', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.add(__dirname + '/modulesdir/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (out) {
                t.equal(out, 'NODE');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});

test('bower modulesdir', function (t) {
    t.plan(1);
    
    var opts = {lookup: {bogus: {modulesDir: 'bower_components'}}};
    var b = browserify(opts);
    b.add(__dirname + '/modulesdir/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (out) {
                t.equal(out, 'BOWER');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});


test('modulesdir from an arguments array', function (t) {
    t.plan(1);

    var b = fromArgs([ __dirname + '/modulesdir/main.js', '--lookup', 'bogus:bower_components']);
    b.bundle(function (err, src) {
        var c = {
            done : function (out) {
                t.equal(out, 'BOWER');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    })

});
