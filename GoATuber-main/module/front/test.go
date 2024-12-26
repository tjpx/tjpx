package front

import (
	"encoding/base64"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

var sign = 0

func test(c *gin.Context) {
	if sign == 0 {
		c.JSON(http.StatusOK, gin.H{
			"error":    1,
			"emo":      0,
			"voicelen": 0,
		})
		return
	}

	emo := e.Message.MessageSlice[0].Emotion.Emo
	var res int
	switch emo {
	case "happy":
		res = 2
		break
	case "mad":
		res = 8
		break
	case "sad":
		res = 4
		break
	case "disgust":
		res = 8
		break
	case "surprise":
		res = 6
		break
	case "fear":
		res = 6
		break
	case "health":
		res = 1
		break
	}
	jsonMsg := formatMessage()
	url := "G:\\GraduationProject\\CubismSdkForWeb-5-r.1\\Samples\\TypeScript\\Demo\\src\\voice\\"
	d, _ := os.Open(url)
	names, _ := d.Readdirnames(-1)
	for _, name := range names {
		filePath := filepath.Join(url, name)
		fileInfo, _ := os.Stat(filePath)
		if !fileInfo.IsDir() {
			os.Remove(filePath)
		}
	}
	d.Close()
	for i := 0; i < jsonMsg.Sum; i++ {
		f, err := os.Create(url + strconv.Itoa(i) + ".pcm")
		if err != nil {
			log.Println("create file fail")
		}
		byteRES, _ := base64.StdEncoding.DecodeString(jsonMsg.Messages[i].Voice)
		f.Write(byteRES)
		f.Close()
	}
	c.JSON(http.StatusOK, gin.H{
		"error":    0,
		"emo":      res,
		"voicelen": jsonMsg.Sum,
	})
	sign = 0
	e.Ch.StartNext <- struct{}{}
	e.Message.Message = ""
	e.Message.MessageSlice = nil
	e.Message.Username = ""
	e.Message.Uuid = ""
}

func getInfo() {
	for {
		<-e.Ch.ToFront
		fmt.Println("sign")
		sign = 1
	}
}
