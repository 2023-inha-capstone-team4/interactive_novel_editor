### <키프레임 애니메이션 시스템>

## 1) MasterManager에서 렌더링 시스템을 통제합니다.

Scene Data를 메모리 상에 저장하고 관리하는 SceneManager,
현재 선택된 scene을 캔버스에 렌더링 하는 SceneRenderer,
캔버스 전체 시간과 deltaTime을 나타내는 MasterTimer,
Scene의 현재 재생시간을 통제하는 SceneTimer,
현재의 재생상태를 나타내는 playerStatus를 가지고 있습니다.

## 2) playerStatus는 play, stop 2가지 상태로 나뉘며,
play상태이면 sceneTimer가 update되고
키프레임 애니메이션이 재생됩니다.

## 3) 각각의 Keyframe은 다음의 정보를 담고 있습니다.
- timeLabel : keyframe이 위치한 시간대 (float)
- position : keyframe에서의 위치 (Vector2D)
- scale : keyframe에서의 이미지 배율 (Vector2D)
- rotation : keyframe에서의 이미지 회전 (float)
- image_fade_alpha : keyframe에서의 이미지 투명도 (1.0은 불투명, 0.0은 투명) (float)

* 이미지 회전의 경우 360, 720, 1080 등 n바퀴 회전 정의가 가능하도록 UI를 구성해야 합니다.

## 4) 각각의 Layer는 다음의 정보를 담고 있습니다.
- image : 자바스크립트의 Image 오브젝트. 소스 주소를 가지고 있습니다.
- keyframeList : 키프레임의 목록입니다.
- layer는 keyframe 목록에 따라, sceneRenderer에서 Linear Interpolation되어 화면에 렌더링 됩니다.

* 현재 ImageLayer만 구현이 완료되었고,
TextLayer는 구현을 해야합니다.

## 5) 각각의 Scene은 다음의 정보를 담고 있습니다.
-layerList
-soundList

- layer는 0번부터 순차적으로 렌더링 되며, index가 클수록 나중에 렌더링 되어
index가 작은 layer들의 위쪽에 위치하게 됩니다.

- sound는 0번부터 순차적으로 사운드 채널을 할당해 출력되며,
sceneRenderer에 의해 SoundKeyframe에 의해 volume(소리 크기)이 Linear Interpolation 되어 출력됩니다.
아직 구현되지 않았습니다.



## issue 1.
canvas를 인자로 전달하면, sceneRenderer에서 clearScreen을 올바르게 처리하지 못하는 문제가 있습니다.
따라서 MasterManager에 clearScreen을 처리한 문제가 있습니다.
