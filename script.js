const UsersList = document.getElementById("users-list");
const Box_Usrt = document.getElementById("users-container");
const Section_Posts = document.getElementById("Sec-Posts")
function createUsers(userIds, email) {
  const UsersList = document.getElementById("users-container");
  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    const user = document.createElement("p");
    console.log();
    div.setAttribute("class", "box-user");
    user.setAttribute("class", "user");
    div.setAttribute("id", `usr${i + 1}`);
    user.innerHTML = ` ${userIds[i]} <br> ${email[i]}`;
    div.appendChild(user);
    UsersList.appendChild(div);


  }

}


function getDataApiUser(callback) {
  const request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");
  request.send();

  const userIds = [];
  const email = [];

  request.onload = function () {
    const users = request.response;

    for (let i = 0; i < users.length; i++) {
      userIds.push(users[i].name);
    }

    for (let i = 0; i < users.length; i++) {
      email.push(users[i].email);

    }

    callback(userIds, email);
  }
}


function CretaPosts(text, titles, id) {
  for (var i = 0; i < 10; i++) {
    let new_div = document.createElement("div");
    let new_text = document.createElement("p");
    let new_title = document.createElement("h2");
    new_div.appendChild(new_title);
    new_div.appendChild(new_text);
    Section_Posts.appendChild(new_div);
    new_div.setAttribute("id" ,"PostsHome")
    new_div.setAttribute("class", "Posts");
    new_div.setAttribute("data-userId", id); // إضافة مع
    new_text.innerHTML = text[i];
    new_title.innerHTML = titles[i]; // إضافة العنوان الجديد
  }
}

  function getDataApiPost(id,  callback) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    request.responseType = "json";
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    
    request.onload = function () {
      var posts = request.response;
      const Posts = [];
      const titles = [];
      for (let i = 0; i < posts.length; i++) {
        Posts.push(posts[i].body);
        titles.push(posts[i].title);

      }
      console.log(titles);
      callback(Posts , titles);
    }
  }
  function DeletePosts() {
    const postsContainer = document.getElementById("Sec-Posts");
    const posts = postsContainer.querySelectorAll(".Posts");
    posts.forEach((post) => {
      postsContainer.removeChild(post);
    });
  }


function IfshowPsot() {
  document.getElementById("users-container").addEventListener("click", function (event) {
    for (let i = 1; i <= 10; i++) {
      if (event.target.id === `usr${i}`) {
        let test= document.getElementById("PostsHome");
        DeletePosts()
        getDataApiPost(i, CretaPosts, i);
        console

      }
    }

  });
}

getDataApiPost(1, function(posts, titles) {
  CretaPosts(posts, titles, 1);
});

// استدعاء getDataApi وإرسال وظيفة callback كمعامل
getDataApiUser(function (userIds, email) {
  createUsers(userIds, email)
});

IfshowPsot();

const usersContainer = document.getElementById("users-container");
usersContainer.style.display = "flex";
usersContainer.style.justifyContent = "space-around";



