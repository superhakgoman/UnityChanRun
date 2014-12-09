#pragma strict

var XMIN = -256;
var ZMIN = -256;
var XMAX = 256;
var ZMAX = 256;
var DISTANCE = 4;

var CROSSROAD : GameObject;

function Start () {
	setCrossRoads();
}

function setCrossRoads(){
	for(var x = XMIN; x <= XMAX; x += DISTANCE){
		for(var z = ZMIN; z<= ZMAX; z += DISTANCE){
			var cr = GameObject.Instantiate(CROSSROAD) as GameObject;
			cr.transform.parent = gameObject.transform;
			cr.transform.localPosition = Vector3(x, 1, z);
		}
	} 
}