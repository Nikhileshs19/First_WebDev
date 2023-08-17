document.addEventListener('DOMContentLoaded', function(){

    const list = document.querySelector('#book-list ul');
    const forms = document.forms;
  
    // delete books
    list.addEventListener('click', (e) => {
      if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
      }
    });
  
    // add books
    const addForm = forms['add-book'];
    addForm.addEventListener('submit', function(e){
      e.preventDefault();
  
      // create elements
      const value = addForm.querySelector('input[type="text"]').value;
      const genreInput = document.querySelector('.genre-input').value;
      const ratingInput = document.querySelector('.rating-input').value;
      const li = document.createElement('li');
      const bookName = document.createElement('span');
      const deleteBtn = document.createElement('span');
      const bookGenre = document.createElement('span');
      const bookRating = document.createElement('span');
  
      // add text content
      bookName.textContent = value;
      bookGenre.textContent = genreInput;
      bookRating.textContent = ratingInput;
      deleteBtn.textContent = 'delete';
  
      // add classes
      bookName.classList.add('name');
      bookGenre.classList.add('genre');
      bookRating.classList.add('rating');
      deleteBtn.classList.add('delete');
  
      // append to DOM
      li.appendChild(bookName);
      li.appendChild(bookGenre);
      li.appendChild(bookRating);
      li.appendChild(deleteBtn);
      list.appendChild(li);

      // reset default values(?)
      bookInput = '';
      genreInput.value = 'Fiction'; 
      ratingInput.value = '';
    });
  
    // hide books
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change', function(e){
      if(hideBox.checked){
        list.style.display = "none";
      } else {
        list.style.display = "initial";
      }
    });
  
    // filter books
    const searchBar = forms['search-books'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
      const term = e.target.value.toLowerCase();
      const books = list.getElementsByTagName('li');
      Array.from(books).forEach((book) => {
        const title = book.firstElementChild.textContent;
        if (title.toLowerCase().indexOf(term) != -1) {
          book.style.display = 'grid';
        } else {
          book.style.display = 'none';
        }
      });
    });
  
    // tabbed content
    const tabs = document.querySelector('.tabs');
    const panels = document.querySelectorAll('.panel');
    tabs.addEventListener('click', (e) => {
      if(e.target.tagName == 'LI'){
        const targetPanel = document.querySelector(e.target.dataset.target);
        Array.from(panels).forEach((panel) => {
          if(panel == targetPanel){
            panel.classList.add('active');
            
          }else{
            panel.classList.remove('active');
          }
        });
      }
    });
  
  })

  //filtering by genre
  document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter');
    const genreSelect = document.getElementById('genre');
    const ratingInput = document.getElementById('rating');
    const bookList = document.getElementById('book-list');
  
    filterButton.addEventListener('click', function () {
      const selectedGenre = genreSelect.value;
      console.log(selectedGenre)
    //   const minimumRating = parseFloat(ratingInput.value);
  
      const books = bookList.querySelectorAll('li');
  
      books.forEach((book) => {
        const genre = book.querySelector('.genre').textContent;
        // const rating = parseFloat(book.querySelector('.rating').textContent);
  
        const genreMatch = selectedGenre === 'all' || genre === selectedGenre;
        // const ratingMatch = rating >= minimumRating;
  
        if (genreMatch) {
          book.style.display = 'grid';
          console.log("Doin something")
        } else {
          book.style.display = 'none';
        }
      });
    });
  });
  