precision highp float;

uniform float uRadius;
uniform vec3 uMainColor;
uniform vec3 uCircleColor;
uniform vec3 uPointerPosition;

varying float vXPos;
varying float vYPos;
varying float vZPos;

void main() {
    if(distance(uPointerPosition, vec3(vXPos, vYPos, vZPos)) < uRadius) {
        gl_FragColor = vec4(uCircleColor, 1.);
    } else {
        gl_FragColor = vec4(1.0,1.0,1.0,0.);
    }
}
