/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Upload = Vue.component("upload-form", {
    template: `
    <div>
        <h1>Upload Photo</h1>
        <form>
            <label>Description:</label><br/>
            <textarea></textarea><br/>
            <label for='photo' class='btn btn-primary'>Browse....</label>
            <input type="file" style="display: none"/><br/>
            <input type="submit" value="Upload" class="btn btn-success"/>
        </form>
    </div>
    `
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/upload", component: Upload }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});