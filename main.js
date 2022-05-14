/**
 * DrumCell.js 클래스연결
 */
import DrumCell from './DrumCell.js';

/**
 * 파일명 drum이고 확장자mp3인파일을선택
 * 디코딩을 통한 버퍼출력 
 */

const getAudioBufferByFileName = async (
	    audioContext, fileName, directoryHandle) => {
		      const fileHandle = await directoryHandle.getFileHandle(fileName);
		      const file = await fileHandle.getFile();
		      const arrayBuffer = await file.arrayBuffer();
		      return await audioContext.decodeAudioData(arrayBuffer);
	    };
/**
 * 웹에 오디오버퍼소스추출  
 */
const buildDrumCellMap = async (outputNode, directoryHandle) => {
	  const drumCellMap = {};
	  for await (const entry of directoryHandle.values()) {
		      if (entry.name.startsWith('drum') && entry.name.endsWith('mp3')) {
			            const audioBuffer = await getAudioBufferByFileName(
					              outputNode.context, entry.name, directoryHandle);
			            drumCellMap[entry.name] = new DrumCell(outputNode, audioBuffer);
			          }
		    }

	  return drumCellMap;
};
/**
 * qwerasdfzxcv로 추출한 오디오버퍼소스와 1대1매핑
 */
const bindKeyToDrumCellMap = (drumCellMap) => {
	  const keys = 'qwerasdfzxcv'.split('');
	  const drumCells = Object.values(drumCellMap);
	  const keyToDrumCellMap = {};
	  for (let i = 0; i < drumCells.length; ++i) {
		      keyToDrumCellMap[keys[i]] = drumCells[i];
		    }

	  window.addEventListener('keydown', (event) => {
		      if (event.key in keyToDrumCellMap) {
			            keyToDrumCellMap[event.key].playSample();
			          }
		    });
};

/**
 * 오디오버퍼소스에 잔향효과 추가
 * 
 * */
const buildMainBus = async (audioContext, directoryHandle) => {
	  const compressor = new DynamicsCompressorNode(audioContext);
	  const irBuffer = await getAudioBufferByFileName(
		        audioContext, 'ir-hall.mp3', directoryHandle);
	  const convolver = new ConvolverNode(audioContext, {buffer: irBuffer});
	  const reverbGain = new GainNode(audioContext, {gain: 0.25});

	  compressor.connect(audioContext.destination);
	  convolver.connect(reverbGain).connect(audioContext.destination);
	  compressor.connect(convolver);

	  return compressor;
};

/**
 * 위에서 입력한
 * 오디오버퍼소스추출, 키보드에 1대1매핑, 잔향효과를
 * 순서대로 실행
 */
const initializeDrumMachine = async (audioContext) => {
	  const directoryHandle = await window.showDirectoryPicker();
	  const mainBus = await buildMainBus(audioContext, directoryHandle);
	  const drumCellMap = await buildDrumCellMap(mainBus, directoryHandle);
	  await bindKeyToDrumCellMap(drumCellMap);
};

/**
 * 사용자가 오디오버퍼소스를 입력해야만 버튼 활성화
 * 버튼 클릭시 initializeDrumMachine 함수 출력
 */
const audioContext = new AudioContext();

const onLoad = async () => {
	  const buttonEl = document.getElementById('start-audio');
	  buttonEl.disabled = false;
	  buttonEl.addEventListener('click', async () => {
		      await initializeDrumMachine(audioContext);
		      audioContext.resume();
		      buttonEl.disabled = true;
		      buttonEl.textContent = '재생중...';
		    }, false);
};

window.addEventListener('load', onLoad);
