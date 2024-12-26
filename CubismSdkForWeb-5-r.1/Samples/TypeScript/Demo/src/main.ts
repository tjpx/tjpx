/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';
import { LAppGlManager } from './lappglmanager';
import { LAppLive2DManager } from './lapplive2dmanager';
import axios from './axios/index';
import { Base64 } from 'js-base64'
/**
 * ブラウザロード後の処理
 */
window.addEventListener(
  'load',
  (): void => {
    // Initialize WebGL and create the application instance
    if (
      !LAppGlManager.getInstance() ||
      !LAppDelegate.getInstance().initialize()
    ) {
      return;
    }

    LAppDelegate.getInstance().run();
  },
  { passive: true }
);

/**
 * 終了時の処理
 */
window.addEventListener(
  'beforeunload',
  (): void => LAppDelegate.releaseInstance(),
  { passive: true }
);

/**
 * Process when changing screen size.
 */
window.addEventListener(
  'resize',
  () => {
    if (LAppDefine.CanvasSize === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  },
  { passive: true }
);
window.addEventListener(
    'click',
    () => {
        LAppLive2DManager.getInstance().onTap(10, -0.0);
        setTimeout(function() {
            LAppLive2DManager.getInstance().onTap(9, -0.0);
        }, 27500);
        setTimeout(function() {
            LAppLive2DManager.getInstance().onTap(4, -0.0);
        }, 43500);
        setTimeout(function() {
            LAppLive2DManager.getInstance().onTap(1, -0.0);
        }, 55000);
        setTimeout(function() {
            LAppLive2DManager.getInstance().onTap(8, -0.0);
        }, 82500);
        setTimeout(function() {
            LAppLive2DManager.getInstance().onTap(11, -0.0);
        }, 86500);
    }
);


function httpQuery() {
  const http = axios.create({
    timeout: 5000
  });
  http.get(`http://127.0.0.1:9000/test`).then((res: any) => {
      res = res.data;
      if (res.error == 0) {
        LAppLive2DManager.getInstance().onTap(res.emo, -0.0);
          const baseurl = 'src/voice/'
          for (let i=0; i<res.voicelen; i++) {
              const realrul = baseurl + i + ".pcm"
              const url = pcm2wav(realrul, 16000, 16, 1, function (e) {
                  var _audioControl = document.createElement('audio');
                  _audioControl.src = e;
                  _audioControl.id = "file" + i + ".name";
                  _audioControl.controls = true;
                  var _label = document.createElement('lable');
                  _label.append("file" + i + ".name");
                  var div = document.createElement('div');
                  div.append(_label);
                  div.append(_audioControl);
                  document.getElementById('audioList').append(div);
              })
          }
          setTimeout(function (){
              playVoice(0,res.voicelen)
          }, 100);
      } else {
        return;
      }
    }).catch((error: any) => {
      console.log(error);
    });
  setTimeout(httpQuery, 5000);
}
setTimeout(httpQuery, 5000);

function playVoice(now,max){
    const audioPlayer = document.getElementById('file'+now+'.name');
    console.log(audioPlayer)
    audioPlayer.play()
    audioPlayer.addEventListener('ended', function () {
        console.log("1")
        now++
        if (now == max){
            deleteVoice(max)
        }
        playVoice(now,max)
    }, false);
}

function deleteVoice(max){
    const au = document.getElementById('audioList')
    for (let i=0; i<max; i++) {
        au.removeChild(au.lastElementChild)
    }
}

function addWavHeader(samples,sampleRateTmp,sampleBits,channelCount){
    var dataLength = samples.byteLength;
    var buffer = new ArrayBuffer(44 + dataLength);
    var view = new DataView(buffer);
    function writeString(view, offset, string){
        for (var i = 0; i < string.length; i++){
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
    var offset = 0;
    /* 资源交换文件标识符 */
    writeString(view, offset, 'RIFF'); offset += 4;
    /* 下个地址开始到文件尾总字节数,即文件大小-8 */
    view.setUint32(offset, /*32*/ 36 + dataLength, true); offset += 4;
    /* WAV文件标志 */
    writeString(view, offset, 'WAVE'); offset += 4;
    /* 波形格式标志 */
    writeString(view, offset, 'fmt '); offset += 4;
    /* 过滤字节,一般为 0x10 = 16 */
    view.setUint32(offset, 16, true); offset += 4;
    /* 格式类别 (PCM形式采样数据) */
    view.setUint16(offset, 1, true); offset += 2;
    /* 通道数 */
    view.setUint16(offset, channelCount, true); offset += 2;
    /* 采样率,每秒样本数,表示每个通道的播放速度 */
    view.setUint32(offset, sampleRateTmp, true); offset += 4;
    /* 波形数据传输率 (每秒平均字节数) 通道数×每秒数据位数×每样本数据位/8 */
    view.setUint32(offset, sampleRateTmp * channelCount * (sampleBits / 8), true); offset +=4;
    /* 快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8 */
    view.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
    /* 每样本数据位数 */
    view.setUint16(offset, sampleBits, true); offset += 2;
    /* 数据标识符 */
    writeString(view, offset, 'data'); offset += 4;
    /* 采样数据总数,即数据总大小-44 */
    view.setUint32(offset, dataLength, true); offset += 4;
    function floatTo32BitPCM(output, offset, input){
        input = new Int32Array(input);
        for (var i = 0; i < input.length; i++, offset+=4){
            output.setInt32(offset,input[i],true);
        }
    }
    function floatTo16BitPCM(output, offset, input){
        input = new Int16Array(input);
        for (var i = 0; i < input.length; i++, offset+=2){
            output.setInt16(offset,input[i],true);
        }
    }
    function floatTo8BitPCM(output, offset, input){
        input = new Int8Array(input);
        for (var i = 0; i < input.length; i++, offset++){
            output.setInt8(offset,input[i],true);
        }
    }
    if(sampleBits == 16){
        floatTo16BitPCM(view, 44, samples);
    }else if(sampleBits == 8){
        floatTo8BitPCM(view, 44, samples);
    }else{
        floatTo32BitPCM(view, 44, samples);
    }
    return view.buffer;
}

function pcm2wav(pcm, sampleRateTmp, sampleBits, channelCount, callback) :any{
    var req = new XMLHttpRequest();
    var src = ''
    req.open("GET", pcm, true); // grab our audio file
    req.responseType = "arraybuffer";   // needs to be specific type to work
    req.overrideMimeType('text/xml; charset = utf-8')
    req.onload = function() {
        if(this.status!=200){
            throw "pcm文件不存在/文件格式错误！";
            return;
        }
        //根据pcm文件 填写 sampleRateTmp【采样率】（11025） 和sampleBits【采样精度】（16） channelCount【声道】（单声道1，双声道2）
        var fileResult = addWavHeader(req.response,sampleRateTmp,sampleBits,channelCount);
        var blob = new Blob([fileResult], {type:'autio/wave'});
        var src = URL.createObjectURL(blob);
        if (callback) {
            callback(src);
        }
    };
    req.send();
    return src
}
