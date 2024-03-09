// Grab the canvas and get the WebGL context
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// If we don't have a GL context, WebGL is not supported
if (!gl) {
    alert('WebGL not supported');
}

// Define the vertices for the triangle
const vertices = new Float32Array([
    0.0,  0.5,  // Vertex 1
   -0.5, -0.5,  // Vertex 2
    0.5, -0.5   // Vertex 3
]);

// Create a buffer and put the vertices in it
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Define the vertex shader
const vsSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

// Define the fragment shader
const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color
    }
`;

// Create and compile the vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

// Create and compile the fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Create the shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Use the program
gl.useProgram(program);

// Get the location of the attribute
const positionLocation = gl.getAttribLocation(program, "a_position");

// Enable the attribute
gl.enableVertexAttribArray(positionLocation);

// Tell the attribute how to get data out of the buffer
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);