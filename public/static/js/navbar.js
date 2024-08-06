const nav_btn = (document.getElementsByClassName("nav-anchor"))

console.log(nav_btn[2])


nav_btn[2].addEventListener("click", (event)=>{
    event.preventDefault()
    console.log(event.target.innerText)

    fetch('http://localhost:5000/user/admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        if(result.success){
            console.log(event.target)
            // event.target.setAttribute('href',"../client/adminpage.html")
            window.location.href="../client/adminpage.html"
            // window.location.href=window.location.origin+"/client/adminpage.html"
        }else{

            alert(result.message)
        }

        
    })
   .catch((error) => {
        console.error('Error:', error);
    });


})



const logout_btn = document.getElementById('logout-btn');

logout_btn.addEventListener('click', (event)=>{

    fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        alert(result.message)
        
        
    })
   .catch((error) => {
        console.error('Error:', error);
    });

})