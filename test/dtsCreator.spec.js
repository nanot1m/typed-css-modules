'use strict';

var path = require('path');
var assert = require('assert');
var DtsCreator = require('../lib/dtsCreator').DtsCreator;

describe('DtsCreator', () => {
  var creator = new DtsCreator();

  describe('#create', () => {
    it('returns DtsContent instance', done => {
      creator.create('test/testStyle.css').then(content => {
        assert.equal(content.contents.length, 1);
        assert.equal(content.contents[0], "export const myClass: string;")
        done();
      });
    });
  });

  describe('#modify path', () => {
    it('can be set outDir', done => {
      new DtsCreator({searchDir: "test", outDir: "dist"}).create('test/testStyle.css').then(content => {
        assert.equal(path.relative(process.cwd(), content.outputFilePath), "dist/testStyle.css.d.ts");
        done();
      });
    });
  });

});

describe('DtsContent', () => {
  describe('#writeFile', () => {
    it('writes a file', done => {
      new DtsCreator().create('test/testStyle.css').then(content => {
        return content.writeFile();
      }).then(() => {
        done();
      });
    });
  });

});
