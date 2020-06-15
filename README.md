# THREE.FlyControls2
Might be useful for your game's map editor

Demo: https://bytezeroseven.github.io/THREE.FlyControls2/

## Cheatsheet
  
    // Constructor
    FlyControls2( camera, domElement );

    // Properties
    FlyControls2.keys = { LEFT: keyCode, FORWARD: keyCode, RIGHT: keyCode, BACKWARD: keyCode };
    FlyControls2.object;
    FlyControls2.enabled;
    FlyControls2.movementSpeed;
    FlyControls2.rotationSpeed;

    // Methods
    FlyControls2.update();

Note: `FlyControls2.update` should be called in the animation loop or movements wouldn't occur.
