function Robot() {
//BODY
	this.body = new RenderObject(36);
	this.body.instanceName = "Body";
	this.body.vertices = CubeVertices;
	this.body.colors = CubeColors;
	this.body.indices = CubeIndices;

//NECK
	this.neck = new RenderObject(36);
	this.neck.instanceName = "Neck";
	this.neck.vertices = CubeVertices;
	this.neck.colors = CubeColors;
	this.neck.indices = CubeIndices;

	this.head = new RenderObject(36);
	this.head.instanceName = "Head";
	this.head.vertices = CubeVertices;
	this.head.colors = CubeColors;
	this.head.indices = CubeIndices;

//RIGHT SHOULDER
	this.rightShoulder = new RenderObject(36);
	this.rightShoulder.instanceName = "Right Shoulder";
	this.rightShoulder.vertices = CubeVertices;
	this.rightShoulder.colors = CubeColors;
	this.rightShoulder.indices = CubeIndices;

	this.rightArm = new RenderObject(36);
	this.rightArm.instanceName = "Right Arm";
	this.rightArm.vertices = CubeVertices;
	this.rightArm.colors = CubeColors;
	this.rightArm.indices = CubeIndices;

//RIGHT ELBOW
	this.rightElbow = new RenderObject(36);
	this.rightElbow.instanceName = "Right Elbow";
	this.rightElbow.vertices = CubeVertices;
	this.rightElbow.colors = CubeColors;
	this.rightElbow.indices = CubeIndices;

	this.rightForearm = new RenderObject(36);
	this.rightForearm.instanceName = "Right Forearm";
	this.rightForearm.vertices = CubeVertices;
	this.rightForearm.colors = CubeColors;
	this.rightForearm.indices = CubeIndices;

//RIGHT WRIST
	this.rightWrist = new RenderObject(36);
	this.rightWrist.instanceName = "Right Wrist";
	this.rightWrist.vertices = CubeVertices;
	this.rightWrist.colors = CubeColors;
	this.rightWrist.indices = CubeIndices;

	this.rightHand = new RenderObject(36);
	this.rightHand.instanceName = "Right Hand";
	this.rightHand.vertices = CubeVertices;
	this.rightHand.colors = CubeColors;
	this.rightHand.indices = CubeIndices;

//LEFT SHOULDER
	this.leftShoulder = new RenderObject(36);
	this.leftShoulder.instanceName = "Left Shoulder";
	this.leftShoulder.vertices = CubeVertices;
	this.leftShoulder.colors = CubeColors;
	this.leftShoulder.indices = CubeIndices;

	this.leftArm = new RenderObject(36);
	this.leftArm.instanceName = "Left Arm";
	this.leftArm.vertices = CubeVertices;
	this.leftArm.colors = CubeColors;
	this.leftArm.indices = CubeIndices;

//LEFT ELBOW
	this.leftElbow = new RenderObject(36);
	this.leftElbow.instanceName = "Left Elbow";
	this.leftElbow.vertices = CubeVertices;
	this.leftElbow.colors = CubeColors;
	this.leftElbow.indices = CubeIndices;

	this.leftForearm = new RenderObject(36);
	this.leftForearm.instanceName = "Left Forearm";
	this.leftForearm.vertices = CubeVertices;
	this.leftForearm.colors = CubeColors;
	this.leftForearm.indices = CubeIndices;

//LEFT WRIST
	this.leftWrist = new RenderObject(36);
	this.leftWrist.instanceName = "Left Wrist";
	this.leftWrist.vertices = CubeVertices;
	this.leftWrist.colors = CubeColors;
	this.leftWrist.indices = CubeIndices;

	this.leftHand = new RenderObject(36);
	this.leftHand.instanceName = "Left Hand";
	this.leftHand.vertices = CubeVertices;
	this.leftHand.colors = CubeColors;
	this.leftHand.indices = CubeIndices;

//LEFTHIP
    this.rightHip = new RenderObject(36);
    this.rightHip.instanceName = "Right Hip";
    this.rightHip.vertices = CubeVertices;
    this.rightHip.colors = CubeColors;
    this.rightHip.indices = CubeIndices;

    this.rightThigh = new RenderObject(36);
    this.rightThigh.instanceName = "Right Thigh";
    this.rightThigh.vertices = CubeVertices;
    this.rightThigh.colors = CubeColors;
    this.rightThigh.indices = CubeIndices;

//LEFTKNEE
    this.rightKnee = new RenderObject(36);
    this.rightKnee.instanceName = "Right Knee";
    this.rightKnee.vertices = CubeVertices;
    this.rightKnee.colors = CubeColors;
    this.rightKnee.indices = CubeIndices;

    this.rightLeg = new RenderObject(36);
    this.rightLeg.instanceName = "Right Leg";
    this.rightLeg.vertices = CubeVertices;
    this.rightLeg.colors = CubeColors;
    this.rightLeg.indices = CubeIndices;

//LEFTANKLE
    this.rightAnkle = new RenderObject(36);
    this.rightAnkle.instanceName = "Right Ankle";
    this.rightAnkle.vertices = CubeVertices;
    this.rightAnkle.colors = CubeColors;
    this.rightAnkle.indices = CubeIndices;

    this.rightFoot = new RenderObject(36);
    this.rightFoot.instanceName = "Right Foot";
    this.rightFoot.vertices = CubeVertices;
    this.rightFoot.colors = CubeColors;
    this.rightFoot.indices = CubeIndices;

//LEFTHIP
	this.leftHip = new RenderObject(36);
	this.leftHip.instanceName = "Left Hip";
	this.leftHip.vertices = CubeVertices;
	this.leftHip.colors = CubeColors;
	this.leftHip.indices = CubeIndices;

	this.leftThigh = new RenderObject(36);
	this.leftThigh.instanceName = "Left Thigh";
	this.leftThigh.vertices = CubeVertices;
	this.leftThigh.colors = CubeColors;
	this.leftThigh.indices = CubeIndices;

//LEFTKNEE
	this.leftKnee = new RenderObject(36);
	this.leftKnee.instanceName = "Left Knee";
	this.leftKnee.vertices = CubeVertices;
	this.leftKnee.colors = CubeColors;
	this.leftKnee.indices = CubeIndices;

	this.leftLeg = new RenderObject(36);
	this.leftLeg.instanceName = "Left Leg";
	this.leftLeg.vertices = CubeVertices;
	this.leftLeg.colors = CubeColors;
	this.leftLeg.indices = CubeIndices;

//LEFTANKLE
	this.leftAnkle = new RenderObject(36);
	this.leftAnkle.instanceName = "Left Ankle";
	this.leftAnkle.vertices = CubeVertices;
	this.leftAnkle.colors = CubeColors;
	this.leftAnkle.indices = CubeIndices;

	this.leftFoot = new RenderObject(36);
	this.leftFoot.instanceName = "Left Foot";
	this.leftFoot.vertices = CubeVertices;
	this.leftFoot.colors = CubeColors;
	this.leftFoot.indices = CubeIndices;
}

Robot.prototype.init = function(){
//BODY

    this.body.position = vec3(0.0, 0.0, 0.0);
    this.body.updateTranslationMatrix();
    this.body.scale = vec3(1, 1, 0.5);
    this.body.updateScaleMatrix();

    this.body.children.push(this.neck);
    this.body.children.push(this.leftShoulder);
    this.body.children.push(this.rightShoulder);
    this.body.children.push(this.leftHip);
    this.body.children.push(this.rightHip);

//NECK
	
	this.neck.position = vec3(0, 0.525, 0);
    this.neck.updateTranslationMatrix();
    this.neck.scale = vec3(0.3, 0.3, 0.2);
    this.neck.updateScaleMatrix();
    this.neck.setLocalPivot(vec3(0, -0.15, 0));

    this.neck.children.push(this.head);

    this.head.position = vec3(0, 0.8, 0);
    this.head.updateTranslationMatrix();
    this.head.scale = vec3(0.5, 0.5, 0.3);
    this.head.updateScaleMatrix();

//RIGHT SHOULDER
	
    this.rightShoulder.position = vec3(0.7, 0.4, 0);
    this.rightShoulder.updateTranslationMatrix();
    this.rightShoulder.scale = vec3(0.4, 0.4, 0.4);
    this.rightShoulder.updateScaleMatrix();

    this.rightShoulder.children.push(this.rightArm);

    this.rightArm.position = vec3(0.7, 0.05, 0);
    this.rightArm.updateTranslationMatrix();
    this.rightArm.scale = vec3(0.25, 0.3, 0.25);
    this.rightArm.updateScaleMatrix();

    this.rightArm.children.push(this.rightElbow);

    this.rightElbow.position = vec3(0.7, -0.25, 0);
    this.rightElbow.updateTranslationMatrix();
    this.rightElbow.scale = vec3(0.3, 0.3, 0.3);
    this.rightElbow.updateScaleMatrix();

    this.rightElbow.children.push(this.rightForearm);

    this.rightForearm.position = vec3(0.7, -0.525, 0);
    this.rightForearm.updateTranslationMatrix();
    this.rightForearm.scale = vec3(0.25, 0.25, 0.25);
    this.rightForearm.updateScaleMatrix();

    this.rightForearm.children.push(this.rightWrist);

    this.rightWrist.position = vec3(0.7, -0.7, 0);
    this.rightWrist.updateTranslationMatrix();
    this.rightWrist.scale = vec3(0.3, 0.1, 0.2);
    this.rightWrist.updateScaleMatrix();

    this.rightWrist.children.push(this.rightHand);

    this.rightHand.position = vec3(0.7, -0.95, 0);
    this.rightHand.updateTranslationMatrix();
    this.rightHand.scale = vec3(0.4, 0.4, 0.1);
    this.rightHand.updateScaleMatrix();

//LEFT SHOULDER
	
    this.leftShoulder.position = vec3(-0.7, 0.4, 0);
    this.leftShoulder.updateTranslationMatrix();
    this.leftShoulder.scale = vec3(0.4, 0.4, 0.4);
    this.leftShoulder.updateScaleMatrix();

    this.leftShoulder.children.push(this.leftArm);

    this.leftArm.position = vec3(-0.7, 0.05, 0);
    this.leftArm.updateTranslationMatrix();
    this.leftArm.scale = vec3(0.25, 0.3, 0.25);
    this.leftArm.updateScaleMatrix();

    this.leftArm.children.push(this.leftElbow);

    this.leftElbow.position = vec3(-0.7, -0.25, 0);
    this.leftElbow.updateTranslationMatrix();
    this.leftElbow.scale = vec3(0.3, 0.3, 0.3);
    this.leftElbow.updateScaleMatrix();

    this.leftElbow.children.push(this.leftForearm);

    this.leftForearm.position = vec3(-0.7, -0.525, 0);
    this.leftForearm.updateTranslationMatrix();
    this.leftForearm.scale = vec3(0.25, 0.25, 0.25);
    this.leftForearm.updateScaleMatrix();

    this.leftForearm.children.push(this.leftWrist);

    this.leftWrist.position = vec3(-0.7, -0.7, 0);
    this.leftWrist.updateTranslationMatrix();
    this.leftWrist.scale = vec3(0.3, 0.1, 0.2);
    this.leftWrist.updateScaleMatrix();

    this.leftWrist.children.push(this.leftHand);

    this.leftHand.position = vec3(-0.7, -0.95, 0);
    this.leftHand.updateTranslationMatrix();
    this.leftHand.scale = vec3(0.4, 0.4, 0.1);
    this.leftHand.updateScaleMatrix();

//RIGHTLEG
    
    this.rightHip.position = vec3(0.2, -0.6, 0);
    this.rightHip.updateTranslationMatrix();
    this.rightHip.scale = vec3(0.4, 0.2, 0.3);
    this.rightHip.updateScaleMatrix();

    this.rightHip.children.push(this.rightThigh);

    this.rightThigh.position = vec3(0.2, -1.1, 0);
    this.rightThigh.updateTranslationMatrix();
    this.rightThigh.scale = vec3(0.3, 0.8, 0.25);
    this.rightThigh.updateScaleMatrix();

    this.rightThigh.children.push(this.rightKnee);

    this.rightKnee.position = vec3(0.2, -1.5, 0);
    this.rightKnee.updateTranslationMatrix();
    this.rightKnee.scale = vec3(0.35, 0.2, 0.3);
    this.rightKnee.updateScaleMatrix();

    this.rightKnee.children.push(this.rightLeg);

    this.rightLeg.position = vec3(0.2, -1.9, 0);
    this.rightLeg.updateTranslationMatrix();
    this.rightLeg.scale = vec3(0.2, 0.6, 0.2);
    this.rightLeg.updateScaleMatrix();

    this.rightLeg.children.push(this.rightAnkle);

    this.rightAnkle.position = vec3(0.2, -2.2, 0);
    this.rightAnkle.updateTranslationMatrix();
    this.rightAnkle.scale = vec3(0.35, 0.2, 0.3);
    this.rightAnkle.updateScaleMatrix();

    this.rightAnkle.children.push(this.rightFoot);

    this.rightFoot.position = vec3(0.2, -2.4, 0);
    this.rightFoot.updateTranslationMatrix();
    this.rightFoot.scale = vec3(0.4, 0.2, 1);
    this.rightFoot.updateScaleMatrix();

//LEFTLEG
	
	this.leftHip.position = vec3(-0.2, -0.6, 0);
    this.leftHip.updateTranslationMatrix();
    this.leftHip.scale = vec3(0.4, 0.2, 0.3);
    this.leftHip.updateScaleMatrix();

    this.leftHip.children.push(this.leftThigh);

    this.leftThigh.position = vec3(-0.2, -1.1, 0);
    this.leftThigh.updateTranslationMatrix();
    this.leftThigh.scale = vec3(0.3, 0.8, 0.25);
    this.leftThigh.updateScaleMatrix();

    this.leftThigh.children.push(this.leftKnee);

    this.leftKnee.position = vec3(-0.2, -1.5, 0);
    this.leftKnee.updateTranslationMatrix();
    this.leftKnee.scale = vec3(0.35, 0.2, 0.3);
    this.leftKnee.updateScaleMatrix();

    this.leftKnee.children.push(this.leftLeg);

    this.leftLeg.position = vec3(-0.2, -1.9, 0);
    this.leftLeg.updateTranslationMatrix();
    this.leftLeg.scale = vec3(0.2, 0.6, 0.2);
    this.leftLeg.updateScaleMatrix();

    this.leftLeg.children.push(this.leftAnkle);

    this.leftAnkle.position = vec3(-0.2, -2.2, 0);
    this.leftAnkle.updateTranslationMatrix();
    this.leftAnkle.scale = vec3(0.35, 0.2, 0.3);
    this.leftAnkle.updateScaleMatrix();

    this.leftAnkle.children.push(this.leftFoot);

    this.leftFoot.position = vec3(-0.2, -2.4, 0);
    this.leftFoot.updateTranslationMatrix();
    this.leftFoot.scale = vec3(0.4, 0.2, 1);
    this.leftFoot.updateScaleMatrix();

    this.body.translateWithChildren(vec3(0,2.5,0));
}

Robot.prototype.render = function(){
	this.body.setWebGLToDraw(gl);
    this.body.drawTriangles(gl);

    this.neck.setWebGLToDraw(gl);
    this.neck.drawTriangles(gl);
    this.head.setWebGLToDraw(gl);
    this.head.drawTriangles(gl);
    
    this.rightShoulder.setWebGLToDraw(gl);
    this.rightShoulder.drawTriangles(gl);
    this.rightArm.setWebGLToDraw(gl);
    this.rightArm.drawTriangles(gl);

    this.rightElbow.setWebGLToDraw(gl);
    this.rightElbow.drawTriangles(gl);
    this.rightForearm.setWebGLToDraw(gl);
    this.rightForearm.drawTriangles(gl);

    this.rightWrist.setWebGLToDraw(gl);
    this.rightWrist.drawTriangles(gl);
    this.rightHand.setWebGLToDraw(gl);
    this.rightHand.drawTriangles(gl);

    this.leftShoulder.setWebGLToDraw(gl);
    this.leftShoulder.drawTriangles(gl);
    this.leftArm.setWebGLToDraw(gl);
    this.leftArm.drawTriangles(gl);

    this.leftElbow.setWebGLToDraw(gl);
    this.leftElbow.drawTriangles(gl);
    this.leftForearm.setWebGLToDraw(gl);
    this.leftForearm.drawTriangles(gl);

    this.leftWrist.setWebGLToDraw(gl);
    this.leftWrist.drawTriangles(gl);
    this.leftHand.setWebGLToDraw(gl);
    this.leftHand.drawTriangles(gl);

    this.rightHip.setWebGLToDraw(gl);
    this.rightHip.drawTriangles(gl);
    this.rightThigh.setWebGLToDraw(gl);
    this.rightThigh.drawTriangles(gl);
    
    this.rightKnee.setWebGLToDraw(gl);
    this.rightKnee.drawTriangles(gl);
    this.rightLeg.setWebGLToDraw(gl);
    this.rightLeg.drawTriangles(gl);
    
    this.rightAnkle.setWebGLToDraw(gl);
    this.rightAnkle.drawTriangles(gl);
    this.rightFoot.setWebGLToDraw(gl);
    this.rightFoot.drawTriangles(gl);

    this.leftHip.setWebGLToDraw(gl);
    this.leftHip.drawTriangles(gl);
    this.leftThigh.setWebGLToDraw(gl);
    this.leftThigh.drawTriangles(gl);
    
    this.leftKnee.setWebGLToDraw(gl);
    this.leftKnee.drawTriangles(gl);
    this.leftLeg.setWebGLToDraw(gl);
    this.leftLeg.drawTriangles(gl);
    
    this.leftAnkle.setWebGLToDraw(gl);
    this.leftAnkle.drawTriangles(gl);
    this.leftFoot.setWebGLToDraw(gl);
    this.leftFoot.drawTriangles(gl);
}

Robot.prototype.loadBuffers = function(){
	this.body.loadBuffers();

    this.neck.loadBuffers();
    this.head.loadBuffers();

    this.rightShoulder.loadBuffers();
    this.rightArm.loadBuffers();

    this.rightElbow.loadBuffers();
    this.rightForearm.loadBuffers();

    this.rightWrist.loadBuffers();
    this.rightHand.loadBuffers();
    
    this.leftShoulder.loadBuffers();
    this.leftArm.loadBuffers();

    this.leftElbow.loadBuffers();
    this.leftForearm.loadBuffers();

    this.leftWrist.loadBuffers();
    this.leftHand.loadBuffers();

    this.rightHip.loadBuffers();
    this.rightThigh.loadBuffers();

    this.rightKnee.loadBuffers();
    this.rightLeg.loadBuffers();

    this.rightAnkle.loadBuffers();
    this.rightFoot.loadBuffers();

    this.leftHip.loadBuffers();
    this.leftThigh.loadBuffers();

    this.leftKnee.loadBuffers();
    this.leftLeg.loadBuffers();

    this.leftAnkle.loadBuffers();
    this.leftFoot.loadBuffers();
}