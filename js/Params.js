/**
 * Created by unctrl.com
 * User: mannytan
 * Date: 03/20/12
 */

 var VEIL = VEIL || {};

 VEIL.Params = {};
 VEIL.Sliders = {};

 VEIL.Params = function(name) {
 	var scope = this;

 	UNCTRL.BoilerPlate.call(this);

 	this.name = 'Params';
 	this.scope3d = null;

 	this.init = function() {
 		this.traceFunction("init");
 		return this;
 	};

 	this.createGui = function() {

 		VEIL.Params = {
 			orbitSpeed: 0.0015,
 			guiWidth: 250,
 			radius: 200,
 			radiusRange: .75,
 			centerRadius: 10,
 			centerSpeed: 0.1,
 			centerOffset: 0.001,
 			multiplier: 10.0005,
 			heightOffset: 10,
 			waterHeight: 10,
 			maxHeightRange: 1,
 			noiseSpeed: .05,
 			noiseAmount: .3,
 			noiseIntensity:1,
 			speed: 3.25,
 			colorSpeed:.0001,
 			colorRange:.125,
 			wrapAmount: 1.0,
 			delay: 0.150,
 			randomizeAllValues: function(){
 				scope.randomizeAllValues();
 			},
 			randomizeColor: function(){
 				scope.randomizeColor();
 			},
 			toggleView: function(){
 				scope.toggleView();
 			},
 			randomizeTotalNumbers: function(){
 				scope.randomizeTotalNumbers();
 			}

 		};

 		this.gui = new dat.GUI({
 			width: VEIL.Params.guiWidth,
			// autoPlace: false
		});

 		this.guiContainer = this.gui.domElement;

 		this.guiContainer.onselectStart = function() {
 			return false;
 		};

 		var f1 = this.gui.addFolder('VEIL');
 		var f2 = this.gui.addFolder('GLOBAL');

 		VEIL.Sliders.speed = f2.add(VEIL.Params, 'speed', 0.1, 5.0).step(0.0005).name('speed');
 		VEIL.Sliders.delay = f2.add(VEIL.Params, 'delay', 0.0, 2.0).step(0.0005).name('delay');

 		VEIL.Sliders.noiseSpeed = f1.add(VEIL.Params, 'noiseSpeed', -.35, .35).step(0.0005).name('noiseSpeed');
 		VEIL.Sliders.noiseAmount = f1.add(VEIL.Params, 'noiseAmount', 0, 3).step(0.0005).name('noiseAmount');
 		VEIL.Sliders.noiseIntensity = f1.add(VEIL.Params, 'noiseIntensity', .25, 2).step(0.0005).name('noiseIntensity');
 		
 		VEIL.Sliders.radiusRange = f1.add(VEIL.Params, 'radiusRange', .75, 1).step(0.0005).name('radiusRange');
 		VEIL.Sliders.radius = f1.add(VEIL.Params, 'radius', 100, 400).step(0.0005).name('radius');

 		VEIL.Sliders.centerRadius = f1.add(VEIL.Params, 'centerRadius', 0, 25).step(0.0005).name('centerRadius');
 		VEIL.Sliders.centerSpeed = f1.add(VEIL.Params, 'centerSpeed', -.1, .1).step(0.0005).name('centerSpeed');
 		VEIL.Sliders.centerOffset = f1.add(VEIL.Params, 'centerOffset', -2, 2).step(0.0005).name('centerOffset');

 		VEIL.Sliders.multiplier = f1.add(VEIL.Params, 'multiplier', -15, 15).step(0.0005).name('multiplier');
 		VEIL.Sliders.maxHeightRange = f1.add(VEIL.Params, 'maxHeightRange', -1, 1).step(0.0005).name('maxHeightRange');
 		
 		VEIL.Sliders.heightOffset = f1.add(VEIL.Params, 'heightOffset', -50, 50).step(0.0005).name('heightOffset');
 		VEIL.Sliders.waterHeight = f1.add(VEIL.Params, 'waterHeight', -100, 50).step(0.0005).name('waterHeight');

 		VEIL.Sliders.wrapAmount = f1.add(VEIL.Params, 'wrapAmount', 0, 1).step(0.0005).name('wrapAmount');
 		VEIL.Sliders.orbitSpeed = f1.add(VEIL.Params, 'orbitSpeed', -.1, .1).step(0.0005).name('orbitSpeed');

 		VEIL.Sliders.colorSpeed = f1.add(VEIL.Params, 'colorSpeed', -.001, .001).step(0.0005).name('colorSpeed');
 		VEIL.Sliders.colorRange = f1.add(VEIL.Params, 'colorRange', .0, .35).step(0.0005).name('colorRange');

 		this.gui.add(VEIL.Params, 'randomizeAllValues').name('MORPH SHAPE');
 		f2.add(VEIL.Params, 'randomizeColor').name('UPDATE COLOR');
		// f2.add(VEIL.Params, 'randomizeTotalNumbers').name('CHANGE RES');
		f2.add(VEIL.Params, 'toggleView').name('CHANGE VIEW');

		this.guiContainer = document.getElementById('guiContainer');
		this.guiContainer.appendChild(this.gui.domElement);

		return this;

	};
	this.createListeners = function(arg){

		return this;

	};

	this.createTween = function(arg){
		var slider = arg.slider;
		var param = arg.param;
		var endValue = arg.endValue ? arg.endValue : (slider.__max - slider.__min)*Math.random() + slider.__min;
		var delayValue = arg.delay ? arg.delay : 0;
		var setter = 
		(function( id ){
			return function(element, state) {
				slider.setValue(state.value);
			}
		})(slider);
		return {
			time:delayValue,
			duration:VEIL.Params.speed,
			effect:'quadInOut', 
			start:param,
			stop:endValue,
			onFrame:setter,
			onStop:setter,
		}
	}


	this.toggleView = function() {
		trace("toggleView");
		this.dispatchEvent("TOGGLE_VIEW",[]);
		return this;
	};


	this.randomizeTotalNumbers = function() {
		trace("randomizeTotalNumbers");
		window.location.href=window.location.pathname + "?totalWidth=" +((Math.random()*20)|0 + 2)+ "&totalDepth=" + ((Math.random()*20)|0 + 2);
		return this;
	};
	
	this.randomizeColor = function() {
		// trace("randomizeColor");
		var tweens = [];
		var tween;

		function delayer (total){

			var order = shuffleArray(total);
			var counter = 0;
			return function(e){
				return order[counter++]*VEIL.Params.delay;
			};
		};

		var getItemDelay = delayer(2);

		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.colorSpeed,  param:VEIL.Params.colorSpeed}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.colorRange, param:VEIL.Params.colorRange}));

		tween = {
			time:0,
			duration:VEIL.Params.speed,
			effect:'easeInOut',
			start:0,
			stop:1,
			onStop:function(){
				// scope.waiter();
			},
		}
		tweens.push(tween);
		$('#proxy').clear();
		$('#proxy').tween(tweens).play();
		return this;

	};	
	this.randomizeAllValues = function() {
		// trace("randomizeAllValues");
		var tweens = [];
		var tween;

		function delayer (total){
			var order = shuffleArray(total);
			var counter = 0;
			return function(e){
				return order[counter++]*VEIL.Params.delay;
			};
		};

		var getItemDelay = delayer(14);

		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.noiseSpeed,  param:VEIL.Params.noiseSpeed}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.noiseAmount,  param:VEIL.Params.noiseAmount}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.noiseIntensity,  param:VEIL.Params.noiseIntensity}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.radiusRange,  param:VEIL.Params.radiusRange}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.radius,  param:VEIL.Params.radius}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.centerRadius,  param:VEIL.Params.centerRadius}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.centerSpeed,  param:VEIL.Params.centerSpeed}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.centerOffset,  param:VEIL.Params.centerOffset}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.multiplier,  param:VEIL.Params.multiplier}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.maxHeightRange,  param:VEIL.Params.maxHeightRange}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.heightOffset,  param:VEIL.Params.heightOffset}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.waterHeight,  param:VEIL.Params.waterHeight}));

		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.colorSpeed,  param:VEIL.Params.colorSpeed}));
		tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.colorRange, param:VEIL.Params.colorRange}));

		// tweens.push(this.createTween({ delay:getItemDelay(),  slider:VEIL.Sliders.wrapAmount,  param:VEIL.Params.wrapAmount}));
		tween = {
			time:0,
			duration:VEIL.Params.speed,
			effect: 'easeInOut',
			start:0,
			stop:1,
			onStop:function(){
				// scope.waiter();
			},
		}
		tweens.push(tween);
		$('#proxy').clear();
		$('#proxy').tween(tweens).play();
		return this;

	};

	this.waiter = function() {
		// trace("waiter");
		var tweens = [];
		var tween;

		tween = {
			time:0,
			duration:VEIL.Params.speed*.5,
			effect:'easeInOut',
			start:0,
			stop:1,
			onStop:function(){
				scope.randomizeAllValues();
			}
		}
		tweens.push(tween);
		$('#proxy').clear();
		$('#proxy').tween(tweens).play();

		return this;
	};

	this.set3DScope = function(arg) {
		this.scope3d = arg;
		return this;
	};

};

VEIL.Params.prototype = new UNCTRL.BoilerPlate();
VEIL.Params.prototype.constructor = VEIL.Params;