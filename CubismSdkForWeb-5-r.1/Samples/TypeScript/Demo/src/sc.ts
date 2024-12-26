const baseurl = 'src/voice/'
for (let i=0; i<2; i++){
    const realrul = baseurl+i+".pcm"
    console.log(realrul)
    const url = pcm2wav(realrul,16000,16,1,function(e) {
        var _audioControl = document.createElement('audio');
        _audioControl.src = e;
        _audioControl.id = "file"+i+".name";
        _audioControl.controls = true;
        // _audioControl.volume = '0.2';
        var _label = document.createElement('lable');
        _label.append("file"+i+".name");

        var div = document.createElement('div');
        div.append(_label);
        div.append(_audioControl);

        document.getElementById('audioList').append(div);})
    console.log(realrul)
}

let now = 0

function playVoice(now){
    const audioPlayer = document.getElementById('file'+now+'.name');
    audioPlayer.play()
    audioPlayer.addEventListener('ended', function () {
        console.log("1")
        now++
        if (now == 2){
            deleteVoice()
        }
        playVoice(now)
    }, false);
}

setTimeout(function (){
    playVoice(now)
}, 100);

function deleteVoice(max){
    const au = document.getElementById('audioList')
    for (let i=0; i<max; i++) {
        au.removeChild(au.lastElementChild)
    }
}