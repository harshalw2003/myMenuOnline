let nav_btn = document.getElementsByClassName("nav-btn");
let nav_btns_array = Array.from(nav_btn);

nav_btns_array.forEach(function (button) {
    button.addEventListener('click', (event) => {
        // Use closest to find the closest ancestor with the class "nav-btn"
        const targetButton = event.target.closest('.nav-btn');


        let childarray = Array.from(targetButton.parentNode.children);

        childarray.forEach(function (e) {

            e.classList.remove("nav-btn-active");
        });

        targetButton.classList.add("nav-btn-active")
        let display_target = targetButton.getAttribute('target')
        let dash_conts_array = Array.from(document.querySelectorAll('.dash-sub-cont'));
        console.log(dash_conts_array);
        dash_conts_array.forEach(element => {

            element.style.display = "none";

        });
        document.getElementById(display_target).style.display = 'flex';
    });
});

const mob_nav_btn = document.querySelectorAll('.mob-nav-btn');
console.log(mob_nav_btn);

const mob_nav_btn_array = Array.from(mob_nav_btn);
mob_nav_btn_array.forEach(element => {

    element.addEventListener('click', () => {

        let targetcont = element.getAttribute('target');


        let dash_conts_array = Array.from(document.querySelectorAll('.dash-sub-cont'));
        // console.log(dash_conts_array);
        dash_conts_array.forEach(element => {

            element.style.display = "none";

        });

        document.getElementById(targetcont).style.display = 'flex';
        function toggleNavbar() {
            var navbar = document.getElementById("navbar");
            navbar.classList.toggle("open");
            navbar.classList.toggle("closed");
        }

    })

});


const loadAdminPageContent = () => {
    fetch('http://localhost:5000/user/adminDashboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(response => response.text())
        .then(data => {
            result = JSON.parse(data)
            const userName = document.getElementsByClassName("user-name");
            console.log(userName)
            console.log(result.userDetails)
            for (i = 0; i < userName.length; i++) {
                userName[i].innerHTML = result.userDetails.name
                // console.log(i)

            }


            //setting profile picture
            console.log(document.getElementById("user-profile-image"))
            document.getElementById("user-profile-image").setAttribute("src", result.userDetails.profilePicture)



            //Profile JS
            const profile_inputs = document.querySelectorAll('.input-cont input')
            console.log(profile_inputs)
            profile_inputs[0].value = result.userDetails.restaurantName
            profile_inputs[1].value = result.userDetails.name
            profile_inputs[2].value = result.userDetails.restaurantAdress
            profile_inputs[3].value = result.userDetails.email
            profile_inputs[4].value = result.userDetails.phone



        })
        .catch((error) => {
            console.error('Error:', error);
        });


}

const updateProfileDetails = () => {

    console.log('Update profile button clicked')
    const profile_inputs = document.querySelectorAll('.input-cont input')
    console.log(profile_inputs)
    const updatedDetails = {
        restaurantName: profile_inputs[0].value,
        name: profile_inputs[1].value,
        restaurantAdress: profile_inputs[2].value,
        email: profile_inputs[3].value,
        phone: profile_inputs[4].value,

    }
    console.log(updatedDetails)

    fetch('http://localhost:5000/user/updateDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDetails)

    })
        .then(response => response.text())
        .then(data => {
            result = JSON.parse(data)
            alert(result.message)



        })
        .catch((error) => {
            console.log(error);
        });

    upadteProfilePicture()






}

const upadteProfilePicture = () => {
    console.log('Update profile picture button clicked')
    const profile_picture = document.getElementById('upload-profile-input').files[0]
    const formData = new FormData();
    formData.append('profilePicture', profile_picture);

    fetch('http://localhost:5000/user/upload-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            result = JSON.parse(data)
            console.log(result.message);



        })



}




document.addEventListener("DOMContentLoaded", (event) => {

    //Loading dashboard content
    loadAdminPageContent();

    //Update Profile
    document.getElementById("update-profile-btn").addEventListener('click', updateProfileDetails)

})








