﻿#pragma strict

private var anim : Animator;

private var timer : float = 0.0f;
private var isStarted = false;
private var isRotating = false;
private var isRotateOrdered = false;

private var rDir : Vector3;

private var crossRoadPositionX : float;
private var crossRoadPositionZ : float;

private var velocity : Vector3 = Vector3(0, 0, 0);

var startTime : float = 1.0f;
var runBackward = false;

var runSpeed : float = 10.0f;
var rotateSpeed : float = 15.0f;
var jumpForce : float = 5.0f;

function Start () {
	anim = GetComponent(Animator);
//	anim = GetComponentInChildren(Animator);
}

function Update () {
	timer += Time.deltaTime;
	if(timer < startTime){
		return;
	} 
	if(isStarted == false){
		isStarted = true;
		setVelocity();
		anim.SetBool("Run", true);
	}
	var h : float = Input.GetAxis ("Horizontal");
	if(Input.GetKeyDown(KeyCode.LeftArrow) && isRotating == false){
		rDir = transform.TransformDirection(Vector3.left);
		isRotateOrdered = true;
//		anim.SetBool("Left", true);
	}
	else if(Input.GetKeyDown(KeyCode.RightArrow) && isRotating == false){
		rDir = transform.TransformDirection(Vector3.right);
		isRotateOrdered = true;
//		anim.SetBool("Right", true);
	}
	if(isRotating){
		var rotatedDirection = Quaternion.LookRotation(rDir);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotatedDirection, rotateSpeed * Time.deltaTime); 
		var tmp = transform.TransformDirection(Vector3.forward);
		
		var dot = Vector3.Dot(rDir, tmp);
		if(dot > 0.9999f) {
			transform.rotation = rotatedDirection;
			isRotating = false;
			setVelocity();
//			anim.SetBool("Left", false);
//			anim.SetBool("Right", false);
		}
	}
	else{
		transform.localPosition += velocity * Time.deltaTime;
	}
}

function setVelocity(){
	velocity = transform.TransformDirection(Vector3(0, 0, runSpeed));
}

function OnTriggerEnter (collider : Collider) {
	if(isRotateOrdered == true && collider.gameObject.CompareTag("CrossRoad") == true){
		transform.position.x = collider.gameObject.transform.position.x;
		transform.position.z = collider.gameObject.transform.position.z;
		isRotating = true;
		isRotateOrdered = false;
	}
}

function OnCollisionEnter (collision : Collision){
	if(collision.gameObject.CompareTag("RedSphere")){
		runSpeed = 0.0f;
		setVelocity();
		anim.SetBool("Run", false);
		anim.SetBool("Blocked", true);
	}
}