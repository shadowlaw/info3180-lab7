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
        <div v-if='messageFlag' >
        
            <div v-if="!errorFlag ">
                <div class="alert alert-success" >
                    {{ message }}
                </div>
            </div>
            <div v-else >
                <ul class="alert alert-danger">
                    <li v-for="error in message">
                        {{ error }}
                    </li>
                </ul>
            </div>
            
        </div>
        
        <h1>Upload Photo</h1>
        <form id="uploadForm" @submit.prevent="UploadForm" enctype="multipart/form-data">
            <label>Description:</label><br/>
            <textarea name='description'></textarea><br/>
            <label for='photo' class='btn btn-primary'>Browse....</label> <span>{{ filename }}</span>
            <input id="photo" type="file" name='photo' style="display: none" v-on:change = "onFileSelected" /><br/>
            <input type="submit" value="Upload" class="btn btn-success"/>
        </form>
    </div>
    `,
    methods: {
        UploadForm: function(){
            let self = this
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            
            fetch("/api/upload", {
                method: "POST",
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                credentials: 'same-origin'
            }).then(function(response){
                return response.json();
            }).then(function (jsonResponse) {
                // display a success message
                self.messageFlag = true
                
                if (jsonResponse.hasOwnProperty("errors")){
                    self.errorFlag=true;
                    self.message = jsonResponse.errors;
                }else if(jsonResponse.hasOwnProperty("message")){
                    self.errorFlag = false;
                    self.message = "File Upload Successful";
                    self.cleanForm();
                }
             })
             .catch(function (error) {
                console.log(error);
             });
        },
        cleanForm : function(){
            let form =$("#uploadForm")[0];
            let self = this;
            
            form.description.value = "";
            form.photo.value = "";
            self.filename = "";
            
        },
        onFileSelected: function(){
            let self = this
            let filenameArr = $("#photo")[0].value.split("\\");
            self.filename = filenameArr[filenameArr.length-1]
        }
    },
    data: function(){
        return {
            errorFlag: false,
            messageFlag: false,
            message: [],
            filename: ""
        }
    }
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