/* global Hydra */
/* global CodeMirror */

console.log("hi :)");
let hydra, hydraCanvas;
hydraCanvas = document.createElement("canvas");
hydraCanvas.width = window.innerWidth;
hydraCanvas.height = window.innerHeight;
hydraCanvas.id = "hydraCanvas";
hydraCanvas.style.position = "absolute";
hydraCanvas.style.zIndex = 2;
hydraCanvas.style.width = "100%";
hydraCanvas.style.height = "100%";
hydraCanvas.style.top = 0;
hydraCanvas.style.left = 0;
hydraCanvas.getContext("webgl", { preserveDrawingBuffer: true });
hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  enableStreamCapture: false,
  width: 1920,
  height: 1080,
});

document.querySelector(".placeholder").appendChild(hydraCanvas);

/////////////

const lastCode = `src(s0).out()`;
var container = document.querySelector("#editor-container");
var el = document.createElement("TEXTAREA");
//document.body.appendChild(container);
container.appendChild(el);

const cm = CodeMirror.fromTextArea(el, {
  //theme: "paraiso-dark",
  theme: "night",
  value: "a",
  mode: { name: "javascript", globalVars: true },
  lineWrapping: true,
  styleSelectedText: true,
});
cm.refresh();
cm.setValue(lastCode);

// https://github.com/ojack/hydra/blob/3dcbf85c22b9f30c45b29ac63066e4bbb00cf225/hydra-server/app/src/editor.js
const flashCode = function (start, end) {
  if (!start) start = { line: cm.firstLine(), ch: 0 };
  if (!end) end = { line: cm.lastLine() + 1, ch: 0 };
  var marker = cm.markText(start, end, { className: "styled-background" });
  setTimeout(() => marker.clear(), 300);
};

const getLine = function () {
  var c = cm.getCursor();
  var s = cm.getLine(c.line);
  flashCode({ line: c.line, ch: 0 }, { line: c.line + 1, ch: 0 });
  return s;
};

const getCurrentBlock = function () {
  // thanks to graham wakefield + gibber
  var editor = cm;
  var pos = editor.getCursor();
  var startline = pos.line;
  var endline = pos.line;
  while (startline > 0 && cm.getLine(startline) !== "") {
    startline--;
  }
  while (endline < editor.lineCount() && cm.getLine(endline) !== "") {
    endline++;
  }
  var pos1 = {
    line: startline,
    ch: 0,
  };
  var pos2 = {
    line: endline,
    ch: 0,
  };
  var str = editor.getRange(pos1, pos2);

  flashCode(pos1, pos2);

  return str;
};

const editorConsoleText = document.getElementById("editor-console-text");
function evalCode(c) {
  try {
    let result = eval(c);
    if (result === undefined) result = "";
    editorConsoleText.innerText = result;
    editorConsoleText.className = "normal";
    localStorage.setItem("hydracode", cm.getValue());
  } catch (e) {
    console.log(e);
    editorConsoleText.innerText = e;
    editorConsoleText.className = "error";
  }
}

{
  // init
  const code = cm.getValue();
  // evalCode(code);
}

function toggleCode() {
  if (container.style.visibility == "hidden") {
    container.style.visibility = "inherit";
  } else {
    container.style.visibility = "hidden";
  }
}

const commands = {
  evalAll: () => {
    const code = cm.getValue();
    flashCode();
    evalCode(code);
  },
  toggleEditor: () => {
    toggleCode();
  },
  evalLine: () => {
    const code = getLine();
    evalCode(code);
  },
  toggleComment: () => {
    cm.toggleComment();
  },
  evalBlock: () => {
    const code = getCurrentBlock();
    evalCode(code);
  },
};

const keyMap = {
  evalAll: { key: "ctrl+shift+enter" },
  toggleEditor: { key: "ctrl+shift+h" },
  toggleComment: { key: "ctrl+/" },
  evalLine: { key: "shift+enter,ctrl+enter" },
  evalBlock: { key: "alt+enter" },
};

// enable in textarea
hotkeys.filter = function (event) {
  return true;
};
const commandNames = Object.keys(keyMap);
for (const commandName of commandNames) {
  const hk = keyMap[commandName];
  if (typeof commands[commandName] === "function") {
    hotkeys(hk.key, function (e, hotkeyHandler) {
      e.preventDefault();
      commands[commandName]();
    });
  }
}

/////////////



//create an array to hold our cc values and init to a normalized value
var cc = Array(128).fill(0.5);

getMIDIMessage = function (midiMessage) {
  var arr = midiMessage.data;
  var index = arr[1];
  //console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
  var val = (arr[2] + 1) / 128.0; // normalize CC values to 0.0 - 1.0
  cc[index] = val;
};

//s0.initCam()

render(o0);

console.log(cc[16]);


let scale, rotY, rotX, rotZ, changeModel, button, models, randomModel, torus1;
//let glitch2, capture, w = 800, h = 600;
let sketch = function (p) {
  p.preload = function () {
    let gusano, head, crater, forma4, voronoi1, voronoi7, mosca;
    //modelo1;
    
    gusano = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/gusano.obj",
      true
    );
    
    //modelo2;
    
    head = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/wormhead-light.obj",
      true
    );
    
    //modelo3;
    
    crater = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/crater2.obj",
      true
    );
   
    
    //modelo4;
    
    forma4 = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/shape4.obj",
      true
    );
   
    
    //modelo5;
    
    voronoi1 = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/voronoi1.obj",
      true
    );
    
    
    //modelo5;
    
    voronoi1 = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/voronoi1.obj",
      true
    );
   
    
    
    //modelo6;
    
    mosca = p.loadModel(
      "https://cdn.glitch.global/6d8e72f7-9a49-4a0c-80c6-bcbe8874a3fd/mosca.obj",
      true
    );






    /* MODELOS MESH  LOAD*/

    models = [
      () => p.model(gusano),
      () => {
        p.rotateX(Math.PI);
        p.model(forma4);
      },
      () => {
        p.rotateX(Math.PI);
        for (i = 0; i < 5; i++) {
          p.translate(0,0,100);
          p.rotateY(time*0.5)
          p.model(forma4);
        }
      },
      () => {
        for (i = 0; i < 3; i++) {
          p.translate(0, 0, 100);
          p.rotateX(150 * i);
          p.model(voronoi1);
        }
      },
      () => {
        for (i = 0; i < 10; i++) {
          p.translate(0, 0, 50 * i);
          p.rotateY(time * 0.1);
          p.model(voronoi1);
          p.rotateX(time * 0.3);
        }
      },
      () => p.model(crater),
      () => {
        for(i=0; i<10; i++){
        p.translate(50*i,0,100);
        p.rotateX(i)
        p.rotateY(time*0.2+i);
        p.model(head);
        }
        },

      () => p.model(head),
      () => {
        for(i=0; i<10; i++){
        p.translate(50*i,0,100);
        p.rotateX(i)
        p.rotateY(time*0.2+i);
        p.model(crater);
        }
        },


      () => p.model(mosca),
      () => {
        for(i=0; i<10; i++){
        p.translate(50*i,0,100);
        p.rotateX(i)
        p.rotateY(time*0.2+i);
        p.model(crater);
        }
        },

      () => p.model(voronoi1),
      () => {
        for(i=0; i<10; i++){
        p.translate(50*i,0,100);
        p.rotateX(i)
        p.rotateY(time*0.2+i);
        p.model(crater);
        }
        },

      () => {
        let x1 = p.map(p.mouseX, 0, p.width, 50, 300);
        let y1 = p.map(p.mouseY, 0, p.height, 10, 200);
        p.torus(x1, y1);
      },




    ];
  };

  p.setup = function () {
    let canvas = p.createCanvas(hydraCanvas.width, hydraCanvas.height, p.WEBGL);
    p.pixelDensity(1);
    elt = canvas.elt;
    s0.init({ src: elt });


/* SLIDERS */





let sliderHeight = 40;
let sliderWidth = 80;
let sliderMargin = 0.02;

scale = p.createSlider(3, 10, 1);
scale.position(p.windowWidth - sliderWidth - sliderMargin, p.windowHeight - sliderHeight * 5  - sliderMargin * 5 - 0.1);
scale.style("width", sliderWidth + "px");
scale.style('-webkit-appearance', 'none');
scale.style('background-color', 'blue');
scale.style('border-radius', '5px');
scale.style('outline', 'none');
scale.style('opacity', '0.6');
scale.style('transition', 'opacity .2s');



rotX = p.createSlider(0, 2, 0, 0);
rotX.position(p.windowWidth - sliderWidth - sliderMargin, p.windowHeight - sliderHeight * 2 - sliderMargin * 2 - 0.1);
rotX.style("width", sliderWidth + "px");
rotX.style('-webkit-appearance', 'none');
rotX.style('background-color', 'blue');
rotX.style('border-radius', '5px');
rotX.style('outline', 'none');
rotX.style('opacity', '0.6');
rotX.style('transition', 'opacity .2s');


rotY = p.createSlider(0, 2, 1, 0);
rotY.position(p.windowWidth - sliderWidth - sliderMargin, p.windowHeight - sliderHeight * 3 - sliderMargin * 3 - 0.1);
rotY.style("width", sliderWidth + "px");
rotY.style('-webkit-appearance', 'none');
rotY.style('background-color', 'blue');
rotY.style('border-radius', '5px');
rotY.style('outline', 'none');
rotY.style('opacity', '0.6');
rotY.style('transition', 'opacity .2s');


rotZ = p.createSlider(0, 2, 0, 0);
rotZ.position(p.windowWidth - sliderWidth - sliderMargin, p.windowHeight - sliderHeight * 4 - sliderMargin * 4 - 0.1);
rotZ.style("width", sliderWidth + "px");
rotZ.style('-webkit-appearance', 'none');
rotZ.style('background-color', 'blue');
rotZ.style('border-radius', '5px');
rotZ.style('outline', 'none');
rotZ.style('opacity', '0.6');
rotZ.style('transition', 'opacity .2s');





     /* BOTON */

    button = p.createButton(">>>");
    button.position(5,5);
    button.mousePressed(changeModel);
    button.style("background-color", "rgba(0, 0, 255)");
    button.style("color", "rgba(255, 0, 102)");
    button.style("border", "none");
    button.style("border-radius", "30px");
    button.style("hover-show" )
    button.style("z-index", "1");

    canvas.hide();
    p.background("rgba(0%,0%,0%,0)");

    // models = [obj, skl, flor,torus1];

    changeModel();
  };

  p.draw = function () {
    let val = scale.value();
    let valRotX = rotX.value();
    let valRotY = rotY.value();
    let valRotZ = rotZ.value();

    let locX = p.mouseX - p.height / 2;
    let locY = p.mouseY - p.width / 2;

    //p.ambientLight(60, 60, 60);
    //p.pointLight(255, 255, 255, locX, locY, 100);

    p.scale(val);
    p.clear();
    //p.orbitControl(50);
    p.noStroke();
    //p.fill(255);
    p.normalMaterial();
    //p.specularMaterial(250);
    p.rotateX(time * valRotX);
    p.rotateY(time * valRotY);
    p.rotateZ(time * valRotZ);
    //p.torus(100);
    //p.model(obj);

    // p.model(randomModel);
    randomModel();
  };

  changeModel = function () {
    randomModel = p.random(models);
  };
};
new p5(sketch, "container");

evalCode(lastCode);
