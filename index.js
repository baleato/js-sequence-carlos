var fs = require('fs'),
    system = require('system'),
    page = require('webpage').create(),
    content,
    htmlCode,
    outputFile;


if(system.args.length < 2){
    console.log('usage:');
    console.log('\t command input.txt [out.png]');
    phantom.exit(1);

}else{
    content = fs.read(system.args[1]);
    outputFile = system.args[2] || system.args[1] + '.png';

    htmlCode =
        '<html>' +
        '<head>' +
            '<script src="file://' + phantom.libraryPath + '/node_modules/underscore/underscore-min.js"></script>' +
            '<script src="file://' + phantom.libraryPath + '/node_modules/raphael/raphael-min.js"></script>' +
        '</head>' +
        '<body>' +
            '<div id="diagram"></div>' +
            '<textarea style="display:none">' + content + '</textarea>' +
            '<script src="file://' + phantom.libraryPath + '/lib/sequence-diagram-min.js"></script>' +
            '<script>' +
                'var diagram = Diagram.parse(document.querySelector("textarea").value);' +
                'diagram.drawSVG("diagram");' +
            '</script>' +
        '</body>' +
        '</html>';

    page.onLoadFinished = function(status) {
        page.render(outputFile);
        phantom.exit();
    };

    page.setContent(htmlCode, 'auto:blank');
}