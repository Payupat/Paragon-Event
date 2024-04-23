let params = (new URL(document.location)).searchParams;

var imgURL = params.get("imgurl") + "&withcontenttype=true&mode=archive&starttime=" + params.get("starttime") + "&resolutionx=2048&resolutiony=1536&streamtype=mainvideo&login=root&password=" + params.get("password");
// console.log(imgURL);


// https://iot.planetcloud.cloud/analytics/baanmai/site?channelid=e535bd53-3078-4eb9-88a2-c8211fda4133
// &withcontenttype=true&mode=archive&starttime=17.10.2023%2016:31:58&resolutionx=2048&resolutiony=1536&streamtype=mainvideo&login=root&password=daab6cec109d8ccf65c965d67d51225

// let img  = 'https://iot.planetcloud.cloud/analytics/baanmai/site?channelid=e535bd53-3078-4eb9-88a2-c8211fda4133&owithcontenttype=true&mode=archive&starttime=17.10.2023%2016:31:58&resolutionx=2048&resolutiony=1536&streamtype=mainvideo&login=root&password=daab6cec109d8ccf65c965d67d51225f'
// console.log(img);
// let imgs = 'https://iot.planetcloud.cloud/analytics/baanmai/site?channelid=e535bd53-3078-4eb9-88a2-c8211fda4133&withcontenttype=true&mode=archive&starttime=17.10.2023%16:31:58&resolutionx=2048&resolutiony=1536&streamtype=mainvideo&login=root&password=daab6cec109d8ccf65c965d67d51225f';
// console.log(imgs);
document.getElementById("imgViewer").src = params.get("imgurl");


