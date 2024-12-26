package listen

import (
	"GoATuber-2.0/engine"
	"fmt"
)

//消息出口

// ChatOut 将消息通过引擎内管道发送到过滤器
func (chat ChatStruct) ChatOut(e *engine.Engine) {
	e.Ch.ChatToFilter <- chat

	a := e.Ch.ChatToFilter
	for {
		i, ok := <-a // 通道关闭后再取值ok=false
		if !ok {
			break
		}
		fmt.Println(i)
	}

}
