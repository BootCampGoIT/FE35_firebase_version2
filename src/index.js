import axios from 'axios';
import './styles.css';

// ===============================================

const posts = [];

const post = {
  title: '',
  message: ''
}

// ===============================================

const postsList = document.querySelector('.postsList');
const messageForm = document.messageForm;

// ===============================================

const createMarkup = (posts) => {
  let innerMarkup = '';
  posts.forEach(element => {
    innerMarkup += `
    <li class="listItem">
    <div class="listItemContent">
      <h1 class="postTitle">${element.title}</h1>
      <p class="postMessage">${element.message}</p>
    </div>
    <div class="buttonsContainer">
      <button class="editButton" data-id=${element.id}>Edit</button>
      <button class="deleteButton" data-id=${element.id}>Delete</button>
    </div>
  </li>
    `
  });
  return innerMarkup
}

const getPosts = () => {
  axios.get('https://fe35-database.firebaseio.com/posts.json')
    .then(response => {
      for (const key in response.data) {
        posts.push({ id: key, ...response.data[key] })
      }
      return posts
    }).then(posts => postsList.innerHTML = createMarkup(posts))
    .catch((error) => console.log(error))
}

const getData = (e) => {
  post[e.target.name] = e.target.value
}

const createPost = (e) => {
  e.preventDefault();
  axios.post('https://fe35-database.firebaseio.com/posts.json', post)
    .then(response => posts.push({ id: response.data.name, ...post }))
    .then(() => postsList.innerHTML = createMarkup(posts))
    .catch((error) => console.log(error))
    .finally(() => {
      post.title = '';
      post.message = '';
      messageForm.reset();
    })
}

// ===============================================

getPosts();


// ===============================================
messageForm.addEventListener('input', getData);
messageForm.addEventListener('submit', createPost);

