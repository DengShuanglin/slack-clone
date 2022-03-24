import style from './style.module.scss'
import { useRecordAudio } from '@slack-pkg/audio-utils'
import {
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

// type useCountDownPropsType = {
//     start: number;
//     step?: number;
//     end?: number;
//     space?: number;
//     onEnd?: () => void;
//     onStep?: (current: number, options: { start: number, step: number, end: number }) => void;
// }

// const useCountDown = (props: useCountDownPropsType): [number, () => void, () => void, () => void, () => void] => {
//     const state = useRef<{
//         timer: NodeJS.Timer | undefined; start: number; end: number; step: number; current: number; space: number;
//         onEnd?: () => void;
//         onStep?: (current: number, options: { start: number, step: number, end: number }) => void;
//     }>({
//         start: props.start,
//         end: props.end || 0,
//         step: props.step || (props.start - (props.end || 0) > 0 ? -1 : 1),
//         current: props.start,
//         space: props.space || 1000,
//         timer: undefined,
//         onEnd: props.onEnd,
//         onStep: props.onStep
//     })
//     state.current.onStep = props.onStep;
//     state.current.onEnd = props.onEnd;
//
//     const startCount = () => {
//         if (state.current.timer !== undefined) return;
//
//         if ((state.current.start - state.current.end > 0 && state.current.current <= state.current.end) || (state.current.start - state.current.end <= 0 && state.current.current >= state.current.end)) {
//             return;
//         }
//
//         state.current.timer = setInterval(() => {
//             state.current.current += state.current.step;
//             state.current.onStep?.(state.current.current, state.current);
//             if ((state.current.start - state.current.end > 0 && state.current.current <= state.current.end) || (state.current.start - state.current.end <= 0 && state.current.current >= state.current.end)) {
//                 if (state.current.timer) {
//                     clearInterval(state.current.timer);
//                     state.current.timer = undefined;
//                 }
//                 state.current.onEnd?.();
//             }
//         }, state.current.space)
//     }
//     const pauseCount = () => {
//         if (state.current.timer !== undefined) clearInterval(state.current.timer);
//         state.current.timer = undefined;
//     }
//     const stopCount = () => {
//         state.current.current = state.current.end;
//     }
//     const resetCount = () => {
//         if (state.current.timer !== undefined) clearInterval(state.current.timer);
//         state.current.timer = undefined;
//         state.current.current = state.current.start;
//     }
//
//     return [state.current.current, startCount, pauseCount, stopCount, resetCount]
// }

enum AudioRecordState {
  NOT_READY = 'not ready',
  READY = 'ready',
  PAUSE = 'pause',
  RECORDING = 'recording',
  FINISH = 'finish'
}

enum PlayStateEnum {
  NOT_READY = 'not ready',
  READY = 'ready',
  PLAYING = 'playing',
  PAUSE = 'pause'
}

function AudioRecord(
  props: {
    onStopRecording?: (blob: Blob) => void
    childrenButton?: ReactNode
  },
  ref: Ref<{
    getBlob: () => Blob | null
    state: AudioRecordState
    playState: PlayStateEnum
    reset: () => void
  }> | null = null
) {
  const [state, setState] = useState<AudioRecordState>(
    AudioRecordState.NOT_READY
  )
  const [playState, setPlayState] = useState<PlayStateEnum>(
    PlayStateEnum.NOT_READY
  )
  const containerRef = useRef(null)
  const recorder = useRecordAudio()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (recorder !== null) setState(AudioRecordState.READY)
  }, [recorder])
  useImperativeHandle(
    ref,
    () => {
      return {
        playState,
        state,
        getBlob() {
          return recorder?.getBlob?.()
        },
        reset
      }
    },
    [containerRef, playState, state]
  )
  const startRecording = () => {
    if (state === AudioRecordState.READY) {
      recorder.startRecording()
      setState(AudioRecordState.RECORDING)
      setPlayState(PlayStateEnum.NOT_READY)
    }
  }
  const stopRecording = () => {
    if (state === AudioRecordState.RECORDING) {
      recorder.stopRecording((url: string) => {
        if (audioRef.current !== null) {
          audioRef.current.src = url
          setPlayState(PlayStateEnum.READY)
          props.onStopRecording?.(recorder.getBlob())
        }
      })
      setState(AudioRecordState.FINISH)
    }
  }
  // const download = () => {
  //     if (AudioRecordState.FINISH) {
  //         invokeSaveAsDialog(recorder?.getBlob?.());
  //     }
  // }
  const reset = () => {
    if (recorder !== null) {
      recorder?.reset?.()
      setState(AudioRecordState.READY)
    }
  }
  const play = () => {
    if (audioRef.current !== null && playState !== PlayStateEnum.NOT_READY) {
      audioRef.current?.play()
      setPlayState(PlayStateEnum.PLAYING)
    }
  }
  const pause = () => {
    if (audioRef.current !== null && playState === PlayStateEnum.PLAYING) {
      audioRef.current?.pause()
      setPlayState(PlayStateEnum.PAUSE)
    }
  }
  const stop = () => {
    if (audioRef.current !== null && playState === PlayStateEnum.PLAYING) {
      audioRef.current?.pause()
      audioRef.current.currentTime = 0
      setPlayState(PlayStateEnum.READY)
    }
  }

  return (
    <div className={style['audio-record-container']} ref={containerRef}>
      {state}
      <div className={style['audio-record-button-outer']}>
        <audio
          style={{ display: 'none' }}
          ref={audioRef}
          onEnded={() => {
            setPlayState(PlayStateEnum.READY)
          }}
        />
        {props.childrenButton}
        {state === AudioRecordState.READY && (
          <button onClick={() => startRecording()}>开始录制</button>
        )}
        {state === AudioRecordState.RECORDING && (
          <button onClick={() => stopRecording()}>结束录制</button>
        )}
        {state === AudioRecordState.FINISH && (
          <button onClick={() => reset()}>重录</button>
        )}
        {state === AudioRecordState.FINISH &&
          (playState === PlayStateEnum.READY ||
            playState === PlayStateEnum.PAUSE) && (
            <button onClick={() => play()}>播放/继续</button>
          )}
        {state === AudioRecordState.FINISH &&
          playState === PlayStateEnum.PLAYING && (
            <button onClick={() => pause()}>暂停播放</button>
          )}
        {state === AudioRecordState.FINISH &&
          playState === PlayStateEnum.PLAYING && (
            <button onClick={() => stop()}>停止播放</button>
          )}
      </div>
    </div>
  )
}

export default forwardRef(AudioRecord)
