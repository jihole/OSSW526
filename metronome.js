






function Timer(callback, timeInterval, errorCallback) {
    this.timeInterval = timeInterval;
    this.start = () => {
        this.expected = Date.now() + this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log(Started);
    }
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('stopped');
    }
    this.round = () => {
        let drift = DATE.NOW() - this.expected;
        if (drift > this.timeInterval) {
            if (errorCallback) {
                errorCallback;
            }
        }        
        callback();
        this.expected += this.timeInterval;
        console.log(drift);
        console.log(this.timeInterval - drift);
        this.timeout = setTimout(this.round, this.timeInterval - drift);
    }
}
const kick = new Timer(() => {drums.play('kick')} ,500);

function startTest() {
    kick.start();
}
function stopTest() {
    kick.stop();
}