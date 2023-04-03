import React, { useEffect, useRef, useState, useContext } from "react";

import p5 from "p5";

import Timer from "./../components/Timer";
import { Button } from "@mui/material";
import { ProfileButtonWrapper } from "../theme";

const TabletSketch = () => {
  const canvasRef = useRef(null);

  const maxGap = 200; // max gap between every user drawing

  const [clear, setClear] = useState(false);

  const setup = (p5, canvasParentRef) => {
    // define canvas size in inches according to the size of the wacom intuos pro medium size tablet (8.27 x 5.83 inches)
    const canvasWidth = 8.82 * 96;
    const canvasHeight = 5.83 * 96;
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.stroke(0);
    p5.background(200);
    p5.strokeWeight(1);
    for (let i = 0; i < canvasHeight; i += 20) {
      p5.line(0, i, canvasWidth, i);
    }
    p5.strokeWeight(3);
  };

  const draw = (p5) => {};

  const touchMoved = (p5) => {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    if (
      p5.mouseX < 0 ||
      p5.mouseX > p5.width ||
      p5.mouseY < 0 ||
      p5.mouseY > p5.height
    )
      return false; // prevent drawing outside of the canvas (this is a bug in p5.js)
  };

  const clearSketch = () => {
    setClear(true);
  };

  useEffect(() => {
    setClear(false);
  }, [clear]);

  // FIXME - save sketch to user's computer

  return (
    <>
      <ProfileButtonWrapper>
        <Button variant="contained" onClick={clearSketch}>
          Clear Sketch
        </Button>
        <Button variant="contained" onClick={() => p5.saveCanvas()}>
          Save Sketch
        </Button>
      </ProfileButtonWrapper>
      <Sketch
        setup={setup}
        draw={draw}
        touchMoved={touchMoved}
        canvasRef={canvasRef}
        clear={clear}
      />
      <Timer />
    </>
  );
};

const Sketch = ({ setup, draw, touchMoved, canvasRef, clear }) => {
  const sketchRef = useRef(null);

  const destroyCanvas = (p5) => {
    p5.remove();
  };

  useEffect(() => {
    new p5((p) => {
      sketchRef.current = p;
      p.setup = () => setup(p, canvasRef.current);
      p.draw = () => draw(p);
      p.touchMoved = () => touchMoved(p);
    });
    return () => {
      destroyCanvas(sketchRef.current);
    };
  }, [setup, draw, touchMoved, canvasRef, clear]);

  useEffect(() => {
    if (clear) {
      sketchRef.current.clear();
    }
  }, [clear]);

  return (
    <div
      ref={canvasRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default TabletSketch;
