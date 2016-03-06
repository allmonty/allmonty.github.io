
var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 5;

var isDrawingBorders = true;

var program;

var fColor;

var vAngle;
var angleIterator = 0.0;
var angleSpeed = 0.0;

var vDistortPercent;
var distortPercent = 1.0;

var vSize;
var sizePercent = 1.0;

var drawInsideTriangles = false;

var fillColor = [1.0, 0.0, 0.0, 1.0];
var lineColor = [0.0, 0.0, 0.0, 1.0];
var bgColor = [1.0, 1.0, 1.0, 1.0];

var psychedelic = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    initializeData();

    loadPointsDataAndAssociate();

    fColor = gl.getUniformLocation( program, "fColor" );
    vAngle = gl.getUniformLocation( program, "vAngle" );
    vDistortPercent = gl.getUniformLocation( program, "vDistortPercent" );
    vSize = gl.getUniformLocation( program, "vSize" );

    render()
};

function initializeData()
{
    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    var vertices = [
        vec2( -0.75, -0.5 ),
        vec2(  0,  0.88 ),
        vec2(  0.75, -0.5 )
    ];

    divideTriangle( vertices[0], vertices[1], vertices[2],
                    NumTimesToSubdivide);
}

function loadPointsDataAndAssociate()
{
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
}

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion
    
    if ( count == 0 ) {
        triangle( a, b, c );
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        if(drawInsideTriangles)
        {
            divideTriangle( ab, ac, bc, count );
        }
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
        
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    if(psychedelic)
    {
        fillColor = [Math.random(), Math.random(), Math.random(), 1.0];
        lineColor = [Math.random(), Math.random(), Math.random(), 1.0];
        bgColor = [Math.random(), Math.random(), Math.random(), 1.0];
    }
    else
    {
        fillColor = [1.0, 0.0, 0.0, 1.0];
        lineColor = [0.0, 0.0, 0.0, 1.0];
        bgColor = [1.0, 1.0, 1.0, 1.0];
    }

    gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);

    //Set fColor to red
    gl.uniform4fv(fColor, fillColor);
    
    angleIterator = (angleIterator + angleSpeed)%360;

    gl.uniform1f(vAngle, angleIterator);

    gl.uniform1f(vDistortPercent, distortPercent);

    gl.uniform1f(vSize, sizePercent);

    //Draw triangles
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    
    //Set fColor to black
    gl.uniform4fv(fColor, lineColor);

    //Draw the loops (frame)
    if(isDrawingBorders)
    {
        for (var i = 0; i < points.length; i += 3) {
        gl.drawArrays( gl.LINE_LOOP, i, 3 );
        };
    }

    requestAnimFrame( render );
}

function setNumTimesToSubdivide(num)
{
    NumTimesToSubdivide = num;

    points = [];

    initializeData();    

    loadPointsDataAndAssociate();
}

function setDistPercent(num)
{
    distortPercent = num;
}

function setSizePercent(num)
{
    sizePercent = num;
}

function setAngleSpeed(num)
{
    angleSpeed = num;
}

function changePsychedelicMode()
{
    psychedelic = !psychedelic;
}

function changeBordersMode()
{
    isDrawingBorders = !isDrawingBorders;
}

function setDrawInsideTriangles(value)
{
    drawInsideTriangles = value;

    points = [];

    initializeData();    

    loadPointsDataAndAssociate();
}