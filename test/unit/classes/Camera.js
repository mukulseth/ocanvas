var expect = require('expect.js');
var Camera = require('../../../classes/Camera');
var Matrix = require('../../../classes/Matrix');

describe('Camera', function() {

  describe('Camera constructor', function() {

    var camera = new Camera({name: 'Camera'});

    it('should return a cached instance if there is one with the same ID', function() {
      var camera2 = new Camera({id: camera.id});
      expect(camera).to.equal(camera2);
    });

    it('should set any properties passed in', function() {
      expect(camera.name).to.equal('Camera');
    });

    it('should set the default value of property `world` to null', function() {
      expect(camera.world).to.equal(null);
    });

    it('should set the default value of property `x` to 150', function() {
      expect(camera.x).to.equal(150);
    });

    it('should set the default value of property `y` to 75', function() {
      expect(camera.y).to.equal(75);
    });

    it('should set the default value of property `rotation` to 0', function() {
      expect(camera.rotation).to.equal(0);
    });

    it('should set the default value of property `zoom` to 1', function() {
      expect(camera.zoom).to.equal(1);
    });

    it('should set the default value of property `width` to 300', function() {
      expect(camera.width).to.equal(300);
    });

    it('should set the default value of property `height` to 150', function() {
      expect(camera.height).to.equal(150);
    });

    it('should set the default value of property `aspectRatio` to 2', function() {
      expect(camera.aspectRatio).to.equal(2);
    });

    it('should set the value of property `aspectRatio` correctly based on the options', function() {
      var camera1 = new Camera({width: 600});
      expect(camera1.aspectRatio).to.equal(4);
      var camera2 = new Camera({height: 100});
      expect(camera2.aspectRatio).to.equal(3);
      var camera3 = new Camera({width: 200, height: 100});
      expect(camera3.aspectRatio).to.equal(2);
      var camera4 = new Camera({aspectRatio: 6});
      expect(camera4.aspectRatio).to.equal(6);
      expect(camera4.width).to.equal(900);
      expect(camera4.height).to.equal(150);
    });

    it('should set the default value of property `matrixCache` to an object', function() {
      expect(typeof camera.matrixCache).to.equal('object');
    });

    it('should set the default value of property `vertexCache` to an object', function() {
      expect(typeof camera.vertexCache).to.equal('object');
    });

  });

  describe('.cache', function() {

    it('should keep a cache of all camera instances', function() {
      expect(Camera.cache).to.be.ok();
      var camera = new Camera();
      expect(Camera.cache[camera.id]).to.equal(camera);
    });

  });

  describe('.objectProperties', function() {

    it('should be an array of property names', function() {
      expect(Array.isArray(Camera.objectProperties)).to.equal(true);
      expect(typeof Camera.objectProperties[0]).to.equal('string');
    });

  });

  describe('.generateID()', function() {

    it('should generate a new ID each time', function() {
      expect(Camera.generateID()).to.not.equal(Camera.generateID());
    });

  });

  describe('.fromObject()', function() {

    var cameraData = {
      id: '1ab',
      x: 200,
      y: 10,
      width: 300,
      height: 100,
      aspectRatio: 3,
      zoom: 1.5,
      rotation: 90
    };

    it('should create a Camera instance from a data object', function() {
      var camera = Camera.fromObject(cameraData);
      expect(camera instanceof Camera).to.equal(true);
      expect(camera.id).to.equal(cameraData.id);
      expect(camera.x).to.equal(cameraData.x);
      expect(camera.y).to.equal(cameraData.y);
      expect(camera.width).to.equal(cameraData.width);
      expect(camera.height).to.equal(cameraData.height);
      expect(camera.aspectRatio).to.equal(cameraData.aspectRatio);
      expect(camera.zoom).to.equal(cameraData.zoom);
      expect(camera.rotation).to.equal(cameraData.rotation);
    });

    it('should get the camera instance from the cache if one with the same ID exists', function() {
      var cameraData1 = Object.create(cameraData);
      cameraData1.id = '2ab';
      var camera1 = Camera.fromObject(cameraData1);
      var camera2 = Camera.fromObject(cameraData1);
      expect(camera1).to.equal(camera2);
    });

  });

  describe('.fromJSON()', function() {

    var cameraData = {
      id: '3ab',
      x: 200,
      y: 10,
      width: 300,
      height: 100,
      aspectRatio: 3,
      zoom: 1.5,
      rotation: 90
    };
    var cameraDataJSON = JSON.stringify(cameraData);

    it('should create a Camera instance from a JSON string', function() {
      var camera = Camera.fromJSON(cameraDataJSON);
      expect(camera instanceof Camera).to.equal(true);
      expect(camera.id).to.equal(cameraData.id);
      expect(camera.x).to.equal(cameraData.x);
      expect(camera.y).to.equal(cameraData.y);
      expect(camera.width).to.equal(cameraData.width);
      expect(camera.height).to.equal(cameraData.height);
      expect(camera.aspectRatio).to.equal(cameraData.aspectRatio);
      expect(camera.zoom).to.equal(cameraData.zoom);
      expect(camera.rotation).to.equal(cameraData.rotation);
    });

    it('should get the camera instance from the cache if one with the same ID exists', function() {
      var cameraData1 = Object.create(cameraData);
      cameraData1.id = '4ab';
      var cameraDataJSON1 = JSON.stringify(cameraData1);
      var camera1 = Camera.fromJSON(cameraDataJSON1);
      var camera2 = Camera.fromJSON(cameraDataJSON1);
      expect(camera1).to.equal(camera2);
    });

  });

  describe('#toObject()', function() {

    it('should create a data object from all specified properties', function() {
      var camera = new Camera({
        x: 200,
        y: 10,
        width: 300,
        height: 100,
        aspectRatio: 3,
        zoom: 1.5,
        rotation: 90
      });

      var cameraData = camera.toObject();

      var props = Camera.objectProperties;
      for (var i = 0, l = props.length; i < l; i++) {
        expect(cameraData[props[i]]).to.equal(camera[props[i]]);
      }

      expect(cameraData.__class__).to.equal('Camera');
    });

  });

  describe('#toJSON()', function() {

    it('should create a JSON string from all specified properties', function() {
      var camera = new Camera({
        x: 200,
        y: 10,
        width: 300,
        height: 100,
        aspectRatio: 3,
        zoom: 1.5,
        rotation: 90
      });

      var cameraDataJSON = camera.toJSON();
      var cameraData = JSON.parse(cameraDataJSON);

      var props = Camera.objectProperties;
      for (var i = 0, l = props.length; i < l; i++) {
        expect(cameraData[props[i]]).to.equal(camera[props[i]]);
      }

      expect(cameraData.__class__).to.equal('Camera');
    });

  });

  describe('#setProperties()', function() {

    it('should set any properties passed in', function() {
      var camera = new Camera();
      expect(camera.name).to.equal(undefined);
      camera.setProperties({
        name: 'Camera'
      });
      expect(camera.name).to.equal('Camera');
    });

  });

  describe('#getTransformationMatrix()', function() {

    it('should return a matrix that contains translation', function() {
      var camera = new Camera({x: 10, y: 20});
      expect(camera.getTransformationMatrix().toArray()).to.eql([1, 0, 10, 0, 1, 20, 0, 0, 1]);
    });

    it('should return a matrix that contains rotation', function() {
      var camera = new Camera({rotation: 10, x: 0, y: 0});
      expect(camera.getTransformationMatrix().toArray()).to.eql([
        0.984807753012208,
        -0.17364817766693033,
        0,
        0.17364817766693033,
        0.984807753012208,
        0,
        0,
        0,
        1
      ]);
    });

    it('should return a matrix that contains scaling', function() {
      var camera = new Camera({zoom: 0.5, x: 0, y: 0});
      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);
    });

    it('should return a matrix that combines translation, rotation and scaling', function() {
      var camera = new Camera({
        x: 10, y: 20,
        rotation: 10,
        zoom: 0.5
      });

      expect(camera.getTransformationMatrix().toArray()).to.eql([
        0.492403876506104,
        -0.08682408883346517,
        10,
        0.08682408883346517,
        0.492403876506104,
        20,
        0,
        0,
        1
      ]);

    });

    it('should return a cached matrix if nothing has changed', function(done) {
      var camera = new Camera({zoom: 0.5, x: 0, y: 0});
      var matrix = camera.getTransformationMatrix();
      var setData = matrix.setData;
      var setDataCalled = false;
      matrix.setData = function() {
        setDataCalled = true;
        setData.apply(this, arguments);
      };
      expect(matrix.toArray()).to.eql([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);

      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);

      setTimeout(function() {
        if (!setDataCalled) done();
        else done(new Error('The matrix was updated and did not use the cache'));
      }, 10);
    });

    it('should return an updated matrix when position has changed', function() {
      var camera = new Camera({zoom: 0.5, x: 0, y: 0});

      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);

      camera.x = 20;

      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 20, 0, 0.5, 0, 0, 0, 1]);

      camera.y = 30;

      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 20, 0, 0.5, 30, 0, 0, 1]);
    });

    it('should return an updated matrix when rotation has changed', function() {
      var camera = new Camera({rotation: 0, x: 0, y: 0});

      expect(camera.getTransformationMatrix().toArray()).to.eql([1, 0, 0, 0, 1, 0, 0, 0, 1]);

      camera.rotation = 10;

      expect(camera.getTransformationMatrix().toArray()).to.eql([
        0.984807753012208,
        -0.17364817766693033,
        0,
        0.17364817766693033,
        0.984807753012208,
        0,
        0,
        0,
        1
      ]);
    });

    it('should return an updated matrix when scaling has changed', function() {
      var camera = new Camera({zoom: 2, x: 0, y: 0});

      expect(camera.getTransformationMatrix().toArray()).to.eql([2, 0, 0, 0, 2, 0, 0, 0, 1]);

      camera.zoom = 0.5;

      expect(camera.getTransformationMatrix().toArray()).to.eql([0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]);
    });

    it('should create a cached matrix for reversed translation', function() {
      var camera = new Camera({x: 10, y: 20});
      camera.getTransformationMatrix();

      expect(camera.matrixCache.translation.matrixReverse.toArray()).to.eql([1, 0, -10, 0, 1, -20, 0, 0, 1]);
    });

  });

  describe('#getGlobalPoint()', function() {

    it('should return a point in global space', function() {
      var camera = new Camera({x: 150, y: 75});
      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});
    });

    it('should return a cached point if nothing has changed', function(done) {
      var camera = new Camera({x: 150, y: 75});

      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      var globalPointMatrix = camera.matrixCache.globalPoint.matrix;
      var setData = globalPointMatrix.setData;
      var setDataCalled = false;
      globalPointMatrix.setData = function() {
        setDataCalled = true;
        setData.apply(this, arguments);
      };

      point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      setTimeout(function() {
        if (!setDataCalled) done();
        else done(new Error('The matrix was updated and did not use the cache'));
      }, 10);

    });

    it('should return an updated global point if position has changed', function() {
      var camera = new Camera({x: 150, y: 75});

      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      camera.x = 300;

      point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 310, y: 85});

      camera.y = 200;

      point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 310, y: 210});
    });

    it('should return an updated global point if rotation has changed', function() {
      var camera = new Camera({x: 150, y: 75});

      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      camera.rotation = 45;

      point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 150, y: 89.14213562373095});
    });

    it('should return an updated global point if zoom has changed', function() {
      var camera = new Camera({x: 150, y: 75});

      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      camera.zoom = 2;

      point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 170, y: 95});
    });

    it('should return an updated global point if a different local point was passed in', function() {
      var camera = new Camera({x: 150, y: 75});

      var point = camera.getGlobalPoint(10, 10);
      expect(point).to.eql({x: 160, y: 85});

      point = camera.getGlobalPoint(20, 20);
      expect(point).to.eql({x: 170, y: 95});
    });

  });

  describe('#getVertices()', function() {

    it('should return the coordinates of all vertices of the camera', function() {
      var camera = new Camera({width: 100, height: 50});
      var vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -50, y: -25});
      expect(vertices[1]).to.eql({x: 50, y: -25});
      expect(vertices[2]).to.eql({x: 50, y: 25});
      expect(vertices[3]).to.eql({x: -50, y: 25});
    });

    it('should return a cached array if nothing has changed', function(done) {
      var camera = new Camera({
        width: 100,
        height: 50
      });
      var vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -50, y: -25});

      var hasBeenSet = false;
      var x = vertices[0].x;
      Object.defineProperty(vertices[0], 'x', {
        get: function() { return x; },
        set: function(value) {
          x = value;
          hasBeenSet = true;
        }
      });

      camera.getVertices();

      setTimeout(function() {
        if (hasBeenSet) done(new Error('The vertex was updated and did not use the cache'));
        else done();
      }, 10);
    });

    it('should return an updated array if width has changed', function() {
      var camera = new Camera({
        width: 100,
        height: 50
      });
      var vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -50, y: -25});
      expect(vertices[1]).to.eql({x: 50, y: -25});
      expect(vertices[2]).to.eql({x: 50, y: 25});
      expect(vertices[3]).to.eql({x: -50, y: 25});

      camera.width = 200;
      vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -100, y: -25});
      expect(vertices[1]).to.eql({x: 100, y: -25});
      expect(vertices[2]).to.eql({x: 100, y: 25});
      expect(vertices[3]).to.eql({x: -100, y: 25});
    });

    it('should return an updated array if height has changed', function() {
      var camera = new Camera({
        width: 100,
        height: 50
      });
      var vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -50, y: -25});
      expect(vertices[1]).to.eql({x: 50, y: -25});
      expect(vertices[2]).to.eql({x: 50, y: 25});
      expect(vertices[3]).to.eql({x: -50, y: 25});

      camera.height = 100;
      vertices = camera.getVertices();

      expect(vertices[0]).to.eql({x: -50, y: -50});
      expect(vertices[1]).to.eql({x: 50, y: -50});
      expect(vertices[2]).to.eql({x: 50, y: 50});
      expect(vertices[3]).to.eql({x: -50, y: 50});
    });

  });

  describe('#getGlobalVertices()', function() {

    it('should return the coordinates of all vertices of the camera', function() {
      var camera = new Camera({
        width: 100, height: 50,
        x: 100, y: 50,
        rotation: 45,
        zoom: 2
      });
      var vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 64.64466094067262, y: -56.06601717798212});
      expect(vertices[1]).to.eql({x: 206.06601717798213, y: 85.35533905932736});
      expect(vertices[2]).to.eql({x: 135.35533905932738, y: 156.06601717798213});
      expect(vertices[3]).to.eql({x: -6.066017177982133, y: 14.644660940672637});
    });

    it('should return a cached array if nothing has changed', function(done) {
      var camera = new Camera({
        width: 100, height: 50,
        x: 100, y: 50
      });
      var vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 50, y: 25});

      var hasBeenSet = false;
      var zero = vertices[0];
      Object.defineProperty(vertices, '0', {
        get: function() { return zero; },
        set: function(value) {
          zero = value;
          hasBeenSet = true;
        }
      });

      camera.getGlobalVertices();

      setTimeout(function() {
        if (hasBeenSet) done(new Error('The vertex was updated and did not use the cache'));
        else done();
      }, 10);
    });

    it('should return an updated array if width has changed', function() {
      var camera = new Camera({
        width: 100, height: 50,
        x: 100, y: 50
      });
      var vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 50, y: 25});
      expect(vertices[1]).to.eql({x: 150, y: 25});
      expect(vertices[2]).to.eql({x: 150, y: 75});
      expect(vertices[3]).to.eql({x: 50, y: 75});

      camera.width = 200;
      vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 0, y: 25});
      expect(vertices[1]).to.eql({x: 200, y: 25});
      expect(vertices[2]).to.eql({x: 200, y: 75});
      expect(vertices[3]).to.eql({x: 0, y: 75});
    });

    it('should return an updated array if height has changed', function() {
      var camera = new Camera({
        width: 100, height: 50,
        x: 100, y: 50
      });
      var vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 50, y: 25});
      expect(vertices[1]).to.eql({x: 150, y: 25});
      expect(vertices[2]).to.eql({x: 150, y: 75});
      expect(vertices[3]).to.eql({x: 50, y: 75});

      camera.height = 100;
      vertices = camera.getGlobalVertices();

      expect(vertices[0]).to.eql({x: 50, y: 0});
      expect(vertices[1]).to.eql({x: 150, y: 0});
      expect(vertices[2]).to.eql({x: 150, y: 100});
      expect(vertices[3]).to.eql({x: 50, y: 100});
    });

  });

  describe('#matrixCache', function() {

    it('should have six objects for matrices (translation, rotation, scaling, combined, localPoint, globalPoint)', function() {
      var camera = new Camera();

      expect(camera.matrixCache.combined).to.eql({valid: false, matrix: null});
      expect(camera.matrixCache.translation).to.eql({valid: false, matrix: null, matrixReverse: null});
      expect(camera.matrixCache.rotation).to.eql({valid: false, matrix: null});
      expect(camera.matrixCache.scaling).to.eql({valid: false, matrix: null});
      expect(camera.matrixCache.localPoint).to.eql({valid: false, matrix: null});
      expect(camera.matrixCache.globalPoint).to.eql({valid: false, matrix: null});
    });

    it('should store Matrix instances after first calculation', function() {
      var camera = new Camera();
      camera.getTransformationMatrix();
      camera.getGlobalPoint(2, 2);

      var cache = camera.matrixCache;

      expect(cache.combined.matrix instanceof Matrix).to.equal(true);
      expect(cache.translation.matrix instanceof Matrix).to.equal(true);
      expect(cache.translation.matrixReverse instanceof Matrix).to.equal(true);
      expect(cache.rotation.matrix instanceof Matrix).to.equal(true);
      expect(cache.scaling.matrix instanceof Matrix).to.equal(true);
      expect(cache.localPoint.matrix instanceof Matrix).to.equal(true);
      expect(cache.globalPoint.matrix instanceof Matrix).to.equal(true);
    });

    it('should have an invalidate method to invalidate all matrices', function() {
      var camera = new Camera();
      camera.getTransformationMatrix();
      camera.getGlobalPoint(2, 2);

      var cache = camera.matrixCache;

      expect(cache.combined.valid).to.equal(true);
      expect(cache.translation.valid).to.equal(true);
      expect(cache.rotation.valid).to.equal(true);
      expect(cache.scaling.valid).to.equal(true);
      expect(cache.localPoint.valid).to.equal(true);
      expect(cache.globalPoint.valid).to.equal(true);

      cache.invalidate();

      expect(cache.combined.valid).to.equal(false);
      expect(cache.translation.valid).to.equal(false);
      expect(cache.rotation.valid).to.equal(false);
      expect(cache.scaling.valid).to.equal(false);
      expect(cache.localPoint.valid).to.equal(false);
      expect(cache.globalPoint.valid).to.equal(false);
    });

    it('should have an invalidate method to invalidate one type of matrix (plus the combined)', function() {
      var camera = new Camera();
      camera.getTransformationMatrix();
      camera.getGlobalPoint(2, 2);

      var cache = camera.matrixCache;

      expect(cache.combined.valid).to.equal(true);
      expect(cache.translation.valid).to.equal(true);
      expect(cache.rotation.valid).to.equal(true);
      expect(cache.scaling.valid).to.equal(true);
      expect(cache.localPoint.valid).to.equal(true);
      expect(cache.globalPoint.valid).to.equal(true);

      cache.invalidate('translation');

      expect(cache.combined.valid).to.equal(false);
      expect(cache.translation.valid).to.equal(false);
      expect(cache.rotation.valid).to.equal(true);
      expect(cache.scaling.valid).to.equal(true);
      expect(cache.localPoint.valid).to.equal(false);
      expect(cache.globalPoint.valid).to.equal(false);
    });

  });

  describe('#vertexCache', function() {

    it('should have one object for vertices (local)', function() {
      var camera = new Camera();

      expect(camera.vertexCache.local).to.eql({valid: false, vertices: null});
    });

    it('should have an invalidate method to invalidate all vertices', function() {
      var camera = new Camera();
      var cache = camera.vertexCache;
      cache.local.valid = true;

      cache.invalidate();

      expect(cache.local.valid).to.equal(false);
    });

    it('should have an invalidate method to invalidate one type of vertices', function() {
      var camera = new Camera();
      var cache = camera.vertexCache;
      cache.local.valid = true;

      cache.invalidate('local');

      expect(cache.local.valid).to.equal(false);
    });

  });

  describe('#width', function() {

    it('should not change `x` when changed', function() {
      var camera = new Camera({width: 300, height: 150});
      expect(camera.width).to.equal(300);
      expect(camera.x).to.equal(150);

      camera.width = 500;

      expect(camera.width).to.equal(500);
      expect(camera.x).to.equal(150);
    });

  });

  describe('#height', function() {

    it('should not change `y` when changed', function() {
      var camera = new Camera({width: 300, height: 150});
      expect(camera.height).to.equal(150);
      expect(camera.y).to.equal(75);

      camera.height = 300;

      expect(camera.height).to.equal(300);
      expect(camera.y).to.equal(75);
    });

  });

});
