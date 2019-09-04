<template>
  <div>
    <p>{{texto}}</p>
    <textarea
      v-model="texto"
      name="teste"
      cols="30"
      rows="10"
    ></textarea>
    <button id="enviar">Enviar</button>
  </div>
</template>
<script>
import _ from "lodash";
import Firebase from "firebase";
const app = Firebase.initializeApp({
  apiKey: "AIzaSyCy8C-EbLhBI-gQV9HGdG5NIq7i6rgDZYM",
  authDomain: "vue-firebase-realtime.firebaseapp.com",
  databaseURL: "https://vue-firebase-realtime.firebaseio.com/",
  projectId: "vue-firebase-realtime",
  storageBucket: "vue-firebase-realtime/appspot.com",
  messagingSenderId: "AIzaSyBCShdJOa_kyJAODGQdxGXofRc9zi6KCA0"
});
const db = app.database();
export default {
  data() {
    return {
      texto: "",
      canvas: {
        name: "Canvas ADS",
        areas: [
          {
            name: "curso",
            perguntas: [{ name: "Nome do curso?", resposta: "ADS" }]
          },
          {
            name: "objetivos",
            perguntas: [
              { name: "Objetivos ao final do curso?", resposta: "objetivo 1" }
            ]
          }
        ]
      }
    };
  },
  firestore: {
    quillContent: {
      source: db.ref("/canvas"),
      asObject: true
    }
  },
  mounted() {
    this.teste();
    document.getElementById("enviar").addEventListener("click",  () => {
        this.canvas.name = this.texto;
        this.$firestoreRefs.quillContent.source.push().set(this.canvas);
      },
    );
    let $vm = this;
    this.$firestoreRefs.quillContent.source.on("value", function(snapshot) {
      console.log(snapshot.val());
      $vm.texto = snapshot.val();
    });
  },
  methods: {
    updateFirebase: _.debounce(function(content) {
      console.log(this.$firestoreRefs.quillContent);
      this.$firestoreRefs.quillContent.source.set(content);
    }, 1000),

  teste(){
    const canvas =  db.ref("/canvas/-LnxKjQ0GlBvWAhUakNT/name").on('value', (val)=>{
      console.log('Canvas Name:', val.val());
    });
  }
  },
};
</script>