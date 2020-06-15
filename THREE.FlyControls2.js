
THREE.FlyControls2 = function ( camera, domElement ) {

	this.object = camera;

	this.movementSpeed = 0.5;
	this.rotationSpeed = 1.5;
	this.enabled = true;

	this.keys = {
		LEFT: 65,
		FORWARD: 87,
		RIGHT: 68,
		BACKWARD: 83
	};

	var scope = this;

	var euler = new THREE.Euler( 0.0, 0.0, 0.0, 'YXZ' );
	var movement = new THREE.Vector2();

	var speedFactor = 1.0;
	var velocity = new THREE.Vector3();
	var moveLeft = moveRight = moveForward = moveBackward = false;

	var halfPi = Math.PI / 2;

	var isMouseDown = false;

	( function init() {

		domElement.addEventListener( 'mousewheel', onMouseWheel, false );
		domElement.addEventListener( 'mousedown', onMouseDown, false );
		domElement.addEventListener( 'mousemove', onMouseMove, false );
		window.addEventListener( 'mouseup', onMouseUp, true );
		window.addEventListener( 'keydown', onKeyDown, false );
		window.addEventListener( 'keyup', onKeyUp, false );

	} )();

	this.update = function () {

		var rotationSpeed = scope.rotationSpeed;

		euler.setFromQuaternion( scope.object.quaternion );

		euler.x -= movement.y * rotationSpeed;
		euler.y -= movement.x * rotationSpeed;
		euler.x = Math.min( halfPi, Math.max( - halfPi, euler.x ) );

		scope.object.quaternion.setFromEuler( euler );

		movement.set( 0.0, 0.0 );

		var movementSpeed = scope.movementSpeed * 0.1 * speedFactor;

		var accZ = Math.cos( Math.PI + euler.y ) * movementSpeed;
		var accY = Math.sin( euler.x ) * movementSpeed;
		var accX = Math.sin( Math.PI + euler.y ) * movementSpeed;

		velocity.set( 0.0, 0.0, 0.0 );

		if ( moveForward ) {

			velocity.x += accX;
			velocity.y += accY;
			velocity.z += accZ;

		} else if ( moveBackward ) {

			velocity.x -= accX;
			velocity.y -= accY;
			velocity.z -= accZ;

		}

		if ( moveRight ) {

			velocity.x += - accZ;
			velocity.z += accX;

		} else if ( moveLeft ) {

			velocity.x -= - accZ;
			velocity.z -= accX;

		}

		scope.object.position.add( velocity );

	}

	function onMouseDown( event ) {

		if ( ! scope.enabled ) return;

		domElement.requestPointerLock();

	}

	function onMouseMove( event ) {

		if ( ! scope.enabled || document.pointerLockElement != domElement ) return;

		movement.x += event.movementX * 0.001;
		movement.y += event.movementY * 0.001;

	}

	function onMouseUp( event ) {

		if ( ! scope.enabled ) return;

		document.exitPointerLock();

	}

	function onMouseWheel( event ) {

		if ( event.deltaY <= -100 ) {

			speedFactor *= 1.10;

		} else if ( event.deltaY >= 100 ) {

			speedFactor *= 0.90;

		}

	}

	function onKeyDown( event ) {

		if ( ! scope.enabled ) return;

		switch ( event.keyCode ) {

			case scope.keys.LEFT:
				moveLeft = true;
				break;

			case scope.keys.RIGHT:
				moveRight = true;
				break;

			case scope.keys.FORWARD:
				moveForward = true;
				break;

			case scope.keys.BACKWARD:
				moveBackward = true;
				break;

		}

	}

	function onKeyUp( event ) {

		if ( ! scope.enabled ) return;

		switch ( event.keyCode ) {

			case scope.keys.LEFT:
				moveLeft = false;
				break;

			case scope.keys.RIGHT:
				moveRight = false;
				break;

			case scope.keys.FORWARD:
				moveForward = false;
				break;

			case scope.keys.BACKWARD:
				moveBackward = false;
				break;

		}

	}

}
