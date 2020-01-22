attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float vXPos;
varying float vYPos;
varying float vZPos;

void main() {
    vXPos = position.x;
    vYPos = position.y;
    vZPos = position.z;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}
