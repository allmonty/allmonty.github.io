// Standard global variables
var scene, camera, renderer, controls, clock, delta;

var allObjectsAreLoaded = false;

var SKYBOX_COLOR = 0x483C61;

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2028;

var objsInScene = {};
var spotLightsInScene = {};

var texturedCubeAnimationIterator = 0;

var directionalLight;

var skyBox;

var playDayNight = false;

var bgMusic;

window.onload = function main()
{
	init();
	asyncObjsSetup();
	animate();
}

function init()
{
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.3, 100000 );
    camera.position.set(0, 250, 500);
    
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    
    clock = new THREE.Clock( true );

//=====MUSIC====//
	var listener = new THREE.AudioListener();
	camera.add(listener);

    bgMusic = new THREE.Audio(listener);
	bgMusic.load('audio/peixes-zumbis.mp3');
	bgMusic.setRefDistance( 1000000 );
	bgMusic.autoplay = true;
	bgMusic.setLoop(true);
	camera.add(bgMusic);
	scene.add(bgMusic);

//=====CONTROLS=====//
	// Move mouse and: left   click to rotate, middle click to zoom, right  click to pan
	controls = new THREE.OrbitControls( camera );
	//controls = new THREE.FlyControls( camera );
	//controls.movementSpeed = 3000;
	//controls.rollSpeed = Math.PI / 6;
	//controls.autoForward = false;
	//controls.dragToLook = true;

//=====LIGHT=====//
    //Ambient light
	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
	
	directionalLight = new THREE.DirectionalLight(0xFFCC77);
    directionalLight.castShadow = true;
	directionalLight.position.set(-500, 700, 500);
	directionalLight.target.position.set(500, -700, -500);
	directionalLight.intensity = 1.3;

    directionalLight.shadowMapWidth = SHADOW_MAP_WIDTH;
    directionalLight.shadowMapHeight = SHADOW_MAP_HEIGHT;
    
    directionalLight.shadowCameraNear = -20000;
    directionalLight.shadowCameraFar = 10000;
    directionalLight.shadowCameraBottom = -10000;
    directionalLight.shadowCameraTop = 6000;
    directionalLight.shadowCameraLeft = -10000;
    directionalLight.shadowCameraRight = 10000;

    directionalLight.shadowCameraVisible = true;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

	createSpotLight("SpotLightCube");
	createSpotLight("SpotLightDragon");
    
    
//=====LOADING MODELS=====//
	defineLoadingManagerFunctions();

	loadModel(['models/glider.obj', 'models/glider.mtl'], "Glider");
	
	loadModel(['models/racconman.obj', 'models/racconman.mtl'], "RacconMan");
    
    loadModel(['models/dragon.obj', 'models/dragon.mtl'], "Dragon");
    
    loadModel(['models/bonesmelee.obj', 'models/bonesmelee.mtl'], "Bones");
    
    loadModel(['models/islandnewsea.obj', 'models/islandnewsea.mtl'], "Island");
    
    loadModel(['models/chartexanim.obj', 'models/chartexanim.mtl'], "GuanabaraChar");


//=====Cube=====//
    objsInScene["Cube"] = new THREE.Group();
    scene.add(objsInScene["Cube"]);
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneLeft");
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneRight");
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneTop");
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneBottom");
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneFront");
	loadTexturedPlane('images/pebbles.png', 10, 10, 100, 100, 100, 100, "Cube" + "PlaneBack");
    
//=====SKYBOX=====//
	var imagePrefix = "images/skybox-";
	var directions  = ["right", "left", "top", "bottom", "front", "back"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );	
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function asyncObjsSetup()
{
	if(allObjectsAreLoaded)
	{
		objsInScene["Glider"].position.set(2700, 700, -4000);
		objsInScene["Glider"].rotation.y = -0.60;
		objsInScene["Glider"].scale.set(100,100,100);

		objsInScene["RacconMan"].position.set(4300, 400, -4500);
		objsInScene["RacconMan"].scale.set(50,50,50);

		objsInScene["Dragon"].position.set(-5000, 1000, 1000);
		objsInScene["Dragon"].scale.set(300, 300, 300);
		spotLightsInScene["SpotLightDragon"].position.set(-5000, 2000, 1200);
		spotLightsInScene["SpotLightDragon"].target.position.set(-5000, 0, 800);
		spotLightsInScene["SpotLightDragon"].color.setRGB(1, 0, 0);

		objsInScene["Bones"].position.set(-1000, 0, -3000);
		objsInScene["Bones"].scale.set(100, 100, 100);

		objsInScene["Island"].position.set(-5000, 400, 0);
		objsInScene["Island"].scale.set(100, 100, 100);
		objsInScene["Island"].rotation.y = -90 * Math.PI / 180;

		objsInScene["GuanabaraChar"].position.set(500, 0, 0);
		objsInScene["GuanabaraChar"].scale.set(150, 150, 150);
		objsInScene["GuanabaraChar"].rotation.y = -75 * Math.PI / 180;

		prepareTexturedCube("Cube");
		objsInScene["Cube"].position.set(4000, 700, 2000);
		spotLightsInScene["SpotLightCube"].position.set(4000, 2000, 2000);
		spotLightsInScene["SpotLightCube"].target.position.set(4000, 0, 2000);

		return;
	}
	else
	{
		requestAnimationFrame( asyncObjsSetup );
	}
}

function animate()
{
	render();		
	update();
    
	requestAnimationFrame( animate );
}

var dirLightAnimIterator = 0;
var dirLightAnimAngle = 0;

function update()
{	
	//bgMusic.position = camera.position;
	
	delta = clock.getDelta();
	controls.update();

	if(playDayNight)
	{
		dirLightAnimAngle += delta * 25 * Math.PI / 180;
		dirLightAnimAngle %= 1.1*Math.PI;

		directionalLight.position.set(-(Math.cos(dirLightAnimAngle)*500), (Math.sin(dirLightAnimAngle)*700), (Math.cos(dirLightAnimAngle)*500));
		directionalLight.target.position.set((Math.cos(dirLightAnimAngle)*500), -(Math.sin(dirLightAnimAngle)*700), -(Math.cos(dirLightAnimAngle)*500));
	}
	
	if(allObjectsAreLoaded)
	{
		animateTexturedCube("Cube", 0.5, 50);

		if(playDayNight)
		{
			skyBox.material.materials[0].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
			skyBox.material.materials[1].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
			skyBox.material.materials[2].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
			skyBox.material.materials[3].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
			skyBox.material.materials[4].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
			skyBox.material.materials[5].color.setRGB(Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle), Math.sin(dirLightAnimAngle));
		}
	}
}

function render() 
{	
	renderer.render( scene, camera );
}

function defineLoadingManagerFunctions()
{
	THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    	//console.log( item, loaded, total );
    	console.log("Loading " + item + " (" + loaded + "/" + total + ")");
	    if(loaded == total)
	    {
	    	allObjectsAreLoaded = true;
	    }
	};
	
	THREE.DefaultLoadingManager.onError = function ( xhr ) {
		console.log("ERROR ON LOADING");
	};
}

function loadModel(urls, name)
{
	var loader	= new THREEx.UniversalLoader()
	loader.load(urls, function(object){
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

		objsInScene[name] = object;
		scene.add(object)
	});
}

function loadTexturedPlane(textURL, repeatTextX, repeatTextY, width, height, widthSegments, heightSegments, name)
{
	var loader = new THREE.TextureLoader();
    loader.load( textURL, function ( texture )
    {
    	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( repeatTextX, repeatTextY );
        var floorGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
        var floorMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );

        objsInScene[name] = new THREE.Mesh( floorGeometry, floorMaterial );

        objsInScene[name].castShadow = true;
        objsInScene[name].receiveShadow = true;

		scene.add(objsInScene[name]);
    } );
}

function createSpotLight(name)
{
	// spotlight
	spotLightsInScene[name] = new THREE.SpotLight(0xFFFFAA);
    spotLightsInScene[name].castShadow = true;
	spotLightsInScene[name].position.set(0, 0, 0);
	spotLightsInScene[name].target.position.set(0, -1, 0);
	spotLightsInScene[name].intensity = 1;
	spotLightsInScene[name].angle = Math.PI;

    spotLightsInScene[name].shadowMapWidth = SHADOW_MAP_WIDTH;
    spotLightsInScene[name].shadowMapHeight = SHADOW_MAP_HEIGHT;
    
    //spotLightsInScene[name].shadowCameraVisible = true;
    //spotLightsInScene[name].shadowCameraNear = 1;
    //spotLightsInScene[name].shadowCameraFar = 200000;
    //spotLightsInScene[name].shadowCameraFov = 60;

    scene.add(spotLightsInScene[name]);
    scene.add(spotLightsInScene[name].target)
}

function prepareTexturedCube(name)
{
	objsInScene[name].add(objsInScene[name + "PlaneLeft"]);
	objsInScene[name].add(objsInScene[name + "PlaneRight"]);
	objsInScene[name].add(objsInScene[name + "PlaneTop"]);
	objsInScene[name].add(objsInScene[name + "PlaneBottom"]);
	objsInScene[name].add(objsInScene[name + "PlaneFront"]);
	objsInScene[name].add(objsInScene[name + "PlaneBack"]);
	
	objsInScene[name + "PlaneRight"].position.set(50, 0, 0);
	objsInScene[name + "PlaneRight"].rotation.y = 0.5* Math.PI;

	objsInScene[name + "PlaneLeft"].position.set(-50, 0, 0);
	objsInScene[name + "PlaneLeft"].rotation.y = -0.5* Math.PI;

	objsInScene[name + "PlaneTop"].position.set(0, 50, 0);
	objsInScene[name + "PlaneTop"].rotation.x = 0.5* Math.PI;

	objsInScene[name + "PlaneBottom"].position.set(0, -50, 0);
	objsInScene[name + "PlaneBottom"].rotation.x = -0.5* Math.PI;

	objsInScene[name + "PlaneFront"].position.set(0, 0, 50);
	objsInScene[name + "PlaneFront"].rotation.z = 0.5* Math.PI;

	objsInScene[name + "PlaneBack"].position.set(0, 0, -50);
	objsInScene[name + "PlaneBack"].rotation.z = -0.5* Math.PI;	
}

function animateTexturedCube(name, speed, distance)
{
	texturedCubeAnimationIterator += delta * speed * Math.PI;

	var auxSin = Math.abs( Math.sin(texturedCubeAnimationIterator) );

	objsInScene[name + "PlaneRight"].position.x = auxSin * distance + 50;
	objsInScene[name + "PlaneLeft"].position.x = -auxSin * distance - 50;

	objsInScene[name + "PlaneTop"].position.y = auxSin * distance + 50;
	objsInScene[name + "PlaneBottom"].position.y = -auxSin * distance - 50;

	objsInScene[name + "PlaneFront"].position.z = auxSin * distance + 50;
	objsInScene[name + "PlaneBack"].position.z = -auxSin * distance - 50;

	objsInScene["Cube"].rotation.x += delta * Math.PI;
	objsInScene["Cube"].rotation.y += delta * Math.PI;

	objsInScene["Cube"].scale.set(auxSin * 3 + 1, auxSin * 3 + 1, auxSin * 3 + 1);

	spotLightsInScene["SpotLightCube"].color.setRGB(Math.random(), Math.random(), Math.random());
}

window.onkeypress = function(event)
{
	var x = event.which;
	switch(x)
	{
		case 110: //key n
			playDayNight = !playDayNight;
			console.log(x);
			break;
		default:
			console.log(x);
			break;
	}
}