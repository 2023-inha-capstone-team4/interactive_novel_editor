import { useContext, useState } from 'react';
import styles from './Header.module.css';
import { MasterManagerContext } from '../lib/MasterManagerContext';
import ClientScenesViewer from './ClientScenesViewer';
import Modal from './Modal';
import { display } from '@mui/system';

function Header() {
  const masterManager = useContext(MasterManagerContext);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const onClickSaveProjectJson = () => {
    const jsonString = JSON.stringify(masterManager.sceneManager.sceneList, null, 2);
    masterManager.handleSave(jsonString);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
  };

  const onClickPreview = () => {
    setIsOpenPreview(true);
  };

  const closePreview = () => {
    setIsOpenPreview(false);
  };

  return (
    <>
      <div className={styles.header}>
        <nav>
          <ul className={styles.options}>
            <li>새 프로젝트</li>
            <li
              onClick={() => {
                onClickSaveProjectJson();
              }}
            >
              저장
            </li>
            <li onClick={() => {}}>열기</li>
            <li
              onClick={() => {
                onClickPreview();
              }}
            >
              미리보기
            </li>
          </ul>
        </nav>
      </div>
      {isOpenPreview ? (
        <div
          style={{
            position: 'absolute',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: '10000',
          }}
        >
          <button
            style={{
              position: 'fixed',
              left: '90%',
              top: '10%',
              zIndex: '10001',
              borderColor: 'lightpink',
              borderRadius: '10px',
              padding: '20px',
              fontSize: '20px',
            }}
            onClick={() => {
              closePreview();
            }}
          >
            X
          </button>
          <ClientScenesViewer
            scenes={[...masterManager.sceneManager.sceneList]}
          ></ClientScenesViewer>
        </div>
      ) : null}
    </>
  );
}

export default Header;
