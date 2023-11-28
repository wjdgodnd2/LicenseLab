document.addEventListener("DOMContentLoaded", (e) => {

    let ModifyEditButton = document.querySelector("#modify");
    let id = document.querySelector("#user_id");
    let name = document.querySelector("#user_name");
    let num = document.querySelector("#user_num");
    let email = document.querySelector("#user_email");
    let changing = false;

    ModifyEditButton.addEventListener("click", (e) => {
        e.preventDefault();
        if(changing) {
            let _id = id.querySelector("input").value;
            let _name = name.querySelector("input").value;
            let _num = num.querySelector("input").value;
            let _email = email.querySelector("input").value;
        
            id.innerHTML = _id;
            name.innerHTML = _name;
            num.innerHTML = _num;
            email.innerHTML = _email;
        
            e.target.textContent = "회원정보 수정";
            changing = false;
        } else {
            let _id = id.textContent;
            let _name = name.textContent;
            let _num = num.textContent;
            let _email = email.textContent;
        
            id.innerHTML = "<input value=" + _id + "></input>"
            name.innerHTML = "<input value=" + _name + "></input>";
            num.innerHTML = "<input value=" + _num + "></input>";
            email.innerHTML = "<input value=" + _email + "></input>";
        
            e.target.textContent = "회원정보 수정 완료";
            changing = true;
        }
        })

        let PassEditButton = document.querySelector("#psw_modify");
        let pass = document.querySelector("#user_psw");
        let changing2 = false;

        PassEditButton.addEventListener("click", (e) => {
            e.preventDefault();
            if(changing2) {
                let _pass = "*****";
                
                pass.innerHTML = _pass;
            
                e.target.textContent = "비밀번호 수정";
                changing2 = false;
            } else {
                
                pass.innerHTML = "<input value=" + "admin" + "></input>"

                e.target.textContent = "비밀번호 수정 완료";
                changing2 = true;
            }
            })
});