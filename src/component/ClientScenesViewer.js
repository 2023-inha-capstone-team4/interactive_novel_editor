import React, { useEffect, useState, useRef } from "react";

function ClientScenesViewer({ sceneList }) {
  const [visibleScenes, setVisibleScenes] = useState([]);
  const sceneRefs = useRef([]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initialize the scene refs array
    sceneRefs.current = Array(sceneList.length)
      .fill()
      .map((_, i) => sceneRefs.current[i] || createSceneRef(i));
  }, [sceneList]);

  function createSceneRef(index) {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = -index; // Draw scenes in reverse order
    document.body.appendChild(canvas);

    return canvas;
  }

  function handleScroll() {
    updateVisibleScenes();
  }

  function updateVisibleScenes() {
    const newVisibleScenes = [];

    // Loop over each scene canvas and check if it's in the viewport
    for (let i = 0; i < sceneList.length; i++) {
      const canvas = sceneRefs.current[i];
      const rect = canvas.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
      if (isVisible) {
        // Scene is visible, add it to the list of visible scenes
        newVisibleScenes.push(i);
      }
    }

    // Pause any scenes that are no longer visible
    const pausedScenes = visibleScenes.filter(
      (sceneIndex) => !newVisibleScenes.includes(sceneIndex)
    );
    for (const sceneIndex of pausedScenes) {
      pauseScene(sceneIndex);
    }

    // Play any scenes that are now visible
    const playedScenes = newVisibleScenes.filter(
      (sceneIndex) => !visibleScenes.includes(sceneIndex)
    );
    for (const sceneIndex of playedScenes) {
      playScene(sceneIndex);
    }

    // Update the state with the new list of visible scenes
    setVisibleScenes(newVisibleScenes);
  }

  function playScene(sceneIndex) {
    const scene = sceneList[sceneIndex];
    const canvas = sceneRefs.current[sceneIndex];
    const ctx = canvas.getContext("2d");
    // TODO: Render the scene using the canvas context
  }

  function pauseScene(sceneIndex) {
    const scene = sceneList[sceneIndex];
    const canvas = sceneRefs.current[sceneIndex];
    const ctx = canvas.getContext("2d");
    // TODO: Clear the canvas to pause the scene
  }

  return (
    <div>
      {sceneList.map((scene, index) => (
        <canvas ref={(el) => (sceneRefs.current[index] = el)} />
      ))}
    </div>
  );
}