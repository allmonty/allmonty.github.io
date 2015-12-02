
var canvas;
var gl;

var camEye;
var camAt;
var camUp;
var camRight;
var camForward;

var ModelViewMatrix;
var MVMatrix;

var fovy = 45.0;
var aspect;
var near = 0.3;
var far = 100.0;

var ProjectionMatrix;
var PMatrix;

var rotateInX;
var rotateInNegX;
var rotateInY;
var rotateInNegY;
var rotateInZ;
var rotateInNegZ;

//=====CUBE=====//

var NumVertices  = 36;

var pointsArray = [];
var colorsArray = [];

var vertices = [
    vec4(-0.5, -0.5,  1.5, 1.0),
    vec4(-0.5,  0.5,  1.5, 1.0),
    vec4(0.5,  0.5,  1.5, 1.0),
    vec4(0.5, -0.5,  1.5, 1.0),
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5,  0.5, 0.5, 1.0),
    vec4(0.5,  0.5, 0.5, 1.0),
    vec4( 0.5, -0.5, 0.5, 1.0) 
];

var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.05, 0.05, 0.1, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorCube();
    
    //=====vPosition=====//
    
    var posBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, posBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    //=====vColor=====//
    
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);
    
    ModelViewMatrix = gl.getUniformLocation( program, "modelView" );
    
    ProjectionMatrix = gl.getUniformLocation( program, "projection" );
    
    aspect = canvas.width/canvas.height;
    
    //=====CAMERA=====//
    camEye = vec3(0, 0, -5);
    camUp = vec3(0, 1, 0);
    camForward = vec3(0, 0, 1);
    camRight = cross( camForward, camUp);
    
    //=====ROTATION MATRIXES=====//
    
    updateRotationXMatrixes();
    updateRotationYMatrixes();
    updateRotationZMatrixes();
    
    render();
};

function quad(a, b, c, d) {
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[a]); 
     pointsArray.push(vertices[b]); 
     colorsArray.push(vertexColors[b]); 
     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[c]);     
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[a]); 
     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[c]); 
     pointsArray.push(vertices[d]); 
     colorsArray.push(vertexColors[d]);
}


function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    camAt = add(camEye, camForward);
    
    MVMatrix = lookAt(camEye, camAt, camUp);
    
    PMatrix = perspective(fovy, aspect, near, far);
    
    gl.uniformMatrix4fv( ModelViewMatrix, false, flatten(MVMatrix) );
    
    gl.uniformMatrix4fv( ProjectionMatrix, false, flatten(PMatrix) );
    
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    
    requestAnimFrame(render);
}

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // w
        camEye = add(camEye, camForward);
    }
    else if (e.keyCode == '83') {
        // s
        camEye = subtract(camEye, camForward);
    }
    else if (e.keyCode == '65') {
        // a
        camEye = subtract(camEye, camRight);
    }
    else if (e.keyCode == '68') {
        // d
        camEye = add(camEye, camRight);
    }
    else if (e.keyCode == '38') {
        // up arrow
        camForward = multMat4ToVec3( rotateInX, camForward );
        camUp = cross( camRight, camForward );
        updateRotationZMatrixes();
        updateRotationYMatrixes();
    }
    else if (e.keyCode == '40') {
        // down arrow
        camForward = multMat4ToVec3( rotateInNegX, camForward );
        camUp = cross( camRight, camForward );
        updateRotationZMatrixes();
        updateRotationYMatrixes();
    }
    else if (e.keyCode == '37') {
        // left arrow
        camForward = multMat4ToVec3( rotateInY, camForward );
        camRight = cross( camForward, camUp);
        updateRotationZMatrixes();
        updateRotationXMatrixes();
    }
    else if (e.keyCode == '39') {
        // right arrow
        camForward = multMat4ToVec3( rotateInNegY, camForward );
        camRight = cross( camForward, camUp);
        updateRotationZMatrixes();
        updateRotationXMatrixes();
    }
}

function updateRotationXMatrixes()
{
    rotateInX = rotate(5.0, camRight);
    rotateInNegX = rotate(-5.0, camRight);
}

function updateRotationYMatrixes()
{
    rotateInY = rotate(5.0, camUp);
    rotateInNegY = rotate(-5.0, camUp);
}

function updateRotationZMatrixes()
{
    rotateInZ = rotate(5.0, camForward);
    rotateInNegZ = rotate(-5.0, camForward);
}

function multMat4ToVec3(m, v)
{
    var result = vec3();
    
    result[0] = v[0]*m[0][0] + v[1]*m[0][1] + v[2]*m[0][2];
    result[1] = v[0]*m[1][0] + v[1]*m[1][1] + v[2]*m[1][2];
    result[2] = v[0]*m[2][0] + v[1]*m[2][1] + v[2]*m[2][2];
    
    return result;
}