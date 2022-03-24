declare module 'recordrtc' {
  export class RecordRTC {
    // start the recording
    startRecording: () => {}

    // stop the recording
    // getBlob inside callback function
    stopRecording: (blobURL: (url: string) => void) => {}

    // pause the recording
    pauseRecording: () => void

    // resume the recording
    resumeRecording: () => void

    // auto stop recording after specific duration
    setRecordingDuration: () => void

    // reset recorder states and remove the data
    reset: () => void

    // invoke save as dialog
    save: (name: string) => void

    // returns recorded Blob
    getBlob: () => void

    // returns Blob-URL
    toURL: () => void

    // returns Data-URL
    getDataURL: (dataURL: string) => void

    // returns internal recorder
    getInternalRecorder: () => void

    // initialize the recorder [deprecated]
    initRecorder: () => void

    // fired if recorder's state changes
    onStateChanged: (state: any) => void

    // write recorded blob into indexed-db storage
    writeToDisk: (audio: Blob, video: Blob, gif: Blob) => void

    // get recorded blob from indexded-db storage
    getFromDisk: (dataURL: string, type: any) => void

    // [deprecated]
    setAdvertisementArray: ([webp1, webp2]: any) => void

    // [deprecated] clear recorded data
    clearRecordedData: () => void

    // clear memory; clear everything
    destroy: () => void

    // get recorder's state
    getState: () => void

    // [readonly] property: recorder's state
    state: string
    // recorded blob [readonly] property
    blob: Blob
    // [readonly] array buffer; useful only for StereoAudioRecorder
    buffer: ArrayBuffer
    // RecordRTC version [readonly]
    version: string
    // [readonly] useful only for StereoAudioRecorder
    bufferSize: number
    // [readonly] useful only for StereoAudioRecorder
    sampleRate: number
  }
}
