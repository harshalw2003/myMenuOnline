
document.addEventListener('DOMContentLoaded', () => {

   
const categoryAddForm = document.getElementById("categoryAddForm")
categoryAddForm.addEventListener("submit",AddCategory)

const uploadCategoryPicture = async (formData)=>{

    const response = await fetch('http://localhost:5000/category/uploadCategoryPicture', {
        method: 'POST',
        body: formData
      }); 

    const data = await response.text();
    console.log(data)
    // location.reload();
}

async function AddCategory(e){

    e.preventDefault()

    const categoryName = document.getElementById("categoryName").value
    const categoryDescription = document.getElementById("categoryDescription").value
    const categoryDetails ={
        categoryName : categoryName,
        categoryDescription : categoryDescription,
        
    }
    console.log(categoryName, categoryDescription)
    const categoryPicture = document.getElementById('input_file1').files[0]
    console.log(categoryPicture)
    const formData = new FormData();
    formData.append('categoryPicture', categoryPicture);
    console.log(formData)

    
    fetch('http://localhost:5000/category/addCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryDetails)

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        alert(result.message)
       
    })
   .catch((error) => {
        console.log(error);
    });


    
    
    // uploadCategoryPicture(formData)
}
})
