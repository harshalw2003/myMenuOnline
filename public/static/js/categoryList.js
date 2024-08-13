const displayAllCategories = async () => {

    const response = await fetch('http://localhost:5000/category/viewCategory',{

        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    
    })
    .then(response => response.text())
    .then(data => {
        result = JSON.parse(data)
        const categories =result.categories
        console.log(categories.length)
        
        if(categories.length!=0){
            document.getElementById("noCategory").style.display = "none"
            const categoriesCont= document.getElementById("upperListCategory")
           for(let i=0; i<categories.length; i++){
            const categoryListIterm = document.createElement("div")
            categoryListIterm.classList.add("categoryListIterm")
            
            const catListleft= document.createElement("div")
            catListleft.classList.add("catListLeft")
            const categoryImage= document.createElement("img")
            categoryImage.src = categories[i].categoryPicture
            catListleft.appendChild(categoryImage)

            const categoryName = document.createElement("h6")
            categoryName.textContent = categories[i].categoryName
            catListleft.appendChild(categoryName)

            const categoryEditBtn = document.createElement("p")
            categoryEditBtn.classList.add("myActionButton")
            categoryEditBtn.innerHTML=`Edit<span class="material-symbols-outlined">
                chevron_right
                </span>`
                catListleft.appendChild(categoryEditBtn)

                categoryListIterm.appendChild(catListleft)

            const catListRight = document.createElement("div")
            catListRight.classList.add("catListRight")

            const categoryItemsBtn = document.createElement("p")
            categoryItemsBtn.classList.add("myActionButton")
            categoryItemsBtn.innerHTML=`<span class="material-symbols-outlined">
                border_color
                </span>Items`

            catListRight.appendChild(categoryItemsBtn)

            const categoryAddItemBtn = document.createElement("p")
            categoryAddItemBtn.classList.add("myActionButton")
            categoryAddItemBtn.innerHTML=`<span class="material-symbols-outlined">
                  add
                  </span>Add Item`

            catListRight.appendChild(categoryAddItemBtn)

            categoryListIterm.appendChild(catListRight)


            categoriesCont.appendChild(categoryListIterm)

            



           }
            


        }
        else{

            document.getElementById("catListFlex").style.display = "none"


        }

        })
}
document.addEventListener('DOMContentLoaded',displayAllCategories);
    
