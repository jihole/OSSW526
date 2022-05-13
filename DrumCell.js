/**
 * DrumCell 클래스 만들기
 *
 */
class DrumCell {
 /* *
   * 변수지정
   * */
  constructor(outputNode, audioBuffer) {
    this._context = outputNode.context;
    this._buffer = audioBuffer;
    this._outputNode = outputNode;
  }

  /**
   * 오디오의 입력
   */
  playSample() {
    const bufferSource =
        new AudioBufferSourceNode(this._context, {buffer: this._buffer});
    const amp = new GainNode(this._context);
    bufferSource.connect(amp).connect(this._outputNode);
    bufferSource.start();
  }
}

export default DrumCell;
