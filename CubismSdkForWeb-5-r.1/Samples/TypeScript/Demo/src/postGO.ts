import axios from "./axios";
function timedCount() {
    const http = axios.create({
        timeout: 5000
    })
    http.get(`https://api.uomg.com/api/get.qqdj`).then((res: any) => {
        postMessage(res)
    }).catch((error: any)=>{
        console.log(error);
    })






    setTimeout("timedCount()",500);
}

timedCount();