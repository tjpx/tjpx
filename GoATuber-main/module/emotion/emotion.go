package emotion

import (
	"fmt"
	"sync"

	"GoATuber-2.0/app/dict"
	"GoATuber-2.0/engine"
)

func InitListenEmotion(e *engine.Engine) {
	go listen(e)
}

func listen(e *engine.Engine) {
	for {
		select {
		case <-e.Ch.LLMToEmotion:
			var wg sync.WaitGroup
			for i, _ := range e.Message.MessageSlice {
				wg.Add(1)
				go handelEmotion(e, &e.Message.MessageSlice[i], &wg)
			}
			wg.Wait()

			//情感分析完成，信息送往语音合成模块
			e.Ch.EmotionToVoice <- struct{}{}
			fmt.Println("情感分析完成，信息送往语音合成模块")
		}
	}
}

func handelEmotion(e *engine.Engine, ms *engine.MessageSlice, wg *sync.WaitGroup) {
	config := e.Config.Mood
	if config.Dict {
		dict.GetMood(e, ms)
	} else if config.None {
		ms.Emotion.Emo = "health"
	} else {

	}
	wg.Done()
}
