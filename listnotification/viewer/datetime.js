  const timeTH = document.querySelector('.context_center_date');


    function datetime(){
        var month_name_th = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

        var dt = new Date();
        var date = dt.getDate();
        var month_th = month_name_th[dt.getMonth()];
        var year_th = dt.getFullYear() +543;

        // ชั่วโมง น้อยกว่า 0 จะเป็น : 0x:
        if(parseInt(dt.getHours()) < 10){
            var mh = '0' + dt.getHours();
        }else {
            var mh = dt.getHours();
        }
        // นาที น้อยกว่า 0 จะเป็น : 0x:
        if(parseInt(dt.getMinutes()) < 10){
            var mm = '0' + dt.getMinutes();
        }else {
            var mm = dt.getMinutes();
        }
        // วินา น้อยกว่า 0 จะเป็น : 0x:
        if(parseInt(dt.getSeconds()) < 10){
            var ms = '0' + dt.getSeconds();
        }else {
            var ms = dt.getSeconds();
        }

        var time = `${mh}:${mm}:${ms}`;

        var datetime_th = date+' '+month_th+' '+year_th+' '+time;

        return datetime_th;
    }

    setInterval(() => {
        const now = new Date();

        timeTH.textContent = datetime();
    },200);



function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
      