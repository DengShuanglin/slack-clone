// @ts-ignore
import RecordRTC, { invokeSaveAsDialog } from './lib/recordrtc'
import { useState } from 'react'
export { invokeSaveAsDialog }
console.log(1)

export async function runTest() {
  // let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
  // let recorder = RecordRTC(stream, {
  //     type: 'audio'
  // });
  // recorder.startRecording();
  // await sleep(3000);
  // recorder.stopRecording(function () {
  //     let blob = recorder.getBlob();
  //     invokeSaveAsDialog(blob);
  // });
}

let stream: MediaStream | null = null

export function useRecordAudio() {
  let [recorder, setRecord] = useState(
    stream == null
      ? null
      : RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav'
        })
  )

  if (stream == null || !recorder) {
    ;(async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      })
      setRecord(
        RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav'
        })
      )
    })()
    return
  }
  return recorder
}

async function sleep(time: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}
export { sleep }
