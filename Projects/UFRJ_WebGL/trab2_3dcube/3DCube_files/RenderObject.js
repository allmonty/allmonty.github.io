function RenderObject ( numOfElements )
{
	this.rotation = vec3(0.0, 0.0, 0.0);
	this.transformRight   = vec3(1.0, 0.0, 0.0);
	this.transformUp      = vec3(0.0, 1.0, 0.0);
	this.transformForward = vec3(0.0, 0.0, 1.0);

	this.scale = vec3(1.0, 1.0, 1.0);

	this.position = vec3(0.0, 0.0, 0.0);

	this.translationMatrix = mat4();
	this.rotationMatrix = mat4();
	this.scaleMatrix = mat4();

    this.updateTranslationMatrix();
    this.rotateUpAxis(0);
    this.rotateRightAxis(0);
    this.rotateForwardAxis(0);
    this.updateScaleMatrix();

    this.vertices = [];
    this.colors = [];
    this.indices = [];

	this.numElements  = numOfElements;
}

RenderObject.prototype.updateTranslationMatrix = function()
{
	this.translationMatrix = translate(this.position);
}

RenderObject.prototype.updateScaleMatrix = function()
{
	this.scaleMatrix = scaleMatrix(this.scale);
}

RenderObject.prototype.rotateRightAxis = function(angle)
{
	this.rotation[0] = (this.rotation[0] + angle)%360;
	var auxMatrix = rotate(angle, this.transformRight);
	this.transformUp = multMat4ToVec3(auxMatrix, this.transformUp);
	this.transformForward = multMat4ToVec3(auxMatrix, this.transformForward);
	this.rotationMatrix = mult(auxMatrix, this.rotationMatrix);
}

RenderObject.prototype.rotateUpAxis = function(angle)
{
	this.rotation[1] = (this.rotation[1] + angle)%360;
	var auxMatrix = rotate(angle, this.transformUp);
	this.transformRight = multMat4ToVec3(auxMatrix, this.transformRight);
	this.transformForward = multMat4ToVec3(auxMatrix, this.transformForward);
	this.rotationMatrix = mult(auxMatrix, this.rotationMatrix);
}

RenderObject.prototype.rotateForwardAxis = function(angle)
{
	this.rotation[2] = (this.rotation[2] + angle)%360;
	var auxMatrix = rotate(angle, this.transformForward);
	this.transformRight = multMat4ToVec3(auxMatrix, this.transformRight);
	this.transformUp = multMat4ToVec3(auxMatrix, this.transformUp);
	this.rotationMatrix = mult(auxMatrix, this.rotationMatrix);
}

RenderObject.prototype.rotateInAxis = function(angle, axis)
{
	this.rotation[0] = (this.rotation[0] + angle*axis[0])%360;
	this.rotation[1] = (this.rotation[1] + angle*axis[1])%360;
	this.rotation[2] = (this.rotation[2] + angle*axis[2])%360;
	var auxMatrix = rotate(angle, axis);
	this.transformRight = multMat4ToVec3(auxMatrix, this.transformRight);
	this.transformUp = multMat4ToVec3(auxMatrix, this.transformUp);
	this.transformForward = multMat4ToVec3(auxMatrix, this.transformForward);
	this.rotationMatrix = mult(auxMatrix, this.rotationMatrix);
}

RenderObject.prototype.setWebGLToDraw = function(gl)
{
	gl.uniformMatrix4fv( SHADER_ROTATION_MATRIX, false, flatten(this.rotationMatrix) );

    gl.uniformMatrix4fv( SHADER_TRANSLATION_MATRIX, false, flatten(this.translationMatrix) );
    
    gl.uniformMatrix4fv( SHADER_SCALE_MATRIX, false, flatten(this.scaleMatrix) );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.posBufferRef );
    gl.vertexAttribPointer( VERTEX_POSITION, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( VERTEX_POSITION );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBufferRef );
    gl.vertexAttribPointer( VERTEX_COLOR, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( VERTEX_COLOR);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBufferRef );
}

RenderObject.prototype.drawTriangles = function(gl)
{
	gl.drawElements( gl.TRIANGLES, this.numElements, gl.UNSIGNED_SHORT, 0 );
}

RenderObject.prototype.drawLines = function(gl)
{
	gl.drawElements( gl.LINES, this.numElements, gl.UNSIGNED_SHORT, 0 );
}

RenderObject.prototype.loadBuffers = function()
{
    //create positions buffer
    this.posBufferRef = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.posBufferRef );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW );
    //create colors buffer
    this.colorBufferRef = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.colorBufferRef );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW );
    //create indices buffer
    this.indexBufferRef = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBufferRef );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW );	
}