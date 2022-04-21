function funcName(){
    let reg  = /[\W][A-Za-z-0-9]/g;
    const name   = document.getElementById('name').value;
    const Input_Name = document.getElementById('name');
    const error_name   = document.getElementById('error_name');
    
    if(name.match(reg)){
        Input_Name.style.style.borderBottomColor = "red";
        error_name.style.color = "red";
        error_name.innerHTML ="أدخل الأسم بالشكل الصحيح";
    }else if(name.length < 5 ){
        Input_Name.style.style.borderBottomColor = "red";

        error_name.style.color = "red";
        error_name.innerHTML = "ادخل اكبر من 5 أحرف"
    }else{
        error_name.style.color = "green";
        error_name.innerHTML = "ممتاز"

    }


}

const button = document.getElementById('but');

const pic   = document.getElementById('pic');
const content   = document.getElementById('content');

const error_pic   = document.getElementById('error_pic');
const error_content   = document.getElementById('error_content');

button.disabled = true;
 error_pic.style.backgroundColor = "red";
 error_content.style.backgroundColor = "red";

