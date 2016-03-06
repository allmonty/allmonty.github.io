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

//=====Projections=====//

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

var robot = new Robot();

var grid = new RenderObject(40);
grid.instanceName = "Grid";
grid.vertices = GridVertices;
grid.colors = GridColors;
grid.indices = GridIndices;

//=====Control Variables=====//

var usePerspective = true;
var camRotateAround = false;
var camRotationSpeed = 0.1;

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
    
    robot.loadBuffers();

    grid.loadBuffers();

    //=====CAMERA=====//
    usePerspective = true;

    camEye     = vec3(-5, 3, -5);
    camUp      = vec3(0, 1, 0);
    camForward = vec3(0, 0, 1);
    camRight   = cross( camForward, camUp);

    camForward = multMat4ToVec3(rotate(-15, camRight), camForward);

    camForward = multMat4ToVec3(rotate(45, camUp), camForward);
    camRight = multMat4ToVec3(rotate(45, camUp), camRight);
    
    //=====OBJECTS=====//

    robot.init();

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.clearColor( 0.05, 0.05, 0.1, 1.0 );
    
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

    robot.render();
    
    grid.setWebGLToDraw(gl);
    grid.drawLines(gl);

    requestAnimFrame(render);
}







var jointsHash = {};

jointsHash["Body X"] = 0;
jointsHash["Body Y"] = 0;
jointsHash["Body Z"] = 0;

jointsHash["Neck X"] = 0;
jointsHash["Neck Y"] = 0;
jointsHash["Neck Z"] = 0;

jointsHash["RightShoulder X"] = 0;
jointsHash["RightShoulder Y"] = 0;
jointsHash["RightShoulder Z"] = 0;

jointsHash["RightElbow X"] = 0;
jointsHash["RightElbow Y"] = 0;

jointsHash["RightWrist X"] = 0;
jointsHash["RightWrist Y"] = 0;

jointsHash["LeftShoulder X"] = 0;
jointsHash["LeftShoulder Y"] = 0;
jointsHash["LeftShoulder Z"] = 0;

jointsHash["LeftElbow X"] = 0;
jointsHash["LeftElbow Y"] = 0;

jointsHash["LeftWrist X"] = 0;
jointsHash["LeftWrist Y"] = 0;

jointsHash["LeftHip X"] = 0;
jointsHash["LeftHip Y"] = 0;
jointsHash["LeftHip Z"] = 0;

jointsHash["LeftKnee X"] = 0;

jointsHash["LeftAnkle X"] = 0;

jointsHash["RightHip X"] = 0;
jointsHash["RightHip Y"] = 0;
jointsHash["RightHip Z"] = 0;

jointsHash["RightKnee X"] = 0;

jointsHash["RightAnkle X"] = 0;

function goMoveRobot(key, value)
{
    jointsHash[key] = Number(value);
    console.log(jointsHash[key]);
}

function moveRobot()
{
    if(jointsHash["Body X"] != 0)
    {
        robot.body.rotateInPivotWithChildren(jointsHash["Body X"], robot.body.transformRight, robot.body.position);
    }
    if(jointsHash["Body Y"] != 0)
    {
        robot.body.rotateInPivotWithChildren(jointsHash["Body Y"], robot.body.transformUp, robot.body.position);
    }
    if(jointsHash["Body Z"] != 0)
    {
        robot.body.rotateInPivotWithChildren(jointsHash["Body Z"], robot.body.transformForward, robot.body.position);
    }

    if(jointsHash["Neck X"] != 0)
    {
        robot.neck.rotateInPivotWithChildren(jointsHash["Neck X"], robot.neck.transformRight, robot.neck.localPivot);
    }
    if(jointsHash["Neck Y"] != 0)
    {
        robot.neck.rotateInPivotWithChildren(jointsHash["Neck Y"], robot.neck.transformUp, robot.neck.localPivot);
    }
    if(jointsHash["Neck Z"] != 0)
    {
        robot.neck.rotateInPivotWithChildren(jointsHash["Neck Z"], robot.neck.transformForward, robot.neck.localPivot);
    }

    if(jointsHash["RightShoulder X"] != 0)
    {
        robot.rightShoulder.rotateInPivotWithChildren(jointsHash["RightShoulder X"], robot.rightShoulder.transformRight, robot.rightShoulder.position);
    }
    if(jointsHash["RightShoulder Y"] != 0)
    {
        robot.rightShoulder.rotateInPivotWithChildren(jointsHash["RightShoulder Y"], robot.rightShoulder.transformUp, robot.rightShoulder.position);
    }
    if(jointsHash["RightShoulder Z"] != 0)
    {
        robot.rightShoulder.rotateInPivotWithChildren(jointsHash["RightShoulder Z"], robot.rightShoulder.transformForward, robot.rightShoulder.position);
    }

    if(jointsHash["RightElbow X"] != 0)
    {
        robot.rightElbow.rotateInPivotWithChildren(jointsHash["RightElbow X"], robot.rightElbow.transformRight, robot.rightElbow.position);
    }
    if(jointsHash["RightElbow Y"] != 0)
    {
        robot.rightElbow.rotateInPivotWithChildren(jointsHash["RightElbow Y"], robot.rightElbow.transformUp, robot.rightElbow.position);
    }

    if(jointsHash["RightWrist X"] != 0)
    {
        robot.rightWrist.rotateInPivotWithChildren(jointsHash["RightWrist X"], robot.rightWrist.transformRight, robot.rightWrist.position);
    }
    if(jointsHash["RightWrist Y"] != 0)
    {
        robot.rightWrist.rotateInPivotWithChildren(jointsHash["RightWrist Y"], robot.rightWrist.transformUp, robot.rightWrist.position);
    }

    if(jointsHash["LeftShoulder X"] != 0)
    {
        robot.leftShoulder.rotateInPivotWithChildren(jointsHash["LeftShoulder X"], robot.leftShoulder.transformRight, robot.leftShoulder.position);
    }
    if(jointsHash["LeftShoulder Y"] != 0)
    {
        robot.leftShoulder.rotateInPivotWithChildren(jointsHash["LeftShoulder Y"], robot.leftShoulder.transformUp, robot.leftShoulder.position);
    }
    if(jointsHash["LeftShoulder Z"] != 0)
    {
        robot.leftShoulder.rotateInPivotWithChildren(jointsHash["LeftShoulder Z"], robot.leftShoulder.transformForward, robot.leftShoulder.position);
    }

    if(jointsHash["LeftElbow X"] != 0)
    {
        robot.leftElbow.rotateInPivotWithChildren(jointsHash["LeftElbow X"], robot.leftElbow.transformRight, robot.leftElbow.position);
    }
    if(jointsHash["LeftElbow Y"] != 0)
    {
        robot.leftElbow.rotateInPivotWithChildren(jointsHash["LeftElbow Y"], robot.leftElbow.transformUp, robot.leftElbow.position);
    }

    if(jointsHash["LeftWrist X"] != 0)
    {
        robot.leftWrist.rotateInPivotWithChildren(jointsHash["LeftWrist X"], robot.leftWrist.transformRight, robot.leftWrist.position);
    }
    if(jointsHash["LeftWrist Y"] != 0)
    {
        robot.leftWrist.rotateInPivotWithChildren(jointsHash["LeftWrist Y"], robot.leftWrist.transformUp, robot.leftWrist.position);
    }

    if(jointsHash["RightHip X"] != 0)
    {
        robot.rightHip.rotateInPivotWithChildren(jointsHash["RightHip X"], robot.rightHip.transformRight, robot.rightHip.position);
    }
    if(jointsHash["RightHip Y"] != 0)
    {
        robot.rightHip.rotateInPivotWithChildren(jointsHash["RightHip Y"], robot.rightHip.transformUp, robot.rightHip.position);
    }
    if(jointsHash["RightHip Z"] != 0)
    {
        robot.rightHip.rotateInPivotWithChildren(jointsHash["RightHip Z"], robot.rightHip.transformForward, robot.rightHip.position);
    }

    if(jointsHash["RightKnee X"] != 0)
    {
        robot.rightKnee.rotateInPivotWithChildren(jointsHash["RightKnee X"], robot.rightKnee.transformRight, robot.rightKnee.position);
    }

    if(jointsHash["RightAnkle X"] != 0)
    {
        robot.rightAnkle.rotateInPivotWithChildren(jointsHash["RightAnkle X"], robot.rightAnkle.transformRight, robot.rightAnkle.position);
    }

    if(jointsHash["LeftHip X"] != 0)
    {
        robot.leftHip.rotateInPivotWithChildren(jointsHash["LeftHip X"], robot.leftHip.transformRight, robot.leftHip.position);
    }
    if(jointsHash["LeftHip Y"] != 0)
    {
        robot.leftHip.rotateInPivotWithChildren(jointsHash["LeftHip Y"], robot.leftHip.transformUp, robot.leftHip.position);
    }
    if(jointsHash["LeftHip Z"] != 0)
    {
        robot.leftHip.rotateInPivotWithChildren(jointsHash["LeftHip Z"], robot.leftHip.transformForward, robot.leftHip.position);
    }

    if(jointsHash["LeftKnee X"] != 0)
    {
        robot.leftKnee.rotateInPivotWithChildren(jointsHash["LeftKnee X"], robot.leftKnee.transformRight, robot.leftKnee.position);
    }

    if(jointsHash["LeftAnkle X"] != 0)
    {
        robot.leftAnkle.rotateInPivotWithChildren(jointsHash["LeftAnkle X"], robot.leftAnkle.transformRight, robot.leftAnkle.position);
    }

    requestAnimFrame(moveRobot);
}
moveRobot();







function multMat4ToVec3(m, v)
{
    var result = vec3();
    
    result[0] = v[0]*m[0][0] + v[1]*m[0][1] + v[2]*m[0][2];
    result[1] = v[0]*m[1][0] + v[1]*m[1][1] + v[2]*m[1][2];
    result[2] = v[0]*m[2][0] + v[1]*m[2][1] + v[2]*m[2][2];
    
    return result;
}

function multMat4ToVec4(m, v)
{
    var result = vec4();
    
    result[0] = v[0]*m[0][0] + v[1]*m[0][1] + v[2]*m[0][2] + v[3]*m[0][3];
    result[1] = v[0]*m[1][0] + v[1]*m[1][1] + v[2]*m[1][2] + v[3]*m[1][3];
    result[2] = v[0]*m[2][0] + v[1]*m[2][1] + v[2]*m[2][2] + v[3]*m[2][3];
    result[3] = v[0]*m[3][0] + v[1]*m[3][1] + v[2]*m[3][2] + v[3]*m[3][3];
    
    return result;
}

function vec3To4(v)
{
    return vec4(v[0], v[1], v[2], 1);
}

function vec4To3(v)
{
    return vec3(v[0]/v[3], v[1]/v[3], v[2]/v[3]);
}