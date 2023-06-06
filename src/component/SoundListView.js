import MenuBar from './menuBar';
import MenuItem from './menuItem';

import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import plusIconSrc from '../resources/images/buttons/plus_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';

import styles from './SoundListView.module.css';
import { useEffect, useRef, useState } from 'react';
import SoundItem from './SoundItem';
import { SoundEvent } from '../lib/SoundEvent';
import { useContext } from 'react';
import { MasterManagerContext } from '../lib/MasterManagerContext';
import Modal from './Modal';
import NovelAPI from '@/apis/NovelAPI';
import { uploadFile } from '@/services/upload-service';

function SoundListView({ currentSceneIndex, soundList }) {
  const [sndList, setSoundList] = useState(soundList);
  const [selectSoundIndex, setSelectSoundIndex] = useState(0);
  const masterManager = useContext(MasterManagerContext);

  const [isOpenSoundEditModal, setIsOpenSoundEditModal] = useState(false);
  const [isZeroCharacter, setIsZeroCharacter] = useState(false);
  const [nameText, setNameText] = useState('');

  const [rangeScrollerValue, setRangeScrollerValue] = useState(0);

  var soundFileInputRef = useRef(null);

  useEffect(() => {
    setSoundList(masterManager.sceneManager.getCurrentScene().soundList);
  }, [currentSceneIndex]);

  async function createNewSound(e) {
    const file = soundFileInputRef.current.files[0];
    // const fileURL = URL.createObjectURL(file);
    const fileURL = await uploadFile(masterManager.novelId, 'sound', file);

    var newSound = new SoundEvent(1, fileURL, null);
    masterManager.sceneManager.getCurrentScene().addSound(newSound);
    setSelectSoundIndex(masterManager.sceneManager.getCurrentScene().soundList.length - 1);
    setSoundList([...masterManager.sceneManager.getCurrentScene().soundList]);
  }

  function openSoundEditModal() {
    if (masterManager.sceneManager.getCurrentScene().soundList.length === 0) return;

    setIsOpenSoundEditModal(true);
    setNameText(masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].name);
    setRangeScrollerValue(sndList[selectSoundIndex].timeLabel);
  }

  function changeSoundName() {
    let currentScene = masterManager.sceneManager.getCurrentScene();

    if (currentScene == null) return;
    if (currentScene.soundList.length === 0) return;

    masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].name = nameText;
  }

  function changeSoundTimeLabel() {
    masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].timeLabel =
      rangeScrollerValue;
  }

  function changeSoundNameTextfield(event) {
    if (event.target.value.length <= 15) {
      setNameText(event.target.value);
    }
  }

  function closeSoundEditModal() {
    setIsOpenSoundEditModal(false);
  }

  function copyCurrentSound() {}

  function deleteCurrentSound() {
    if (masterManager.sceneManager.getCurrentScene().soundList.length === 0) return;

    masterManager.sceneManager.getCurrentScene().soundList = masterManager.sceneManager
      .getCurrentScene()
      .soundList.filter((layer, index, arr) => {
        return selectSoundIndex !== index;
      });

    setSoundList([...masterManager.sceneManager.getCurrentScene().soundList]);

    if (selectSoundIndex <= 1) {
      setSelectSoundIndex(0);
    } else {
      setSelectSoundIndex(selectSoundIndex - 1);
    }
  }

  function selectSound(index) {
    setSelectSoundIndex(index);
  }

  function handleSliderChange(event) {
    setRangeScrollerValue(event.target.value);
  }

  return (
    <>
      <section className={styles.list_view}>
        <div className={styles.list_title}>Sounds</div>
        <div className={styles.sounds}>
          {sndList !== null
            ? sndList.map((soundEvent, index, arr) => {
                return (
                  <SoundItem
                    key={Math.random()}
                    isSelected={selectSoundIndex === index}
                    name={soundEvent.name}
                    soundEvent={soundEvent}
                    onClick={() => {
                      selectSound(index);
                    }}
                  />
                );
              })
            : null}
        </div>
        <MenuBar>
          <MenuItem imageSrc={plusIconSrc} onClick={() => {}}>
            <input
              type="file"
              id="sound_file"
              accept="audio/*"
              onChange={createNewSound}
              ref={soundFileInputRef}
              style={{
                display: 'none',
              }}
            />
            <label for="sound_file"> sound</label>
          </MenuItem>
          <MenuItem imageSrc={abcIconSrc} onClick={openSoundEditModal}>
            Edit
          </MenuItem>
          <MenuItem imageSrc={copyIconSrc} onClick={copyCurrentSound}></MenuItem>
          <MenuItem imageSrc={binIconSrc} onClick={deleteCurrentSound}></MenuItem>
        </MenuBar>
      </section>
      {isOpenSoundEditModal ? (
        <Modal>
          <div>
            현재의 Sound이름(최대 15자) :{' '}
            {masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].name}
          </div>
          {isZeroCharacter ? <div style={{ color: 'red' }}>최소 1자 이상 입력해 주세요</div> : null}
          <textarea
            className={styles.name_text_area}
            value={nameText}
            onChange={(e) => {
              changeSoundNameTextfield(e);
            }}
          ></textarea>

          <div>재생 시작 시간</div>
          <div>{rangeScrollerValue}</div>
          <input
            style={{ width: '50%' }}
            type="range"
            min={0}
            max={15}
            step="0.001"
            value={rangeScrollerValue}
            onChange={handleSliderChange}
          />

          <div className={styles.modal_btn_box}>
            <button
              className={styles.btn}
              onClick={() => {
                if (nameText.length === 0) {
                  setIsZeroCharacter(true);
                  return;
                } else {
                  setIsZeroCharacter(false);
                }

                changeSoundName();
                changeSoundTimeLabel();

                setSoundList([...masterManager.sceneManager.getCurrentScene().soundList]);
                closeSoundEditModal();
                setNameText('');
              }}
            >
              변경하기
            </button>
            <button className={styles.btn} onClick={closeSoundEditModal}>
              취소
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default SoundListView;
