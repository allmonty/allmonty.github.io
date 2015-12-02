
var canvas;
var gl;

//Camera variables

var camEye;
var camAt;
var camUp;
var camRight;
var camForward;

//Shader references

var SHADER_MODELVIEW_MATRIX;
var MVMatrix;

var SHADER_PROJECTION_MATRIX;
var PMatrix;

var SHADER_ROTATION_MATRIX;
var SHADER_TRANSLATION_MATRIX;
var SHADER_SCALE_MATRIX;

var VERTEX_POSITION;
var VERTEX_COLOR;

//Perspective variables

var perspFOVY = 45.0;
var perspNear = 0.3;
var perspFar = 100.0;
var perspAspect; //calculated based on canvas height and width

var orthoNear   = -100.0;
var orthoFar    =  100.0;
var orthoLeft   = -10.0;
var orthoRight  =  10.0;
var orthoBottom = -10.0;
var orthoTop    =  10.0;

//=======OBJECTS=======//
var cube = new RenderObject(36);
cube.vertices = CubeVertices;
cube.colors = CubeColors;
cube.indices = CubeIndices;

var axis = new RenderObject(6);
axis.vertices = AxisVertices;
axis.colors = AxisColors;
axis.indices = AxisIndices;

var grid = new RenderObject(40);
grid.vertices = GridVertices;
grid.colors = GridColors;
grid.indices = GridIndices;

var specialAxis = new RenderObject(2);
specialAxis.vertices = SpecialAxisVertices;
specialAxis.colors = SpecialAxisColors;
specialAxis.indices = SpecialAxisIndices;

//=====Control Variables=====//

var usePerspective = true;
var camRotateAround = false;
var cubeRotate = [false, false, false];
var cubeRotationSpeed = 1;
var camRotationSpeed = 0.1;
var psychedelicMode = false;

var scaleAnimationMode = false;
var cubeAnimIncreaseX = true;
var cubeAnimIncreaseY = true;
var cubeAnimIncreaseZ = true;

var isRotatingInSpecialAxis = false;
var isRenderingSpecialAxis = false;

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
    
    perspAspect = canvas.width/canvas.height;

    //=====Get vertex attributes=====//

    VERTEX_POSITION    = gl.getAttribLocation( program, "vPosition" );
    VERTEX_COLOR  = gl.getAttribLocation( program, "vColor" );

    SHADER_MODELVIEW_MATRIX  = gl.getUniformLocation( program, "modelView" );
    SHADER_PROJECTION_MATRIX = gl.getUniformLocation( program, "projection" );

    SHADER_ROTATION_MATRIX   = gl.getUniformLocation( program, "rotation" );
    SHADER_TRANSLATION_MATRIX  = gl.getUniformLocation( program, "translate" );
    SHADER_SCALE_MATRIX      = gl.getUniformLocation( program, "scale" );

    //=====Load objects=====//
    cube.loadBuffers();
    axis.loadBuffers();
    grid.loadBuffers();

    specialAxis.loadBuffers();
    specialAxis.scale = vec3(6, 6, 6);
    specialAxis.updateScaleMatrix();

    //=====CAMERA=====//
    camEye     = vec3(0, 5, -10);
    camUp      = vec3(0, 1, 0);
    camForward = vec3(0, 0, 1);
    camRight   = cross( camForward, camUp);

    camForward = multMat4ToVec3(rotate(-30, camRight), camForward);
    
    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(psychedelicMode)
    {
        gl.clearColor( Math.random(), Math.random(), Math.random(), 1.0 );
    }
    else
    {
        gl.clearColor( 0.05, 0.05, 0.1, 1.0 );
    }

    if(isRotatingInSpecialAxis)
    {

        specialAxis.rotateForwardAxis(1);
        cube.transformRight = specialAxis.transformRight;
        cube.transformUp = specialAxis.transformUp;
        cube.transformForward = specialAxis.transformForward;
        cube.rotationMatrix = specialAxis.rotationMatrix;
        axis.transformRight = specialAxis.transformRight;
        axis.transformUp = specialAxis.transformUp;
        axis.transformForward = specialAxis.transformForward;
        axis.rotationMatrix = specialAxis.rotationMatrix;
    }

    if(scaleAnimationMode)
    {
        animateCubeScale();
    }

    if(cubeRotate[0])
    {
        cube.rotateRightAxis(cubeRotationSpeed);
        axis.rotateRightAxis(cubeRotationSpeed);
    }
    if(cubeRotate[1])
    {
        cube.rotateUpAxis(cubeRotationSpeed);
        axis.rotateUpAxis(cubeRotationSpeed);
    }
    if(cubeRotate[2])
    {
        cube.rotateForwardAxis(cubeRotationSpeed);
        axis.rotateForwardAxis(cubeRotationSpeed);
    }
    
    if(camRotateAround)
    {
        camEye = multMat4ToVec3(rotate(camRotationSpeed, vec3(0, 1, 0)), camEye);
        camForward = multMat4ToVec3(rotate(camRotationSpeed, vec3(0, 1, 0)), camForward);
    }

    camAt = add(camEye, camForward);
    MVMatrix = lookAt(camEye, camAt, camUp);
    
    if(usePerspective)
    {
        PMatrix = perspective(perspFOVY, perspAspect, perspNear, perspFar);
    }
    else
    {
        PMatrix = ortho( orthoLeft, orthoRight, orthoBottom, orthoTop, orthoNear, orthoFar );
    }
    
    gl.uniformMatrix4fv( SHADER_MODELVIEW_MATRIX, false, flatten(MVMatrix) );
    gl.uniformMatrix4fv( SHADER_PROJECTION_MATRIX, false, flatten(PMatrix) );

    cube.setWebGLToDraw(gl);
    cube.drawTriangles(gl);
    axis.setWebGLToDraw(gl);
    axis.drawLines(gl);
    grid.setWebGLToDraw(gl);
    grid.drawLines(gl);

    if(isRenderingSpecialAxis)
    {
        specialAxis.setWebGLToDraw(gl);
        specialAxis.drawLines(gl);
    }

    requestAnimFrame(render);
}

function multMat4ToVec3(m, v)
{
    var result = vec3();
    
    result[0] = v[0]*m[0][0] + v[1]*m[0][1] + v[2]*m[0][2];
    result[1] = v[0]*m[1][0] + v[1]*m[1][1] + v[2]*m[1][2];
    result[2] = v[0]*m[2][0] + v[1]*m[2][1] + v[2]*m[2][2];
    
    return result;
}

function animateCubeScale()
{
    var rand = Math.random();
    if(rand > 0.66)
    {
        if(cubeAnimIncreaseX)
        {
            cube.scale[0] += 0.1;
            if(cube.scale[0] >= 3) cubeAnimIncreaseX = false;
        }
        else
        {
            cube.scale[0] -= 0.1;
            if(cube.scale[0] <= 0.1) cubeAnimIncreaseX = true;
        }
    }
    else if(rand > 0.33)
    {
        if(cubeAnimIncreaseY)
        {
            cube.scale[1] += 0.1;
            if(cube.scale[1] >= 3) cubeAnimIncreaseY = false;
        }
        else
        {
            cube.scale[1] -= 0.1;
            if(cube.scale[1] <= 0.1) cubeAnimIncreaseY = true;
        }
    }
    else
    {
        if(cubeAnimIncreaseZ)
        {
            cube.scale[2] += 0.1;
            if(cube.scale[2] >= 3) cubeAnimIncreaseZ = false;
        }
        else
        {
            cube.scale[2] -= 0.1;
            if(cube.scale[2] <= 0.1) cubeAnimIncreaseZ = true;
        }
    }
    cube.updateScaleMatrix();
}