#pragma strict

var isRed = false;



var blueMaterial : Material;
var redMaterial : Material;

function OnTriggerEnter(){
	if(isRed == false){
		isRed = true;
		gameObject.renderer.material = redMaterial;
	}
}

function OnTriggerExit(){
	if(isRed == true){
		gameObject.collider.isTrigger = false;
		gameObject.tag = "RedSphere";
	}
}