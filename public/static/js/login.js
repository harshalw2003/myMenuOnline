
const loginSwap = document.querySelector("#signup-para span")
const signSwap = document.querySelector("#login-para span")

const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")

const loginCont = document.getElementById("login-container") 

loginSwap.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
    loginCont.style.backgroundColor = "#080d48";
})
signSwap.addEventListener("click", () => {

    loginForm.style.display = "flex";
    signupForm.style.display = "none";
    loginCont.style.backgroundColor = "#FFFFFF";

}
)
// 
console.log(loginSwap, signSwap)


//Sign Up JS
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

const signUpData = {
        name: document.getElementById('name').value,
        phone:document.getElementById('signup-phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('signup-pass').value,
    };

    fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)

    })
    .then(response => response.text())
    .then(data => {
        result=JSON.parse(data)
        alert(result.message)
    })
    .catch((error) => {
        console.log('Error:', error);
    });

});


//Login JS
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const loginData = {
        phone: document.getElementById('phone').value,
        password: document.getElementById('pass').value,
    };

    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        alert(result.message)
        document.getElementById('phone').value=""
        document.getElementById('pass').value=""

        // if(result.success){
        //     window.location.href="localhost/5000/profile"
        // }
    })
   .catch((error) => {
        console.log(error);
    });

});



