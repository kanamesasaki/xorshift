export default `#version 300 es
precision mediump float;

in vec4 vColor;
uniform vec2 uInverseTextureSize;
out vec4 fragColor;
uniform int uWidth;
uniform int uHeight;

const float PI = 3.141592653589793238462643383;
const uint MATRIX_A = 0x9908B0DFu;
const uint UPPER_MASK = 0x80000000u;
const uint LOWER_MASK = 0x7FFFFFFFu;
const uint FULL_MASK = 0xFFFFFFFFu;
uint x32 = 314159265u;

void initSeed(uint s) {
    x32 = s;
}

uint uintXorshift(void)
{
  x32 ^= x32 << 13;
  x32 ^= x32 >> 17;
  x32 ^= x32 << 5;
  return x32;
}

float floatXorshift(void) {
    return float(uintXorshift())*(1.0/4294967295.0);
}

vec4 intToVec4(int num) {
    int rIntValue = num & 0x000000FF;
    int gIntValue = (num & 0x0000FF00) >> 8;
    int bIntValue = (num & 0x00FF0000) >> 16;
    int aIntValue = (num & 0xFF000000) >> 24;
    vec4 numColor = vec4(float(rIntValue)/255.0, float(gIntValue)/255.0, float(bIntValue)/255.0, float(aIntValue)/255.0); 
    return numColor; 
} 

vec4 uintToVec4(uint num) {
    uint rIntValue = num & 0x000000FFu;
    uint gIntValue = (num & 0x0000FF00u) >> 8;
    uint bIntValue = (num & 0x00FF0000u) >> 16;
    uint aIntValue = (num & 0xFF000000u) >> 24;
    vec4 numColor = vec4(float(rIntValue)/255.0, float(gIntValue)/255.0, float(bIntValue)/255.0, float(aIntValue)/255.0); 
    return numColor;
}

vec4 floatToVec4(float val) {
    uint conv = floatBitsToUint(val);
    return uintToVec4(conv);
}

void main(void) {
    int pix = uWidth*int(gl_FragCoord.y) + int(gl_FragCoord.x) + 1;
    uint uintRand;
    float floatRand;

    if (pix < 1000) {
        for (int i=0; i<pix; i++) {
            uintRand = uintXorshift();
        }
        fragColor = uintToVec4(uintRand);
    }
    else {
        for (int i=0; i<pix; i++) {
            floatRand = floatXorshift();
        }
        fragColor = floatToVec4(floatRand);
    }
}`