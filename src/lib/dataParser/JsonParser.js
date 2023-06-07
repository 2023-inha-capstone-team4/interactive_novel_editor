import { Keyframe, TextKeyframe } from "../Keyframe";
import { ImageLayer, Layer, TextLayer } from "../Layer";
import Vector2D from "../Vector2D";
import {Scene} from "../Scene";
import {SoundEvent} from "../SoundEvent";

/**
 * 프로젝트를 json으로 변환하거나,
 * json을 프로젝트 파일로 변환합니다. * 
 * 
 * 
 * 
 */
export class JsonParser
{
    static changeSceneListToJson(sceneList)
    {
        return JSON.stringify(sceneList);
    }

    static jsonToImageLayer(json) {
        const layer = new ImageLayer(json.imagePath);
        layer.name = json.name;
        layer.repeatType = json.repeatType;
      
        for (const keyframeJson of json.keyframeList) {
          const keyframe = new Keyframe(
            keyframeJson.timeLabel,
            new Vector2D(keyframeJson.position.x, keyframeJson.position.y),
            new Vector2D(keyframeJson.scale.x, keyframeJson.scale.y),
            keyframeJson.rotation,
            keyframeJson.image_fade_alpha
          );
          layer.addKeyframe(keyframe);
        }
      
        return layer;
      }

      static jsonToTextLayer(json) {
        const layer = new TextLayer();
        layer.name = json.name;
        layer.repeatType = json.repeatType;
      
        for (const keyframeJson of json.keyframeList) {
          const keyframe = new TextKeyframe(
            keyframeJson.timeLabel,
            new Vector2D(keyframeJson.position.x, keyframeJson.position.y),
            new Vector2D( keyframeJson.scale.x, keyframeJson.scale.y),
            keyframeJson.rotation,
            keyframeJson.image_fade_alpha,
            keyframeJson.color
          );
          layer.addKeyframe(keyframe);
        }
      
        return layer;
      }

      static jsonToSoundEvent(json) {
        const { name, timeLabel, soundPath, duration, isPlaying } = json;
        const sound = new SoundEvent(timeLabel, soundPath, duration);
        sound.name = name;
        sound.isPlaying = isPlaying;
        return sound;
      }

      
    static jsonToScene(json) {
        const scene = new Scene();
        scene.name = json.name;
        scene.selectedLayerIndex = json.selectedLayerIndex;
      
        for (const layerJson of json.layerList) {
          let layer;
          if (layerJson.layerType === "image") {
            layer = JsonParser.jsonToImageLayer(layerJson);
          } else if (layerJson.layerType === "text") {
            layer = JsonParser.jsonToTextLayer(layerJson);
          } else {
            layer = new Layer();
          }
          scene.addLayer(layer);
        }

        for (const soundJson of json.soundList)
        {
            let sound;

            sound=JsonParser.jsonToSoundEvent(soundJson);

            scene.addSound(sound);
        }
      
        return scene;
      }

      static jsonToSceneList(json) {
        const sceneListJson = JSON.parse(json);
        const sceneList = [];
      
        for (const sceneJson of sceneListJson) {
          const scene = JsonParser.jsonToScene(sceneJson);
          sceneList.push(scene);
        }
      
        return sceneList;
      }
}