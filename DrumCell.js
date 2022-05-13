/**
 * An abstraction of the one-shot sampler
 *
 @class DrumCell
 */
class DrumCell {
  /**
   * Creates an instance of DrumCell with two required arguments.
   *
   * @param {Audionode} outputNode The outgoing AudioNode
   * @param {AudioBuffer} audioBuffer An AudioBuffer to be played
   * @memberof DrumCell
   */
  constructor(outputNode, audioBuffer) {
    this._context = outputNode.context;
    this._buffer = audioBuffer;
    this._outputNode = outputNode;
  }

  /**
   * Plays the assigned buffer when called.
   *
   * @memberof DrumCell
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
