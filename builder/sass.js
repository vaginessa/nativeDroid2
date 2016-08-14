'use strict';

let sass = require('node-sass');
let config = require('./../config.json');
let fs = require('fs');
let autoprefixer = require('autoprefixer');
let postcss = require('postcss');

sass.render(
    {
        file: config.sass.file,
        outputStyle: config.sass.outputStyle,
        outFile: config.sass.outFile,
    }, function (error, result) {
        if (!error) {
            // Autoprefixer
            postcss([autoprefixer])
                .process(result.css)
                .then(
                    function (result) {
                        fs.writeFile(
                            config.sass.outFile,
                            result.css,
                            function (err) {
                                if (!err) {
                                    //file written on disk
                                }
                            }
                        );
                    }
                );

        }
    }
);
